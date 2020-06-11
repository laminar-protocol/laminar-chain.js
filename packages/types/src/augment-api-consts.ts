// Auto-generated via `yarn polkadot-types-from-chain`, do not edit
/* eslint-disable */

import { Codec } from '@polkadot/types/types';
import { Vec } from '@polkadot/types/codec';
import { Balance, CurrencyId, CurrencyIdOf, DepositBalanceOf, Permill } from '@laminar/types/interfaces/runtime';

declare module '@polkadot/metadata/Decorated/consts/types' {
  export interface Constants {
    [index: string]: ModuleConstants;
    baseLiquidityPoolsForMargin: {
      [index: string]: AugmentedConst<object & Codec>;
      deposit: AugmentedConst<DepositBalanceOf>;
      existentialDeposit: AugmentedConst<Balance>;
    };
    baseLiquidityPoolsForSynthetic: {
      [index: string]: AugmentedConst<object & Codec>;
      deposit: AugmentedConst<DepositBalanceOf>;
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
    syntheticTokens: {
      [index: string]: AugmentedConst<object & Codec>;
      defaultCollateralRatio: AugmentedConst<Permill>;
      defaultExtremeRatio: AugmentedConst<Permill>;
      defaultLiquidationRatio: AugmentedConst<Permill>;
      syntheticCurrencyIds: AugmentedConst<Vec<CurrencyId>>;
    };
  }
}
