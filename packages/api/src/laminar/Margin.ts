import BN from 'bn.js';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  AccumulatedSwapRate,
  LeverageEnum,
  MarginInfo,
  MarginPoolInfo,
  MarginPosition,
  Threshold,
  TokenId,
  TraderInfo
} from '../types';
import { unit } from '../utils';
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
            return total.add(new BN(balance.toString()));
          }, new BN(0))
          .toString()
      )
    );
  };

  public tradingPairOptions = (poolId: string): Observable<MarginPoolInfo['options']> => {
    return combineLatest([
      this.apiProvider.currencies.tokens(),
      this.api.query.marginLiquidityPools.poolTradingPairOptions.entries(poolId),
      this.api.query.marginLiquidityPools.tradingPairOptions.entries()
    ]).pipe(
      map(([tokens, poolTradingPairOptionsList, tradingPairOptionsList]) => {
        const getPairId = (pair: { base: string; quote: string }): string => {
          const baseToken = tokens.find(({ id }) => pair.base === id);
          const quoteToken = tokens.find(({ id }) => pair.quote === id);
          return `${baseToken?.name || pair.base}${quoteToken?.name || pair.quote}`;
        };

        const tradingPairOptionsMap: Record<string, any> = {};

        for (const tradingPairOptions of tradingPairOptionsList) {
          const pairId = getPairId(tradingPairOptions[0].args[0].toJSON() as { base: string; quote: string });
          const options = tradingPairOptions[1];

          tradingPairOptionsMap[pairId] = options;
        }

        return poolTradingPairOptionsList.map(([storageKey, options]) => {
          const pair = storageKey.args[1].toJSON() as {
            base: string;
            quote: string;
          };

          const pairId = getPairId(pair);

          let askSpread = options.askSpread;
          let bidSpread = options.bidSpread;

          if (tradingPairOptionsMap[pairId]) {
            const maxSpread = tradingPairOptionsMap[pairId].maxSpread;

            if (!maxSpread.isEmpty && !askSpread.isEmpty && maxSpread.value.lt(askSpread.value)) {
              askSpread = maxSpread;
            }

            if (!maxSpread.isEmpty && !bidSpread.isEmpty && maxSpread.value.lt(bidSpread.value)) {
              bidSpread = maxSpread;
            }
          }

          const data = options.toHuman() || {};

          return {
            pair: pair,
            pairId: pairId,
            ...(data as any),
            askSpread: askSpread.toString(),
            bidSpread: bidSpread.toString()
          };
        });
      })
    );
  };

  public poolInfo = (poolId: string): Observable<MarginPoolInfo | null> => {
    return combineLatest([
      this.tradingPairOptions(poolId),
      this.api.query.baseLiquidityPoolsForMargin.pools(poolId),
      this.api.rpc.margin.poolState(poolId as any),
      this.api.query.marginLiquidityPools.poolOptions(poolId),
      this.api.query.marginLiquidityPools.defaultMinLeveragedAmount()
    ]).pipe(
      map(([tradingPairOptions, pool, poolState, poolOptions, defaultMinLeveragedAmount]) => {
        if (pool.isEmpty) return null;
        const { owner, balance } = pool.unwrap();

        const minLeveragedAmount = poolOptions.minLeveragedAmount.gt(defaultMinLeveragedAmount)
          ? poolOptions.minLeveragedAmount.toString()
          : defaultMinLeveragedAmount.toString();

        return {
          poolId: poolId,
          owner: owner.toString(),
          balance: balance.toString(),
          enp: Number(poolState.enp.toString()),
          ell: Number(poolState.ell.toString()),
          options: tradingPairOptions,
          minLeveragedAmount
        };
      })
    );
  };

  public marginInfo = (): Observable<MarginInfo> => {
    return this.api.query.marginProtocol.riskThresholds.entries().pipe(
      map(result => {
        const list = result.map(([, s]) => s.toHuman() as any);

        return {
          ellThreshold: {
            marginCall: Math.max(...list.filter(({ ell }) => ell).map(({ ell }) => ell.marginCall)),
            stopOut: Math.max(...list.filter(({ ell }) => ell).map(({ ell }) => ell.stopOut))
          },
          enpThreshold: {
            marginCall: Math.max(...list.filter(({ enp }) => enp).map(({ enp }) => enp.marginCall)),
            stopOut: Math.max(...list.filter(({ enp }) => enp).map(({ enp }) => enp.stopOut))
          }
        };
      })
    );
  };

  public traderInfo = (account: string, poolId: string): Observable<TraderInfo> => {
    return combineLatest([
      this.api.rpc.margin.traderState(account, poolId as any),
      this.api.query.marginProtocol.balances(account, poolId)
    ]).pipe(
      map(([result, balance]) => {
        const equity = result.equity;
        const marginLevel = result.margin_level;
        const unrealizedPl = result.unrealized_pl;

        return {
          balance: balance.toString(),
          freeMargin: result.free_margin.toString(),
          marginHeld: result.margin_held.toString(),
          unrealizedPl: unrealizedPl.toString(),
          accumulatedSwap: equity
            .sub(balance)
            .sub(unrealizedPl)
            .toString(),
          equity: equity.toString(),
          marginLevel: marginLevel.toString(),
          totalLeveragedPosition: equity
            .mul(unit)
            .div(marginLevel.toBn())
            .toString()
        };
      })
    );
  };

  public traderThreshold = (baseToken: TokenId, quoteToken: TokenId): Observable<Threshold> => {
    return this.api.query.marginProtocol
      .riskThresholds({
        base: baseToken,
        quote: quoteToken
      })
      .pipe(
        map(
          result =>
            (result.toHuman() as any)?.trader ||
            ({
              marginCall: 0,
              stopOut: 0
            } as Threshold)
        )
      );
  };

  public accumulatedSwapRates = (): Observable<AccumulatedSwapRate[]> => {
    return this.api.query.marginLiquidityPools.accumulatedSwapRates.entries().pipe(
      map(result => {
        return result.map(([key, value]) => {
          const pair = key.args[1].toJSON() as { base: string; quote: string };
          const { long, short } = value.toHuman() as { long: number; short: number };
          return { poolId: `${key.args[0].toJSON()}`, pair, pairId: `${pair.base}${pair.quote}`, long, short };
        });
      })
    );
  };

  public position = (positionId: string): Observable<MarginPosition | null> => {
    return this.api.query.marginProtocol.positions(positionId).pipe(
      map(result => {
        if (result.isEmpty) return null;
        return result.toHuman() as any;
      })
    );
  };

  public allPoolIds = () => {
    return this.api.query.baseLiquidityPoolsForMargin
      .nextPoolId()
      .pipe(map(result => [...new Array(Number.parseInt(result.toString()))].map((_, i) => `${i}`)));
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
