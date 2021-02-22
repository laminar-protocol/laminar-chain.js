import BN from 'bn.js';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SyntheticPoolInfo, TokenId } from '../types';
import LaminarApi from './LaminarApi';
import { permillToFixedU128 } from '../utils';

class Synthetic {
  private apiProvider: LaminarApi;
  private api: LaminarApi['api'];

  constructor(provider: LaminarApi) {
    this.apiProvider = provider;
    this.api = provider.api;
  }

  poolInfo(poolId: string): Observable<SyntheticPoolInfo | null> {
    return combineLatest([
      this.api.query.baseLiquidityPoolsForSynthetic.pools(poolId),
      this.api.query.syntheticLiquidityPools.poolCurrencyOptions.entries(poolId),
      this.api.query.syntheticLiquidityPools.minAdditionalCollateralRatio(),
      this.api.query.syntheticLiquidityPools.maxSpread.entries(),
    ]).pipe(
      map(([pool, liquidityPoolOptions, minAdditionalCollateralRatio, allMaxSpread]) => {
        if (pool.isEmpty) return null;

        const { owner, balance } = pool.unwrap();

        const maxSpreadMap = new Map();

        for (const [storageKey, value] of allMaxSpread) {
          if (!value.isNone) {
            maxSpreadMap.set(storageKey.args.toString(), value.unwrap());
          }
        }

        return {
          poolId: poolId,
          owner: owner.toString(),
          balance: balance.toString(),
          options: liquidityPoolOptions.map(([storageKey, options]) => {
            const tokenId = storageKey.args[1].toString();

            let { bidSpread, askSpread, additionalCollateralRatio: poolAdditionalCollateralRatio } = options;

            const additionalCollateralRatio =
              poolAdditionalCollateralRatio.isNone ||
              minAdditionalCollateralRatio.gt(poolAdditionalCollateralRatio.unwrap())
                ? minAdditionalCollateralRatio
                : poolAdditionalCollateralRatio.unwrap();

            const maxSpread = maxSpreadMap.get(tokenId);

            if (maxSpread && !bidSpread.isNone && bidSpread.unwrap().gt(maxSpread)) {
              bidSpread = maxSpread;
            }
            if (maxSpread && !askSpread.isNone && askSpread.unwrap().gt(maxSpread)) {
              bidSpread = maxSpread;
            }

            return {
              tokenId: tokenId,
              askSpread: askSpread.toString(),
              bidSpread: bidSpread.toString(),
              additionalCollateralRatio: permillToFixedU128(additionalCollateralRatio).toString(),
            };
          }),
        };
      })
    );
  }

  public allPoolIds = () => {
    return this.api.query.baseLiquidityPoolsForSynthetic
      .nextPoolId()
      .pipe(map((result) => [...new Array(result.toNumber())].map((_, i) => `${i}`)));
  };

  depositLiquidity(account: string, poolId: string, amount: string | BN) {
    const extrinsic = this.api.tx.baseLiquidityPoolsForSynthetic.depositLiquidity(poolId, amount);
    return this.apiProvider.extrinsicHelper(extrinsic, account, { action: 'Deposit Liquidity' });
  }

  withdrawLiquidity(account: string, poolId: string, amount: string | BN) {
    const extrinsic = this.api.tx.baseLiquidityPoolsForSynthetic.withdrawLiquidity(poolId, amount);
    return this.apiProvider.extrinsicHelper(extrinsic, account, { action: 'Withdraw Liquidity' });
  }

  public redeem = async (account: string, poolId: string, fromToken: TokenId, fromAmount: string | BN) => {
    const extrinsic = this.api.tx.syntheticProtocol.redeem(poolId, fromToken as any, fromAmount, '0');
    return this.apiProvider.extrinsicHelper(extrinsic, account, { action: 'Swap' });
  };

  public mint = async (account: string, poolId: string, toToken: TokenId, fromAmount: string | BN) => {
    const extrinsic = this.api.tx.syntheticProtocol.mint(
      poolId,
      toToken as any,
      fromAmount,
      '100000000000000000000000'
    );
    return this.apiProvider.extrinsicHelper(extrinsic, account, { action: 'Swap' });
  };
}

export default Synthetic;
