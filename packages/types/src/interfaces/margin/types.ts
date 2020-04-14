// Auto-generated via `yarn polkadot-types-from-defs`, do not edit
/* eslint-disable */

import { Struct } from '@polkadot/types/codec';
import { Fixed128 } from '@laminar/types/interfaces/runtime';

/** @name PoolInfo */
export interface PoolInfo extends Struct {
  readonly enp: Fixed128;
  readonly ell: Fixed128;
}

/** @name TraderInfo */
export interface TraderInfo extends Struct {
  readonly equity: Fixed128;
  readonly margin_held: Fixed128;
  readonly margin_level: Fixed128;
  readonly free_margin: Fixed128;
  readonly unrealized_pl: Fixed128;
}

export type PHANTOM_MARGIN = 'margin';
