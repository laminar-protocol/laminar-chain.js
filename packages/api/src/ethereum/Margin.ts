import BN from 'bn.js';
import { from, Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import {
  AccumulatedSwapRate,
  LeverageEnum,
  MarginInfo,
  MarginPoolInfo,
  MarginPosition,
  TokenId,
  TokenInfo,
  TraderInfo
} from '../types';
import EthereumApi, { UINT256_MAX } from './EthereumApi';

class Margin {
  private apiProvider: EthereumApi;
  private protocol: EthereumApi['protocol'];
  public marginFlowProtocolConfig: EthereumApi['baseContracts']['marginFlowProtocolConfig'];
  public marginFlowProtocol: EthereumApi['baseContracts']['marginFlowProtocol'];
  public marginFlowProtocolSafety: EthereumApi['baseContracts']['marginFlowProtocolSafety'];

  constructor(provider: EthereumApi) {
    this.apiProvider = provider;
    this.protocol = provider.protocol;
    this.marginFlowProtocolConfig = provider.baseContracts.marginFlowProtocolConfig;
    this.marginFlowProtocol = provider.baseContracts.marginFlowProtocol;
    this.marginFlowProtocolSafety = provider.baseContracts.marginFlowProtocolSafety;
  }

  private getWhiteListTradePairs = () => {
    return this.apiProvider.currencies.tokens().pipe(
      switchMap(async tokens => {
        const whiteListRequest: Promise<[boolean, TokenInfo, TokenInfo]>[] = [];
        for (const base of tokens) {
          for (const quote of tokens) {
            whiteListRequest.push(
              this.marginFlowProtocolConfig.methods
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

        return whiteList;
      })
    );
  };

  private getEnableTradePairs = (poolId: string) => {
    return this.getWhiteListTradePairs().pipe(
      switchMap(async whiteList => {
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

        const enableTradePairs = await Promise.all(enableTradePairsRequest).then(result =>
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

  public balance = (address: string): Observable<string> => {
    return from(this.apiProvider.tokenContracts.DAI.methods.balanceOf(address).call() as Promise<string>);
  };

  public allowance = (account: string, grantAddress = this.marginFlowProtocol.options.address): Observable<string> => {
    const contract = this.apiProvider.tokenContracts.DAI;
    return from(contract.methods.allowance(account, grantAddress).call() as Promise<string>);
  };

  public grant = async (
    account: string,
    grantAddress = this.marginFlowProtocol.options.address,
    balance: string | BN = UINT256_MAX
  ) => {
    const extrinsic = this.apiProvider.tokenContracts.DAI.methods.approve(grantAddress, balance);
    return this.apiProvider.extrinsicHelper(extrinsic, { from: account }, { action: 'Grant' });
  };

  public allPoolIds = () => {
    return of([
      this.protocol.addresses.marginPoolGeneral.toLowerCase(),
      this.protocol.addresses.marginPoolACME.toLowerCase()
    ]);
  };

  public marginInfo = (): Observable<MarginInfo> => {
    const methods = this.marginFlowProtocolConfig.methods;

    return from(
      Promise.all([
        methods.liquidityPoolELLLiquidateThreshold().call(),
        methods.liquidityPoolELLMarginThreshold().call(),
        methods.liquidityPoolENPLiquidateThreshold().call(),
        methods.liquidityPoolENPMarginThreshold().call()
      ]).then(([ELLLiquidateThreshold, ELLMarginThreshold, ENPLiquidateThreshold, ENPMarginThreshold]) => {
        return {
          ellThreshold: {
            marginCall: ELLMarginThreshold,
            stopOut: ELLLiquidateThreshold
          },
          enpThreshold: {
            marginCall: ENPMarginThreshold,
            stopOut: ENPLiquidateThreshold
          }
        };
      })
    );
  };

  public position = (): Observable<MarginPosition | null> => {
    return of(null);
  };

  public poolInfo = (poolId: string): Observable<MarginPoolInfo> => {
    const poolInterface = this.apiProvider.getMarginPoolInterfaceContract(poolId);
    return this.getEnableTradePairs(poolId).pipe(
      switchMap(async tradingPairs => {
        return Promise.all([
          this.apiProvider.tokenContracts.DAI.methods.balanceOf(poolId).call(),
          poolInterface.methods.owner().call(),
          Promise.all(
            tradingPairs.map(({ base, quote }) => {
              return Promise.all([
                poolInterface.methods.getAskSpread(base.id, quote.id).call(),
                poolInterface.methods.getBidSpread(base.id, quote.id).call()
              ]).then(([askSpread, bidSpread]) => {
                return {
                  askSpread,
                  bidSpread,
                  pair: {
                    base: base.id,
                    quote: quote.id
                  },
                  enabledTrades: ['LongFive', 'LongTen', 'LongTwenty', 'ShortFive', 'ShortTen', 'ShortTwenty'],
                  pairId: `${base.name.toUpperCase()}${quote.name.toUpperCase()}`
                };
              });
            })
          ),
          this.marginFlowProtocolSafety.methods.getEnpAndEll(poolId).call(),
          poolInterface.methods.minLeverageAmount().call()
        ]).then(([balance, owner, options, enpAndEll, minLeverageAmount]) => {
          return {
            poolId: poolInterface.options.address.toLowerCase(),
            balance,
            owner,
            enp: enpAndEll[0][0],
            ell: enpAndEll[1][0],
            options,
            minLeveragedAmount: minLeverageAmount
          };
        });
      })
    );
  };

  public traderInfo(account: string, poolId: string): Observable<TraderInfo> {
    return from(
      Promise.all([
        this.marginFlowProtocol.methods.balances(poolId, account).call(),
        this.marginFlowProtocol.methods.getExactEquityOfTrader(poolId, account).call(),
        this.marginFlowProtocol.methods.getExactFreeMargin(poolId, account).call(),
        this.marginFlowProtocol.methods.getMarginHeld(poolId, account).call(),
        this.marginFlowProtocolSafety.methods.getMarginLevel(poolId, account).call(),
        this.marginFlowProtocolSafety.methods.getLeveragedDebitsOfTrader(poolId, account).call()
      ]).then(([balances, equity, freeMargin, marginHeld, marginLevel, leveraged]) => {
        return {
          balance: balances,
          equity,
          freeMargin,
          marginHeld,
          marginLevel: marginLevel[0],
          unrealizedPl: '0',
          totalLeveragedPosition: leveraged,
          accumulatedSwap: '0'
        };
      })
    );
  }

  public traderThreshold(baseToken: TokenId, quoteToken: TokenId) {
    return from(
      Promise.all([
        this.marginFlowProtocolConfig.methods.traderRiskLiquidateThreshold().call(),
        this.marginFlowProtocolConfig.methods.traderRiskMarginCallThreshold().call()
      ]).then(([stopOut, marginCall]) => {
        return {
          marginCall: marginCall,
          stopOut: stopOut
        };
      })
    );
  }

  public accumulatedSwapRates(): Observable<AccumulatedSwapRate[]> {
    return of([]);
  }

  public deposit = async (account: string, poolId: string, amount: string | BN) => {
    const extrinsic = this.marginFlowProtocol.methods.deposit(poolId, amount);
    return this.apiProvider.extrinsicHelper(extrinsic, { from: account }, { action: 'Deposit' });
  };

  public withdraw = async (account: string, poolId: string, amount: string | BN) => {
    const extrinsic = this.marginFlowProtocol.methods.withdraw(poolId, amount);
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

    const extrinsic = this.marginFlowProtocol.methods.openPosition(
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
    const extrinsic = this.marginFlowProtocol.methods.closePosition(positionId, price);
    return this.apiProvider.extrinsicHelper(extrinsic, { from: account }, { action: 'Close Position' });
  };

  public depositLiquidity = async (account: string, poolId: string, amount: string | BN) => {
    const extrinsic = this.apiProvider.getMarginPoolInterfaceContract(poolId).methods.depositLiquidity(amount);
    return this.apiProvider.extrinsicHelper(extrinsic, { from: account }, { action: 'Deposit' });
  };

  public withdrawLiquidity = async (account: string, poolId: string, amount: string | BN) => {
    const extrinsic = this.apiProvider.getMarginPoolInterfaceContract(poolId).methods.withdrawLiquidity(amount);
    return this.apiProvider.extrinsicHelper(extrinsic, { from: account }, { action: 'Withdraw' });
  };

  public payTraderDeposits = async (account: string, poolId: string) => {
    const extrinsic = this.marginFlowProtocolSafety.methods.payTraderDeposits(poolId);
    return this.apiProvider.extrinsicHelper(extrinsic, { from: account }, { action: 'Pay Trader Deposits' });
  };
}

export default Margin;
