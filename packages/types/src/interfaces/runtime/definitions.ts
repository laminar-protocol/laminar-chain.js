import runtime from '@laminar/type-definitions/runtime';
import definitions from '@polkadot/types/interfaces/runtime/definitions';
import { Definitions } from '@polkadot/types/types';

export default {
  rpc: {
    ...definitions.rpc,
  },
  types: {
    ...definitions.types,
    ...runtime.types,
  },
} as Definitions;
