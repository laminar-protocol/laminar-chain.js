import { u128 } from '@polkadot/types/primitive';

export default class Spread extends u128 {
  toHuman() {
    return super.toString();
  }
}
