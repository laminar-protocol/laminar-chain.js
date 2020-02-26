import { RegistryTypes } from '@polkadot/types/types';
import * as ormlDefinations from '@orml/types/interfaces/definitions';

import * as laminarDefinations from './interfaces/definitions';
import { Permill } from './generic';

export const allDefinitions = {
  ...ormlDefinations,
  ...laminarDefinations
};

export const types: RegistryTypes = Object.values(allDefinitions)
  .map(({ types }) => ({
    ...types,
    Permill
  }))
  .reduce((all, types) => Object.assign(all, types), {});
