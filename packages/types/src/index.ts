import { assertSingletonPackage } from '@polkadot/util';
import { RegistryTypes } from '@polkadot/types/types';
import * as ormlDefinations from '@orml/types/interfaces/definitions';

import * as flowchainDefinations from './interfaces/definitions';

export { InterfaceRegistry } from './interfaceRegistry';

assertSingletonPackage('@flowchain/types');

export const allDefinitions = {
  ...ormlDefinations,
  ...flowchainDefinations
};

export const types: RegistryTypes = Object.values(allDefinitions).map(({ types }) => types).reduce((all, types) => Object.assign(all, types), {});
