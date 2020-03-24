import { derive as ormlDerives } from '@orml/api-derive';
import { types as laminarTypes } from '@laminar/types';
import { ApiOptions } from '@polkadot/api/types';
import jsonrpc from '@laminar/types/interfaces/jsonrpc'

const laminarRpc = jsonrpc;

const anyOrmlDerives = ormlDerives as any;

export const defaultOptions: ApiOptions = {
  types: laminarTypes,
  rpc: laminarRpc,
  derives: anyOrmlDerives
};

export const options = ({ types = {}, rpc = {}, derives = {}, ...otherOptions }: ApiOptions): ApiOptions => ({
  types: {
    ...laminarTypes,
    ...types
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
