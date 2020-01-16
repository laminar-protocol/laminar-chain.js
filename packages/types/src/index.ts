import { assertSingletonPackage } from '@polkadot/util';
import { RegistryTypes } from '@polkadot/types/types';
import * as ormlDefinations from '@orml/types/interfaces/definitions';

import * as laminarDefinations from './interfaces/definitions';

export { InterfaceRegistry } from './interfaceRegistry';

assertSingletonPackage('@laminar/types');

export const allDefinitions = {
  ...ormlDefinations,
  ...laminarDefinations
};

export const types: RegistryTypes = Object.values(allDefinitions).map(({ types }) => types).reduce((all, types) => Object.assign(all, types), {});
