import { derive as ormlDerives } from '@open-web3/orml-api-derive';
import { types as laminarTypes, metadata as laminarMetadata, typesModules } from '@laminar/types';
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
  metadata = {},
  ...otherOptions
}: ApiOptions): ApiOptions => ({
  types: {
    ...laminarTypes,
    ...types
  },
  typesAlias: {
    ...typesModules,
    ...typesAlias
  },
  rpc: {
    ...laminarRpc,
    ...rpc
  },
  derives: {
    ...anyOrmlDerives,
    ...derives
  },
  metadata: {
    ...laminarMetadata,
    ...metadata
  },
  ...otherOptions
});
