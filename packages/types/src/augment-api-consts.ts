// Auto-generated via `yarn polkadot-types-from-chain`, do not edit
/* eslint-disable */

import { Codec } from '@polkadot/types/types';
import { Balance, CurrencyId, CurrencyIdOf, IdentityDepositBalanceOf } from '@laminar/types/interfaces/runtime';
import { ApiTypes } from '@polkadot/api/types';

declare module '@polkadot/api/types/consts' {
  export interface AugmentedConsts<ApiType> {
    baseLiquidityPoolsForMargin: {
      [key: string]: Codec;
      deposit: IdentityDepositBalanceOf & AugmentedConst<ApiType>;
      existentialDeposit: Balance & AugmentedConst<ApiType>;
    };
    baseLiquidityPoolsForSynthetic: {
      [key: string]: Codec;
      deposit: IdentityDepositBalanceOf & AugmentedConst<ApiType>;
      existentialDeposit: Balance & AugmentedConst<ApiType>;
    };
    currencies: {
      [key: string]: Codec;
      nativeCurrencyId: CurrencyIdOf & AugmentedConst<ApiType>;
    };
    syntheticProtocol: {
      [key: string]: Codec;
      getCollateralCurrencyId: CurrencyId & AugmentedConst<ApiType>;
    };
  }

  export interface QueryableConsts<ApiType extends ApiTypes> extends AugmentedConsts<ApiType> {
    [key: string]: QueryableModuleConsts;
  }
}
