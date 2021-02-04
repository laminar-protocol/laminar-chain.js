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
import { unit, permillToFixedU128 } from '../utils';
import LaminarApi from './LaminarApi';

class Margin {
  private apiProvider: LaminarApi;
  private api: LaminarApi['api'];

  constructor(provider: LaminarApi) {
    this.apiProvider = provider;
    this.api = provider.api;
  }

  public pairIdHelper = (): Observable<(pair: { base: string; quote: string }) => string> => {
    return this.apiProvider.currencies.tokens().pipe(
      map(tokens => {
        return (pair: { base: string; quote: string }): string => {
          const baseToken = tokens.find(({ id }) => pair.base === id);
          const quoteToken = tokens.find(({ id }) => pair.quote === id);
          return `${baseToken?.name || pair.base}${quoteToken?.name || pair.quote}`;
        };
      })
    );
  };

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
      this.api.query.marginLiquidityPools.poolTradingPairOptions.entries(poolId),
      this.api.query.marginLiquidityPools.tradingPairOptions.entries(),
      this.pairIdHelper()
    ]).pipe(
      map(([poolTradingPairOptionsList, tradingPairOptionsList, getPairId]) => {
        const tradingPairOptionsMap: Record<string, any> = {};

        for (const tradingPairOptions of tradingPairOptionsList) {
          const pairId = getPairId(tradingPairOptions[0].args[0].toJSON() as { base: string; quote: string });
          const options = tradingPairOptions[1];

          tradingPairOptionsMap[pairId] = options;
        }

        return poolTradingPairOptionsList.map(([storageKey, options]) => {
          const pair = storageKey.args[1].toJSON() as { base: string; quote: string };
          const pairId = getPairId(pair);

          let askSpread = options.askSpread;
          let bidSpread = options.bidSpread;

          if (tradingPairOptionsMap[pairId]) {
            const maxSpread = tradingPairOptionsMap[pairId].maxSpread;

            if (!maxSpread.isEmpty) {
              if (!askSpread.isEmpty && maxSpread.value.lt(askSpread.value)) {
                askSpread = maxSpread;
              }
              if (!bidSpread.isEmpty && maxSpread.value.lt(bidSpread.value)) {
                bidSpread = maxSpread;
              }
            }
          }

          const enabledTrades = options.enabledTrades.toJSON();

          return {
            pair: pair,
            pairId: pairId,
            enabledTrades,
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
      this.api.rpc.margin.poolState(poolId),
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
          poolId: `${poolId}`,
          owner: owner.toString(),
          balance: balance.toString(),
          enp: (poolState as any).enp.toString(),
          ell: (poolState as any).ell.toString(),
          options: tradingPairOptions,
          minLeveragedAmount
        };
      })
    );
  };

  public marginInfo = (): Observable<MarginInfo> => {
    return this.api.query.marginProtocol.riskThresholds.entries().pipe(
      map(result => {
        const list = result.map(([, s]) => s);

        const ellList = list.filter(({ ell }) => !ell.isNone).map(({ ell }) => ell.unwrap());
        const enpList = list.filter(({ enp }) => !enp.isNone).map(({ enp }) => enp.unwrap());

        const getListMaxValue = (riskList: BN[]) => {
          return permillToFixedU128(
            riskList.reduce((a, b) => {
              return BN.max(a, b);
            }, new BN(0))
          ).toString();
        };

        return {
          ellThreshold: {
            marginCall: getListMaxValue(ellList.map(({ marginCall }) => marginCall)),
            stopOut: getListMaxValue(ellList.map(({ stopOut }) => stopOut))
          },
          enpThreshold: {
            marginCall: getListMaxValue(enpList.map(({ marginCall }) => marginCall)),
            stopOut: getListMaxValue(enpList.map(({ stopOut }) => stopOut))
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
            .div(marginLevel)
            .toString()
        };
      })
    );
  };

  public traderThreshold = (baseToken: string, quoteToken: string): Observable<Threshold> => {
    return this.api.query.marginProtocol
      .riskThresholds({
        base: baseToken,
        quote: quoteToken
      })
      .pipe(
        map(result => {
          if (result.trader.isNone) {
            return {
              marginCall: '0',
              stopOut: '0'
            };
          } else {
            const { marginCall, stopOut } = result.trader.unwrap();
            return {
              marginCall: permillToFixedU128(marginCall).toString(),
              stopOut: permillToFixedU128(stopOut).toString()
            };
          }
        })
      );
  };

  public accumulatedSwapRates = (): Observable<AccumulatedSwapRate[]> => {
    return combineLatest([
      this.api.query.marginLiquidityPools.accumulatedSwapRates.entries(),
      this.pairIdHelper()
    ]).pipe(
      map(([result, getPairId]) => {
        return result.map(([key, value]) => {
          const pair = key.args[1].toJSON() as { base: string; quote: string };
          const pairId = getPairId(pair);

          return {
            poolId: key.args[0].toString(),
            pair,
            pairId,
            long: value.long.toString(),
            short: value.short.toString()
          };
        });
      })
    );
  };

  public position = (positionId: string): Observable<MarginPosition | null> => {
    return this.api.query.marginProtocol.positions(positionId).pipe(
      map(result => {
        if (result.isEmpty) return null;

        const unwrapPosition = result.unwrap();

        return {
          owner: unwrapPosition.owner.toString(),
          poolId: unwrapPosition.poolId.toString(),
          pair: {
            base: unwrapPosition.pair.base.toString(),
            quote: unwrapPosition.pair.quote.toString()
          },
          leverage: unwrapPosition.leverage.toString(),
          leveragedHeld: unwrapPosition.leveragedHeld.toString(),
          leveragedDebits: unwrapPosition.leveragedDebits.toString(),
          marginHeld: unwrapPosition.marginHeld.toString(),
          openAccumulatedSwapRate: unwrapPosition.openAccumulatedSwapRate.toString()
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
            pair: data[0].toJSON(),
            positionId: data[1].toString()
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
          .map(([storageKey]) => {
            const data: any = storageKey.args[1];
            return {
              poolId: data[0].toString(),
              positionId: data[1].toString()
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
