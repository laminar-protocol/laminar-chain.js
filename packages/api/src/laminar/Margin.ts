import { Balance, MarginLiquidityPoolOption, Position, RiskThreshold, TradingPair } from '@laminar/types/interfaces';
import { Option } from '@polkadot/types/codec';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

import LaminarApi from './LaminarApi';

type LeverageEnum = [
  'LongTwo',
  'LongThree',
  'LongFive',
  'LongTen',
  'LongTwenty',
  'LongThirty',
  'LongFifty',
  '_LongOneHundred',
  'ShortTwo',
  'ShortThree',
  'ShortFive',
  'ShortTen',
  'ShortTwenty',
  'ShortThirty',
  'ShortFifty',
  '_ShortOneHundred'
][number];

class Margin {
  private apiProvider: LaminarApi;
  private api: LaminarApi['api'];

  constructor(provider: LaminarApi) {
    this.apiProvider = provider;
    this.api = provider.api;
  }

  public poolInfo = (poolId: string) => {
    return combineLatest([
      this.api.query.marginLiquidityPools.owners(poolId),
      this.api.query.marginLiquidityPools.balances<Option<Balance>>(poolId),
      this.api.query.marginLiquidityPools.liquidityPoolOptions.entries<Option<MarginLiquidityPoolOption>>(poolId)
    ]).pipe(
      map(([owners, balances, liquidityPoolOptions]) => {
        if (owners.isEmpty) return null;

        return {
          owners: owners.isEmpty ? null : (owners as any).value[0].toJSON(),
          balance: balances.toString(),
          options: liquidityPoolOptions.map(([storageKey, options]) => {
            const pair = storageKey.args[1] as TradingPair;
            const data = options.toJSON() || {};
            return {
              pair: pair.toJSON(),
              ...(data as any)
            };
          })
        };
      })
    );
  };

  public marginInfo = () => {
    return combineLatest([
      this.api.query.marginProtocol.liquidityPoolELLThreshold<RiskThreshold>(),
      this.api.query.marginProtocol.liquidityPoolENPThreshold<RiskThreshold>(),
      this.api.query.marginProtocol.traderRiskThreshold<RiskThreshold>()
    ]).pipe(
      map(([ellThreshold, enpThreshold, traderThreshold]) => {
        return {
          ellThreshold: ellThreshold.toHuman(),
          enpThreshold: enpThreshold.toHuman(),
          traderThreshold: traderThreshold.toHuman()
        };
      })
    );
  };

  public positionsByPool = (poolId: string) => {
    return this.api.query.marginProtocol.positionsByPool.entries(poolId).pipe(
      map(allResult => {
        return allResult.map(([storageKey]) => {
          const data: any = storageKey.args[1];
          return {
            tradingPair: data[0].toJSON(),
            positionId: data[0].toString()
          };
        });
      })
    );
  };

  public positionsByTrader = (address: string) => {
    return this.api.query.marginProtocol.positionsByTrader.entries(address).pipe(
      map(allResult => {
        return allResult.map(([storageKey]) => {
          const data: any = storageKey.args[1];
          return {
            tradingPair: data[0].toJSON(),
            positionId: data[0].toString()
          };
        });
      })
    );
  };

  public poolEnabledTradingPairs = (poolId: string) => {
    return this.api.query.marginLiquidityPools.liquidityPoolEnabledTradingPairs
      .entries<Option<TradingPair>>(poolId)
      .pipe(
        map(allResult => {
          return allResult.map(([, result]) => result.toJSON());
        })
      );
  };

  public positions = (positionId: string) => {
    return this.api.query.marginProtocol.positions<Option<Position>>(positionId).pipe(map(result => result.toHuman()));
  };

  public openPosition = async (
    account: string,
    poolId: string,
    pair: TradingPair,
    leverage: LeverageEnum,
    leveragedAmount: string,
    price: string
  ) => {
    const extrinsic = this.api.tx.marginProtocol.openPosition(poolId, pair, leverage, leveragedAmount, price);
    return this.apiProvider.extrinsicHelper(extrinsic, account, { action: 'Open Position' });
  };

  public closePosition = async (account: string, positionId: string, price = '0') => {
    const extrinsic = this.api.tx.marginProtocol.closePosition(positionId, price);
    return this.apiProvider.extrinsicHelper(extrinsic, account, { action: 'Close Position' });
  };

  public deposit = async (account: string, amount: string) => {
    const extrinsic = this.api.tx.marginProtocol.deposit(amount);
    return this.apiProvider.extrinsicHelper(extrinsic, account, { action: 'Deposit' });
  };

  public withdraw = async (account: string, amount: string) => {
    const extrinsic = this.api.tx.marginProtocol.withdraw(amount);
    return this.apiProvider.extrinsicHelper(extrinsic, account, { action: 'Withdraw' });
  };
}

export default Margin;
