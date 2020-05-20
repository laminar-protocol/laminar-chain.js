import { i128 } from '@polkadot/types/primitive';

export default class Fixed128 extends i128 {
  toHuman() {
    return super.toString();
  }
}
