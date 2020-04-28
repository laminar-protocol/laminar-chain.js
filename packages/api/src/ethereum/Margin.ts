import BN from 'bn.js';
import { from, Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { toNumber } from '@laminar/types/utils/precision';
import { LeverageEnum, TokenId, TokenInfo, MarginPoolInfo, MarginInfo } from '../types';
import EthereumApi, { UINT256_MAX } from './EthereumApi';

class Margin {
  private apiProvider: EthereumApi;
  private protocol: EthereumApi['protocol'];
  private baseContracts: EthereumApi['baseContracts'];

  constructor(provider: EthereumApi) {
    this.apiProvider = provider;
    this.protocol = provider.protocol;
    this.baseContracts = provider.baseContracts;
  }

  private getEnableTradePairs = (poolId: string) => {
    return this.apiProvider.currencies.tokens().pipe(
      switchMap(async tokens => {
        const whiteListRequest: Promise<[boolean, TokenInfo, TokenInfo]>[] = [];
        for (const base of tokens) {
          for (const quote of tokens) {
            whiteListRequest.push(
              this.baseContracts.marginFlowProtocol.methods
                .tradingPairWhitelist(base.id, quote.id)
                .call()
                .then((result: boolean) => {
                  return [result, base, quote];
                })
            );
          }
        }

        const whiteList = await Promise.all(whiteListRequest).then(result =>
          result
            .filter(([isWhiteList]) => isWhiteList)
            .map(([, base, quote]) => ({
              base,
              quote
            }))
        );

        const enableTradePairsRequest: Promise<[boolean, TokenInfo, TokenInfo]>[] = [];

        for (const { base, quote } of whiteList) {
          enableTradePairsRequest.push(
            this.apiProvider
              .getMarginPoolInterfaceContract(poolId)
              .methods.allowedTokens(base.id, quote.id)
              .call()
              .then((result: boolean) => {
                return [result, base, quote];
              })
          );
        }

        const enableTradePairs = await Promise.all(whiteListRequest).then(result =>
          result
            .filter(([isEnable]) => isEnable)
            .map(([, base, quote]) => ({
              base,
              quote
            }))
        );

        return enableTradePairs;
      })
    );
  };

  public balance = (address: string) => {
    return from(this.apiProvider.web3.eth.getBalance(address));
  };

  public allowance = (account: string): Observable<string> => {
    const grantAddress = this.baseContracts.marginFlowProtocol.options.address;
    const contract = this.apiProvider.tokenContracts.DAI;
    return from(contract.methods.allowance(account, grantAddress).call() as Promise<string>);
  };

  public grant = async (account: string, balance: string | BN = UINT256_MAX) => {
    const grantAddress = this.baseContracts.marginFlowProtocol.options.address;

    const extrinsic = this.apiProvider.tokenContracts.DAI.methods.approve(grantAddress, balance);
    return this.apiProvider.extrinsicHelper(extrinsic, { from: account }, { action: 'Grant' });
  };

  public allPoolIds = () => {
    return of([this.protocol.addresses.marginPool, this.protocol.addresses.marginPool2]);
  };

  public marginInfo = (): Observable<MarginInfo> => {
    const methods = this.baseContracts.marginFlowProtocolSafety.methods;

    return from(
      Promise.all([
        methods.liquidityPoolELLLiquidateThreshold().call(),
        methods.liquidityPoolELLMarginThreshold().call(),
        methods.liquidityPoolENPLiquidateThreshold().call(),
        methods.liquidityPoolENPMarginThreshold().call()
      ]).then(([ELLLiquidateThreshold, ELLMarginThreshold, ENPLiquidateThreshold, ENPMarginThreshold]) => {
        return {
          ellThreshold: {
            marginCall: toNumber(ELLMarginThreshold),
            stopOut: toNumber(ELLLiquidateThreshold)
          },
          enpThreshold: {
            marginCall: toNumber(ENPMarginThreshold),
            stopOut: toNumber(ENPLiquidateThreshold)
          }
        };
      })
    );
  };

  public poolInfo = (poolId: string): Observable<MarginPoolInfo> => {
    const poolInterface = this.apiProvider.getMarginPoolInterfaceContract(poolId);
    const poolRegistry = this.apiProvider.getMarginPoolRegistryContract(poolId);
    return this.getEnableTradePairs(poolId).pipe(
      switchMap(async tradingPairs => {
        return Promise.all([
          this.apiProvider.tokenContracts.DAI.methods.balanceOf(poolId).call(),
          poolRegistry.methods.owner().call(),
          Promise.all(
            tradingPairs.map(({ base, quote }) => {
              return Promise.all([
                poolInterface.methods.getAskSpread(base.id, quote.id).call(),
                poolInterface.methods.getBidSpread(base.id, quote.id).call()
              ]).then(([askSpread, bidSpread]) => {
                return {
                  askSpread: toNumber(askSpread),
                  bidSpread: toNumber(bidSpread),
                  pair: {
                    base: base.id,
                    quote: quote.id
                  },
                  enabledTrades: [
                    'LongTwo',
                    'LongThree',
                    'LongFive',
                    'LongTen',
                    'LongTwenty',
                    'LongThirty',
                    'LongFifty',
                    'LongReserved',
                    'ShortTwo',
                    'ShortThree',
                    'ShortFive',
                    'ShortTen',
                    'ShortTwenty',
                    'ShortThirty',
                    'ShortFifty',
                    'ShortReserved'
                  ],
                  pairId: `${base.name.toUpperCase()}${quote.name.toUpperCase()}`
                };
              });
            })
          )
        ]).then(([balance, owner, options]) => {
          return {
            poolId: poolInterface.options.address,
            balance,
            owner,
            enp: '0',
            ell: '0',
            options
          };
        });
      })
    );
  };

  public traderInfo(account: string, poolId: string) {
    return from(
      Promise.all([
        this.baseContracts.marginFlowProtocol.methods.getEquityOfTrader(poolId, account).call(),
        this.baseContracts.marginFlowProtocol.methods.getFreeMargin(poolId, account).call(),
        this.baseContracts.marginFlowProtocol.methods.getMarginHeld(poolId, account).call(),
        this.baseContracts.marginFlowProtocolSafety.methods.traderRiskLiquidateThreshold().call(),
        this.baseContracts.marginFlowProtocolSafety.methods.traderRiskMarginCallThreshold().call()
      ]).then(([equity, freeMargin, marginHeld, stopOut, marginCall]) => {
        return {
          equity,
          freeMargin,
          marginHeld,
          marginLevel: '0',
          unrealizedPl: '0',
          traderThreshold: {
            marginCall: toNumber(marginCall),
            stopOut: toNumber(stopOut)
          }
        };
      })
    );
  }

  public deposit = async (account: string, poolId: string, amount: string | BN) => {
    const extrinsic = this.apiProvider.baseContracts.marginFlowProtocol.methods.deposit(poolId, amount);
    return this.apiProvider.extrinsicHelper(extrinsic, { from: account }, { action: 'Deposit' });
  };

  public withdraw = async (account: string, poolId: string, amount: string | BN) => {
    const extrinsic = this.apiProvider.baseContracts.marginFlowProtocol.methods.withdraw(poolId, amount);
    return this.apiProvider.extrinsicHelper(extrinsic, { from: account }, { action: 'Withdraw' });
  };

  public openPosition = async (
    account: string,
    poolId: string,
    pair: {
      base: TokenId;
      quote: TokenId;
    },
    _leverage: LeverageEnum,
    leveragedAmount: string | BN,
    price: string | BN
  ) => {
    const [, direction, multiple] = _leverage.match('^(Long|Short)(.*)$') || [];
    const multipleMap: Record<string, number> = {
      Two: 2,
      Three: 3,
      Five: 5,
      Ten: 10,
      Twenty: 20,
      Fifty: 50
    };

    if (!multipleMap[multiple]) throw new Error('leverage is incorrect');

    const leverage =
      direction === 'Short' ? -1 * multipleMap[multiple] : direction === 'Long' ? multipleMap[multiple] : 0;

    const extrinsic = this.apiProvider.baseContracts.marginFlowProtocol.methods.openPosition(
      poolId,
      pair.base,
      pair.quote,
      leverage,
      leveragedAmount,
      price
    );
    return this.apiProvider.extrinsicHelper(extrinsic, { from: account }, { action: 'Open Position' });
  };

  public closePosition = async (account: string, positionId: string, price: string | BN = '0') => {
    const extrinsic = this.apiProvider.baseContracts.marginFlowProtocol.methods.closePosition(positionId, price);
    return this.apiProvider.extrinsicHelper(extrinsic, { from: account }, { action: 'Close Position' });
  };
}

export default Margin;
