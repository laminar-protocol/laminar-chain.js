import BN from 'bn.js';
import { from, Observable, of } from 'rxjs';
import { Contract } from 'web3-eth-contract';
import { toNumber } from '@laminar/types/utils/precision';
import { MarginInfo, LeverageEnum } from '../types';
import EthereumApi, { UINT256_MAX } from './EthereumApi';
import { TokenId } from './protocols';

class Margin {
  private apiProvider: EthereumApi;
  private protocol: EthereumApi['protocol'];
  private flowMarginProtocol: Contract;

  constructor(provider: EthereumApi) {
    this.apiProvider = provider;
    this.protocol = provider.protocol;
    this.flowMarginProtocol = this.apiProvider.baseContracts.flowMarginProtocol;
  }

  public balance = (address: string) => {
    return from(this.apiProvider.web3.eth.getBalance(address));
  };

  public allowance = (account: string): Observable<string> => {
    const grantAddress = this.flowMarginProtocol.options.address;
    const contract = this.apiProvider.tokenContracts.DAI;
    return from(contract.methods.allowance(account, grantAddress).call() as Promise<string>);
  };

  public grant = async (account: string, balance: string | BN = UINT256_MAX) => {
    const extrinsic = this.apiProvider.tokenContracts.DAI.methods.approve(
      this.flowMarginProtocol.options.address,
      balance
    );
    return this.apiProvider.extrinsicHelper(extrinsic, { from: account }, { action: 'Grant' });
  };

  public allPoolIds = () => {
    return of([this.protocol.addresses.pool, this.protocol.addresses.pool2]);
  };

  public marginInfo = (): Observable<MarginInfo> => {
    return from(
      Promise.all([
        this.flowMarginProtocol.methods.liquidityPoolELLLiquidateThreshold().call(),
        this.flowMarginProtocol.methods.liquidityPoolELLMarginThreshold().call(),
        this.flowMarginProtocol.methods.liquidityPoolENPLiquidateThreshold().call(),
        this.flowMarginProtocol.methods.liquidityPoolENPMarginThreshold().call()
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

  public poolInfo = (poolId: string) => {
    const poolContract = this.apiProvider.createLiquidityPoolContract(poolId);
    const tradingPairs = this.protocol.tradingPairs;

    return from(
      Promise.all([
        this.apiProvider.tokenContracts.DAI.methods.balanceOf(poolId).call(),
        poolContract.methods.owner().call(),
        Promise.all(
          tradingPairs.map(item => {
            const quoteAddress = this.apiProvider.getTokenContract(item.pair.quote).options.address;
            return Promise.all([
              poolContract.methods.getAskSpread(quoteAddress).call(),
              poolContract.methods.getBidSpread(quoteAddress).call()
            ]).then(([askSpread, bidSpread]) => ({
              askSpread,
              bidSpread,
              enabledTrades: item.enabledTrades,
              pair: item.pair,
              pairId: item.pairId
            }));
          })
        )
      ]).then(([balance, owner, options]) => {
        return {
          poolId: poolContract.options.address,
          balance,
          owner,
          enp: '0',
          ell: '0',
          options
        };
      })
    );
  };

  public traderInfo(account: string, poolId: string) {
    return from(
      Promise.all([
        this.flowMarginProtocol.methods.getEquityOfTrader(poolId, account).call(),
        this.flowMarginProtocol.methods.getFreeMargin(poolId, account).call(),
        this.flowMarginProtocol.methods.getMarginHeld(poolId, account).call()
      ]).then(([equity, freeMargin, marginHeld]) => {
        return {
          equity,
          freeMargin,
          marginHeld,
          marginLevel: '0',
          unrealizedPl: '0',
          traderThreshold: {
            marginCall: 0,
            stopOut: 0
          }
        };
      })
    );
  }

  public deposit = async (account: string, poolId: string, amount: string | BN) => {
    const extrinsic = this.apiProvider.baseContracts.flowMarginProtocol.methods.deposit(poolId, amount);
    return this.apiProvider.extrinsicHelper(extrinsic, { from: account }, { action: 'Deposit' });
  };

  public withdraw = async (account: string, poolId: string, amount: string | BN) => {
    const extrinsic = this.apiProvider.baseContracts.flowMarginProtocol.methods.withdraw(poolId, amount);
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
    const baseAddress = this.apiProvider.getTokenContract(pair.base).options.address;
    const quoteAddress = this.apiProvider.getTokenContract(pair.quote).options.address;
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

    const extrinsic = this.apiProvider.baseContracts.flowMarginProtocol.methods.openPosition(
      poolId,
      baseAddress,
      quoteAddress,
      leverage,
      leveragedAmount,
      price
    );
    return this.apiProvider.extrinsicHelper(extrinsic, { from: account }, { action: 'Open Position' });
  };

  public closePosition = async (account: string, positionId: string, price: string | BN = '0') => {
    const extrinsic = this.apiProvider.baseContracts.flowMarginProtocol.methods.closePosition(positionId, price);
    return this.apiProvider.extrinsicHelper(extrinsic, { from: account }, { action: 'Close Position' });
  };
}

export default Margin;
