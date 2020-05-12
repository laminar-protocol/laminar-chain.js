import { PoolInfo } from '@laminar/types/interfaces';

import BN from 'bn.js';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { LeverageEnum, MarginInfo, MarginPoolInfo, Threshold, TraderInfo, TokenId } from '../types';
import LaminarApi from './LaminarApi';

class Margin {
  private apiProvider: LaminarApi;
  private api: LaminarApi['api'];

  constructor(provider: LaminarApi) {
    this.apiProvider = provider;
    this.api = provider.api;
  }

  public balance = (address: string) => {
    return this.api.query.marginProtocol.balances.entries(address).pipe(
      map(result =>
        result
          .reduce((total, [, balance]) => {
            return total.add(new BN(balance));
          }, new BN(0))
          .toString()
      )
    );
  };

  public poolInfo = (poolId: string): Observable<MarginPoolInfo | null> => {
    return combineLatest([
      this.api.query.baseLiquidityPoolsForMargin.owners(poolId),
      this.api.query.baseLiquidityPoolsForMargin.balances(poolId),
      this.api.query.marginLiquidityPools.liquidityPoolOptions.entries(poolId),
      (this.api.rpc as any).margin.poolInfo(poolId)
    ]).pipe(
      map(([owner, balances, liquidityPoolOptions, poolInfo]) => {
        if (owner.isEmpty) return null;
        return {
          poolId: poolId,
          owner: owner.isEmpty ? null : (owner as any).value[0].toJSON(),
          balance: balances.toString(),
          enp: (poolInfo as PoolInfo).enp.toString(),
          ell: (poolInfo as PoolInfo).ell.toString(),
          options: liquidityPoolOptions.map(([storageKey, options]) => {
            const pair = storageKey.args[1].toJSON() as {
              base: string;
              quote: string;
            };

            const data = options.toHuman() || {};

            return {
              pair: pair,
              pairId: `${pair.base}${pair.quote}`,
              ...(data as any)
            };
          })
        };
      })
    );
  };

  public marginInfo = (): Observable<MarginInfo> => {
    return combineLatest([
      this.api.query.marginProtocol.liquidityPoolELLThreshold.entries(),
      this.api.query.marginProtocol.liquidityPoolENPThreshold.entries()
    ]).pipe(
      map(([ellThresholds, enpThresholds]) => {
        const ellThresholdList = ellThresholds.map(([, s]) => s.toHuman() as Threshold);
        const enpThresholdList = enpThresholds.map(([, s]) => s.toHuman() as Threshold);

        return {
          ellThreshold: {
            marginCall: Math.max(...ellThresholdList.map(({ marginCall }) => marginCall)),
            stopOut: Math.max(...ellThresholdList.map(({ stopOut }) => stopOut))
          },
          enpThreshold: {
            marginCall: Math.max(...enpThresholdList.map(({ marginCall }) => marginCall)),
            stopOut: Math.max(...enpThresholdList.map(({ stopOut }) => stopOut))
          }
        };
      })
    );
  };

  public traderInfo = (account: string, poolId: string): Observable<TraderInfo> => {
    return combineLatest([
      (this.api.rpc as any).margin.traderInfo(account),
      this.api.query.marginProtocol.traderRiskThreshold()
    ]).pipe(
      map(([result, traderThreshold]: any) => {
        return {
          equity: result.equity.toString(),
          freeMargin: result.free_margin.toString(),
          marginHeld: result.margin_held.toString(),
          marginLevel: result.margin_level.toString(),
          unrealizedPl: result.unrealized_pl.toString(),
          traderThreshold: traderThreshold.toHuman()
        };
      })
    );
  };

  public allPoolIds = () => {
    return this.api.query.baseLiquidityPoolsForMargin
      .nextPoolId()
      .pipe(map(result => [...new Array(result.toNumber())].map((_, i) => `${i}`)));
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
        return allResult
          .filter(([, value]) => {
            return !value.isEmpty;
          })
          .map(([storageKey, value]) => {
            const data: any = storageKey.args[1];
            return {
              poolId: data[0].toString(),
              positionId: data[1].toString(),
              isOpen: (value as any).value.isTrue
            };
          });
      })
    );
  };

  public openPosition = async (
    account: string,
    poolId: string,
    pair: {
      base: TokenId;
      quote: TokenId;
    },
    leverage: LeverageEnum,
    leveragedAmount: string | BN,
    price: string | BN
  ) => {
    const extrinsic = this.api.tx.marginProtocol.openPosition(poolId, pair, leverage, leveragedAmount, price);
    return this.apiProvider.extrinsicHelper(extrinsic, account, { action: 'Open Position' });
  };

  public closePosition = async (account: string, positionId: string, price: string | BN = '0') => {
    const extrinsic = this.api.tx.marginProtocol.closePosition(positionId, price);
    return this.apiProvider.extrinsicHelper(extrinsic, account, { action: 'Close Position' });
  };

  public deposit = async (account: string, poolId: string, amount: string | BN) => {
    const extrinsic = this.api.tx.marginProtocol.deposit(poolId, amount);
    return this.apiProvider.extrinsicHelper(extrinsic, account, { action: 'Deposit' });
  };

  public withdraw = async (account: string, poolId: string, amount: string | BN) => {
    const extrinsic = this.api.tx.marginProtocol.withdraw(poolId, amount);
    return this.apiProvider.extrinsicHelper(extrinsic, account, { action: 'Withdraw' });
  };

  public depositLiquidity = async (account: string, poolId: string, amount: string | BN) => {
    const extrinsic = this.api.tx.baseLiquidityPoolsForMargin.depositLiquidity(poolId, amount);
    return this.apiProvider.extrinsicHelper(extrinsic, account, { action: 'Deposit Liquidity' });
  };

  public withdrawLiquidity = async (account: string, poolId: string, amount: string | BN) => {
    const extrinsic = this.api.tx.baseLiquidityPoolsForMargin.withdrawLiquidity(poolId, amount);
    return this.apiProvider.extrinsicHelper(extrinsic, account, { action: 'Withdraw Liquidity' });
  };
}

export default Margin;
