import { u32 } from '@polkadot/types/primitive';

export default class Permill extends u32{
  toJSON() {
    return super.toJSON()
  }
}
