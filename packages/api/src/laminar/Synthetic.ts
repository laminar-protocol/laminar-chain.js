import { Balance, Permill, SyntheticLiquidityPoolOption, PositionId } from '@laminar/types/interfaces';
import { Option } from '@polkadot/types/codec';
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
      this.api.query.baseLiquidityPoolsForSynthetic.balances<Option<Balance>>(poolId),
      this.api.query.syntheticLiquidityPools.liquidityPoolOptions.entries<Option<SyntheticLiquidityPoolOption>>(poolId),
      this.api.query.syntheticLiquidityPools.minAdditionalCollateralRatio<Permill>()
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

            const additionalCollateralRatio =
              minAdditionalCollateralRatio.toHuman() > (data as any).additionalCollateralRatio
                ? minAdditionalCollateralRatio.toHuman()
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
      .nextPoolId<PositionId>()
      .pipe(map(result => [...new Array(result.toNumber())].map((_, i) => `${i}`)));
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
