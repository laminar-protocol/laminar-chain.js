import * as ormlDefinations from '@open-web3/orml-types/interfaces/definitions';
import polkadotJSONRpc from '@polkadot/types/interfaces/jsonrpc';
import { RegistryTypes } from '@polkadot/types/types';
import './augment-api';
import './augment-types';
import * as laminarDefinations from './interfaces/definitions';
import jsonrpc from './interfaces/jsonrpc';
import _typesBundle from '@laminar/type-definitions/types-known/typesBundle';
import _typesAlias from '@laminar/type-definitions/types-known/typesAlias';
import { OverrideModuleType, OverrideBundleType } from '@polkadot/types/types';

export * from './augment-api-mobx';

// FIXME: currently we cannot override this in runtime definations because the code generation script cannot handle overrides
// This will make it behave correctly in runtime, but wrong types in TS defination.
const additionalOverride = {
  types: {
    Keys: 'SessionKeys2'
  }
};

export const allDefinitions = {
  ...ormlDefinations,
  ...laminarDefinations,
  additionalOverride
};

export const allJSONRpc = {
  ...polkadotJSONRpc,
  ...jsonrpc
};

export const types: RegistryTypes = Object.values(allDefinitions)
  .map(({ types }) => types as any)
  .reduce((all, types) => Object.assign(all, types), {});

export const typesBundle = _typesBundle as OverrideBundleType;
export const typesAlias = _typesAlias as Record<string, OverrideModuleType>;
