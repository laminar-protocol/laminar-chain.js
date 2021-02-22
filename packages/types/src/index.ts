import {
  rpc as lamianrRpc,
  types as lamianrTypes,
  typesAlias as lamianrTypesAlias,
  typesBundle as lamianrTypesBundle,
} from '@laminar/type-definitions';
import {
  DefinitionRpc,
  DefinitionRpcSub,
  OverrideBundleType,
  OverrideModuleType,
  RegistryTypes,
} from '@polkadot/types/types';
import './augment-api';
import './augment-api-consts';
import './augment-api-query';
import './augment-api-rpc';
import './augment-api-tx';
import './augment-types';

export * from './augment-api-mobx';

export const types: RegistryTypes = lamianrTypes;

export const rpc: Record<string, Record<string, DefinitionRpc | DefinitionRpcSub>> = lamianrRpc;

export const typesAlias: Record<string, OverrideModuleType> = lamianrTypesAlias;

export const typesBundle = lamianrTypesBundle as OverrideBundleType;
