import { rpc as ormlRpc, types as ormlTypes, typesAlias as ormlAlias } from '@open-web3/orml-type-definitions';
import { jsonrpcFromDefs, typesAliasFromDefs, typesFromDefs } from '@open-web3/orml-type-definitions/utils';
import margin from './margin';
import runtime from './runtime';
import synthetic from './synthetic';
import versioned from './types-known/versioned';

// FIXME: currently we cannot override this in runtime definations because the code generation script cannot handle overrides
// This will make it behave correctly in runtime, but wrong types in TS defination.
const additionalOverride = {
  Keys: 'SessionKeys2'
};

const laminarDefs = {
  margin,
  runtime,
  synthetic
};

export const types = {
  ...ormlTypes,
  ...typesFromDefs(laminarDefs),
  ...additionalOverride
};

export const typesBundle = {
  spec: {
    acala: {
      types: versioned
    }
  }
};
export const rpc = jsonrpcFromDefs(laminarDefs, { ...ormlRpc });
export const typesAlias = typesAliasFromDefs(laminarDefs, { ...ormlAlias });

// Type overrides have priority issues
export const typesBundleForPolkadot = {
  spec: {
    acala: {
      types: [...versioned].map(version => {
        return {
          minmax: version.minmax,
          types: {
            ...types,
            ...version.types
          }
        };
      })
    }
  }
};
