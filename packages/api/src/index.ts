import ormlRPC from '@orml/jsonrpc';
import { derive as ormlDerives } from '@orml/api-derive';
import { types as laminarTypes } from '@laminar/types';
import { ApiOptions } from '@polkadot/api/types';

// FIXME: use a concrete type once polkadotjs fixes inconsistency.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const laminarRpc: any = { oracle: Object.values(ormlRPC.oracle.methods) };

export const defaultOptions: ApiOptions = {
  types: laminarTypes,
  rpc: laminarRpc,
  derives: ormlDerives
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
    ...ormlDerives,
    ...derives
  },
  ...otherOptions
});
