import { generateInterfaceTypes } from '@polkadot/typegen/generate/interfaceRegistry';
import { generateTsDef } from '@polkadot/typegen/generate/tsDef';
import generateConst from '@polkadot/typegen/generate/consts';
// import generateQuery from '@polkadot/typegen/generate/query';
// import generateTx from '@polkadot/typegen/generate/tx';
import metaHex from '../src/metadata/static-latest';

import * as defaultDefinations from '@polkadot/types/interfaces/definitions';

import * as ormlDefinations from '@orml/types/interfaces/definitions';

import * as laminarDefinations from '../src/interfaces/definitions';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { runtime, ...substrateDefinations } = defaultDefinations;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { runtime: _runtime, ...ormlModulesDefinations } = ormlDefinations;

const definations = {
  '@polkadot/types/interfaces': substrateDefinations,
  '@orml/types/interfaces': ormlModulesDefinations,
  '@laminar/types/interfaces': laminarDefinations
};

generateTsDef(definations, 'packages/types/src/interfaces', '@laminar/types/interfaces');
generateInterfaceTypes(definations, 'packages/types/src/augment-types.ts');
generateConst('packages/types/src/augment-api-consts.ts', metaHex, definations as any);
// @TODO fix me
// generateTx('packages/types/src/augment-api-tx.ts', metaHex, definations as any);
// @TODO fix error
// generateQuery('packages/types/src/augment-api-query.ts', metaHex, definations as any);
