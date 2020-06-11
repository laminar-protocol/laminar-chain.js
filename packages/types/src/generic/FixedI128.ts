import { i128 } from '@polkadot/types/primitive';

export default class FixedI128 extends i128 {
  toHuman() {
    return super.toString();
  }
}
