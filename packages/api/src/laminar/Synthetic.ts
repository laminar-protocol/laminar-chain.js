import BN from 'bn.js';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { TokenId, SyntheticPoolInfo } from '../types';
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
      this.api.query.baseLiquidityPoolsForSynthetic.owners(poolId),
      this.api.query.baseLiquidityPoolsForSynthetic.balances(poolId),
      this.api.query.syntheticLiquidityPools.liquidityPoolOptions.entries(poolId),
      this.api.query.syntheticLiquidityPools.minAdditionalCollateralRatio()
    ]).pipe(
      map(([owner, balances, liquidityPoolOptions, minAdditionalCollateralRatio]) => {
        if (owner.isEmpty) return null;
        return {
          poolId: poolId,
          owner: owner.isEmpty ? null : (owner as any).value[0].toJSON(),
          balance: balances.toString(),
          options: liquidityPoolOptions.map(([storageKey, options]) => {
            const tokenId = storageKey.args[1].toJSON();

            const data = options.toHuman() || {};

            const _minAdditionalCollateralRatio = new BN(minAdditionalCollateralRatio.toString()).toNumber();

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
