import BN from 'bn.js';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SyntheticPoolInfo, TokenId } from '../types';
import LaminarApi from './LaminarApi';

class Synthetic {
  private apiProvider: LaminarApi;
  private api: LaminarApi['api'];

  constructor(provider: LaminarApi) {
    this.apiProvider = provider;
    this.api = provider.api;
  }

  depositLiquidity(account: string, poolId: string, amount: string | BN) {
    const extrinsic = this.api.tx.baseLiquidityPoolsForSynthetic.depositLiquidity(poolId, amount);
    return this.apiProvider.extrinsicHelper(extrinsic, account, { action: 'Deposit Liquidity' });
  }

  withdrawLiquidity(account: string, poolId: string, amount: string | BN) {
    const extrinsic = this.api.tx.baseLiquidityPoolsForSynthetic.withdrawLiquidity(poolId, amount);
    return this.apiProvider.extrinsicHelper(extrinsic, account, { action: 'Withdraw Liquidity' });
  }

  poolInfo(poolId: string): Observable<SyntheticPoolInfo | null> {
    return combineLatest([
      this.api.query.baseLiquidityPoolsForSynthetic.pools(poolId),
      this.api.query.syntheticLiquidityPools.poolCurrencyOptions.entries(poolId),
      this.api.query.syntheticLiquidityPools.minAdditionalCollateralRatio()
    ]).pipe(
      map(([pool, liquidityPoolOptions, minAdditionalCollateralRatio]) => {
        if (pool.isEmpty) return null;
        const { owner, balance } = pool.unwrap();
        return {
          poolId: poolId,
          owner: owner.toString(),
          balance: balance.toString(),
          options: liquidityPoolOptions.map(([storageKey, options]) => {
            const tokenId = storageKey.args[1].toJSON();

            const data = options.toHuman() || {};

            const _minAdditionalCollateralRatio = minAdditionalCollateralRatio.toHuman();

            const additionalCollateralRatio =
              _minAdditionalCollateralRatio > (data as any).additionalCollateralRatio
                ? _minAdditionalCollateralRatio
                : (data as any).additionalCollateralRatio;

            return {
              tokenId: tokenId,
              ...(data as any),
              additionalCollateralRatio
            };
          })
        };
      })
    );
  }

  public allPoolIds = () => {
    return this.api.query.baseLiquidityPoolsForSynthetic
      .nextPoolId()
      .pipe(map(result => [...new Array(Number.parseInt(result.toString()))].map((_, i) => `${i}`)));
  };

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
