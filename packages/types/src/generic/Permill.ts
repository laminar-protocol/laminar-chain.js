import { u32 } from '@polkadot/types/primitive';

import { fromPrecision } from '../utils/precision';
export default class Permill extends u32 {
  public precision = 6;

  toHuman() {
    return Number(fromPrecision(super.toJSON(), this.precision));
  }
}
