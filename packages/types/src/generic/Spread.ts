import { u128 } from '@polkadot/types/primitive';
import { formatBalance } from '@polkadot/util';

export default class Spread extends u128 {
  toHuman() {
    return Number(
      formatBalance(this, {
        decimals: this.registry.chainDecimals,
        withSi: false,
        withUnit: false
      })
    );
  }
}
