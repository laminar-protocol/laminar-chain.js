import ormlRPC from '@orml/jsonrpc';
import { types as laminarTypes } from '@laminar/types';
import { ApiOptions } from '@polkadot/api/types';

// FIXME: use a concrete type once polkadotjs fixes inconsistency.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const laminarRpc: any = { oracle: Object.values(ormlRPC.oracle.methods) };

export const defaultOptions: ApiOptions = {
  types: laminarTypes,
  rpc: laminarRpc
};

export const options = ({ types = {}, rpc = {}, ...otherOptions }: ApiOptions): ApiOptions => ({
  types: {
    ...laminarTypes,
    ...types
  },
  rpc: {
    ...laminarRpc,
    ...rpc
  },
  ...otherOptions
});
