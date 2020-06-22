// Auto-generated via `yarn polkadot-types-from-defs`, do not edit
/* eslint-disable */

import { Struct } from '@polkadot/types/codec';
import { FixedI128 } from '@laminar/types/interfaces/runtime';

/** @name SyntheticPoolState */
export interface SyntheticPoolState extends Struct {
  readonly collateral_ratio: FixedI128;
  readonly is_safe: boolean;
}

export type PHANTOM_SYNTHETIC = 'synthetic';
