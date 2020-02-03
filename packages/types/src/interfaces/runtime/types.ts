// Auto-generated via `yarn build:interfaces`, do not edit
/* eslint-disable @typescript-eslint/no-empty-interface */

import { Enum, Option, Struct } from '@polkadot/types/codec';
import { i128, u16, u32 } from '@polkadot/types/primitive';
import { Permill, Balance, Price } from '@orml/types/interfaces';

/** Enum */
export interface CurrencyId extends Enum {
  /** 0:: LAMI */
  readonly LAMI: boolean;
  /** 1:: AUSD */
  readonly AUSD: boolean;
  /** 1:: FEUR */
  readonly FEUR: boolean;
  /** 1:: FJPY */
  readonly FJPY: boolean;
}

/** CurrencyId */
export interface CurrencyIdOf extends CurrencyId {}

/** i128 */
export interface Amount extends i128 {}

/** i128 */
export interface AmountOf extends Amount {}

/** OracleKey */
export interface OracleKey extends CurrencyId {}

/** OracleValue */
export interface OracleValue extends Price {}

/** u32 */
export interface LiquidityPoolId extends u32 {}

/** u16 */
export interface Leverages extends u16 {}

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

/** Struct */
export interface Position extends Struct {
  /** Balance */
  readonly collateral: Balance;
  /** Balance */
  readonly synthetic: Balance;
}
