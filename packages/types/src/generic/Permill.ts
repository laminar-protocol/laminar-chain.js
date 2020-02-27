import { u32 } from '@polkadot/types/primitive';
import { AnyJson } from '@polkadot/types/types';

import { fromPrecision } from '../utils/precision';
export default class Permill extends u32 {
  public precision = 6;

  toJSON(): AnyJson {
    return fromPrecision(super.toJSON(), this.precision);
  }
}
