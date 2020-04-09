import { Struct } from '@polkadot/types/codec';

export default class Position extends Struct {
  toHuman() {
    return [...this.keys()].reduce((json: any, key) => {
      const value = this.get(key);
      json[key] = value && value.toString();
      return json;
    }, {});
  }
}
