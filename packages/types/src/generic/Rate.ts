import { i128 } from '@polkadot/types/primitive';
import { fromPrecision } from '../utils/precision';

export default class Rate extends i128 {
  public precision = 18;

  toHuman() {
    console.log('11111');
    return Number(fromPrecision(super.toString(), this.precision));
  }
}
