import { derive as ormlDerives } from '@open-web3/orml-api-derive';
import {
  types as laminarTypes,
  typesAlias as laminarTypesAlias,
  typesBundle as laminarTypesBundle
} from '@laminar/types';
import { ApiOptions } from '@polkadot/api/types';
import jsonrpc from '@laminar/types/interfaces/jsonrpc';

const laminarRpc = jsonrpc;

const anyOrmlDerives = ormlDerives as any;

export const defaultOptions: ApiOptions = {
  types: laminarTypes,
  rpc: laminarRpc,
  derives: anyOrmlDerives
};

export const options = ({
  types = {},
  rpc = {},
  derives = {},
  typesAlias = {},
  typesBundle = {},
  ...otherOptions
}: ApiOptions): ApiOptions => ({
  types: {
    ...laminarTypes,
    ...types
  },
  typesAlias: {
    ...laminarTypesAlias,
    ...typesAlias
  },
  typesBundle: {
    ...typesBundle,
    spec: {
      ...typesBundle.spec,
      acala: {
        ...laminarTypesBundle?.spec?.acala,
        ...typesBundle?.spec?.acala
      }
    }
  },
  rpc: {
    ...laminarRpc,
    ...rpc
  },
  derives: {
    ...anyOrmlDerives,
    ...derives
  },
  ...otherOptions
});
