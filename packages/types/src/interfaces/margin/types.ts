// Auto-generated via `yarn polkadot-types-from-defs`, do not edit
/* eslint-disable */

import type { Struct } from '@polkadot/types';
import type { FixedI128 } from '@laminar/types/interfaces/runtime';

/** @name MarginPoolState */
export interface MarginPoolState extends Struct {
  readonly enp: FixedI128;
  readonly ell: FixedI128;
  readonly required_deposit: FixedI128;
}

/** @name MarginTraderState */
export interface MarginTraderState extends Struct {
  readonly equity: FixedI128;
  readonly margin_held: FixedI128;
  readonly margin_level: FixedI128;
  readonly free_margin: FixedI128;
  readonly unrealized_pl: FixedI128;
}

export type PHANTOM_MARGIN = 'margin';
