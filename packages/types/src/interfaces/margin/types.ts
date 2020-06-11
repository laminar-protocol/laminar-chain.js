// Auto-generated via `yarn polkadot-types-from-defs`, do not edit
/* eslint-disable */

import { Struct } from '@polkadot/types/codec';
import { FixedI128, Rate } from '@laminar/types/interfaces/runtime';

/** @name PoolInfo */
export interface PoolInfo extends Struct {
  readonly enp: Rate;
  readonly ell: Rate;
}

/** @name TraderInfo */
export interface TraderInfo extends Struct {
  readonly equity: FixedI128;
  readonly margin_held: FixedI128;
  readonly margin_level: Rate;
  readonly free_margin: FixedI128;
  readonly unrealized_pl: FixedI128;
}

export type PHANTOM_MARGIN = 'margin';
