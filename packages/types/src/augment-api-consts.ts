// Auto-generated via `yarn polkadot-types-from-chain`, do not edit
/* eslint-disable */

import { Codec } from '@polkadot/types/types';
import { Balance, CurrencyId, CurrencyIdOf, IdentityDepositBalanceOf } from '@laminar/types/interfaces/runtime';

declare module '@polkadot/metadata/Decorated/consts/types' {
  export interface Constants {
    [index: string]: ModuleConstants;
    baseLiquidityPoolsForMargin: {
      [index: string]: AugmentedConst<object & Codec>;
      deposit: AugmentedConst<IdentityDepositBalanceOf>;
      existentialDeposit: AugmentedConst<Balance>;
    };
    baseLiquidityPoolsForSynthetic: {
      [index: string]: AugmentedConst<object & Codec>;
      deposit: AugmentedConst<IdentityDepositBalanceOf>;
      existentialDeposit: AugmentedConst<Balance>;
    };
    currencies: {
      [index: string]: AugmentedConst<object & Codec>;
      nativeCurrencyId: AugmentedConst<CurrencyIdOf>;
    };
    syntheticProtocol: {
      [index: string]: AugmentedConst<object & Codec>;
      getCollateralCurrencyId: AugmentedConst<CurrencyId>;
    };
  }
}
