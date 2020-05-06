import { RegistryTypes } from '@polkadot/types/types';
import polkadotJSONRpc from '@polkadot/types/interfaces/jsonrpc';
import * as ormlDefinations from '@open-web3/orml-types/interfaces/definitions';

import * as laminarDefinations from './interfaces/definitions';
import jsonrpc from './interfaces/jsonrpc';

import * as genericTypes from './generic';

import './augment-api';
import './augment-types';

export * from './known';

export { default as metadata } from './metadata/known';

export const allDefinitions = {
  ...ormlDefinations,
  ...laminarDefinations
};

export const allJSONRpc = {
  ...polkadotJSONRpc,
  ...jsonrpc
};

export const types: RegistryTypes = Object.values(allDefinitions)
  .map(({ types }) => ({
    ...types,
    ...genericTypes
  }))
  .reduce((all, types) => Object.assign(all, types), {});
