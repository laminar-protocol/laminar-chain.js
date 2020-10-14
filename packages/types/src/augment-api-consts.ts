// Auto-generated via `yarn polkadot-types-from-chain`, do not edit
/* eslint-disable */

import { Codec } from '@polkadot/types/types';
import { Vec } from '@polkadot/types/codec';
import { u32 } from '@polkadot/types/primitive';
import { AccountId, Balance, CurrencyId, CurrencyIdOf, IdentityDepositBalanceOf, Permill, TransactionPriority } from '@laminar/types/interfaces/runtime';
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
    marginProtocol: {
      [key: string]: Codec;
      getPoolMaxOpenPositions: u32 & AugmentedConst<ApiType>;
      getTraderMaxOpenPositions: u32 & AugmentedConst<ApiType>;
      getTreasuryAccountId: AccountId & AugmentedConst<ApiType>;
      unsignedPriority: TransactionPriority & AugmentedConst<ApiType>;
    };
    syntheticProtocol: {
      [key: string]: Codec;
      getCollateralCurrencyId: CurrencyId & AugmentedConst<ApiType>;
    };
    syntheticTokens: {
      [key: string]: Codec;
      defaultCollateralRatio: Permill & AugmentedConst<ApiType>;
      defaultExtremeRatio: Permill & AugmentedConst<ApiType>;
      defaultLiquidationRatio: Permill & AugmentedConst<ApiType>;
      syntheticCurrencyIds: Vec<CurrencyId> & AugmentedConst<ApiType>;
    };
  }

  export interface QueryableConsts<ApiType extends ApiTypes> extends AugmentedConsts<ApiType> {
    [key: string]: QueryableModuleConsts;
  }
}
