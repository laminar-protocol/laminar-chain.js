// Auto-generated via `yarn build:interfaces`, do not edit
/* eslint-disable @typescript-eslint/no-empty-interface */

import { Enum, Option, Struct } from '@polkadot/types/codec';
import { i128, u16, u32 } from '@polkadot/types/primitive';
import { Price, Permill, Balance } from '@orml/types/interfaces';

/** i128 */
export interface Amount extends i128 {}

/** Amount */
export interface AmountOf extends Amount {}

/** Enum */
export interface CurrencyId extends Enum {
  /** 0:: LAMI */
  readonly isLami: boolean;
  /** 1:: AUSD */
  readonly isAusd: boolean;
  /** 2:: FEUR */
  readonly isFeur: boolean;
  /** 3:: FJPY */
  readonly isFjpy: boolean;
}

/** CurrencyId */
export interface CurrencyIdOf extends CurrencyId {}

/** u16 */
export interface Leverages extends u16 {}

/** u32 */
export interface LiquidityPoolId extends u32 {}

/** Struct */
export interface LiquidityPoolOption extends Struct {
  /** Permill */
  readonly bidSpread: Permill;
  /** Permill */
  readonly askSpread: Permill;
  /** Option<Permill> */
  readonly additionalCollateralRatio: Option<Permill>;
  /** Leverages */
  readonly enabled: Leverages;
}

/** CurrencyId */
export interface OracleKey extends CurrencyId {}

/** Price */
export interface OracleValue extends Price {}

/** Struct */
export interface Position extends Struct {
  /** Balance */
  readonly collateral: Balance;
  /** Balance */
  readonly synthetic: Balance;
}
