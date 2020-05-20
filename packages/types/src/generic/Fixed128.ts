import { u128 } from '@polkadot/types/primitive';

export default class Fixed128 extends u128 {
  toHuman() {
    return super.toString();
  }
}
