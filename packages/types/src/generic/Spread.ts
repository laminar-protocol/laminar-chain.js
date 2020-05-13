import { u128 } from '@polkadot/types/primitive';
import { fromPrecision } from '../utils/precision';

export default class Spread extends u128 {
  public precision = 18;

  toHuman() {
    return Number(fromPrecision(super.toJSON(), this.precision));
  }
}
