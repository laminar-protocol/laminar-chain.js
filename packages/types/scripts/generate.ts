import { Metadata } from '@polkadot/types';
import { TypeRegistry } from '@polkadot/types/create';
import { generateInterfaceTypes } from '@polkadot/typegen/generate/interfaceRegistry';
import { generateTsDef } from '@polkadot/typegen/generate/tsDef';
import generateConst from '@polkadot/typegen/generate/consts';
import generateQuery from '@polkadot/typegen/generate/query';
import generateTx from '@polkadot/typegen/generate/tx';
// Wait for @polkadot/typegen update
import { generateRpcTypes } from '@polkadot/typegen/generate/rpc';
import { registerDefinitions } from '@polkadot/typegen/util';
import metaHex from '../src/metadata/static-latest';
import generateMobx from '@open-web3/api-mobx/scripts/mobx';

import * as defaultDefinations from '@polkadot/types/interfaces/definitions';

import * as ormlDefinations from '@open-web3/orml-types/interfaces/definitions';

import * as laminarDefinations from '../src/interfaces/definitions';

import { typesAlias } from '../src';

// Only keep our own modules to avoid confllicts with the one provided by polkadot.js
// TODO: make an issue on polkadot.js
function filterModules(names: string[], defs: any) {
  const registry = new TypeRegistry();
  registry.setKnownTypes({
    typesAlias
  });
  registerDefinitions(registry, defs);
  const metadata = new Metadata(registry, metaHex);

  // hack https://github.com/polkadot-js/api/issues/2687#issuecomment-705342442
  metadata.asLatest.toJSON();

  const filtered = metadata.toJSON() as any;

  filtered.metadata.V12.modules = filtered.metadata.V12.modules.filter(({ name }: any) => names.includes(name));

  const newMetadata = new Metadata(registry, filtered);

  return newMetadata.toHex();
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { runtime, ...substrateDefinations } = defaultDefinations;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { runtime: _runtime, ...ormlModulesDefinations } = ormlDefinations;

const definations = {
  '@polkadot/types/interfaces': substrateDefinations,
  '@open-web3/orml-types/interfaces': ormlModulesDefinations,
  '@laminar/types/interfaces': laminarDefinations
} as any;

const metadata = filterModules(
  [
    'Oracle',
    'Tokens',
    'Currencies',
    'SyntheticTokens',
    'SyntheticProtocol',
    'MarginProtocol',
    'BaseLiquidityPoolsForMargin',
    'MarginLiquidityPools',
    'BaseLiquidityPoolsForSynthetic',
    'SyntheticLiquidityPools'
  ],
  definations
);

generateTsDef(definations, 'packages/types/src/interfaces', '@laminar/types/interfaces');
generateInterfaceTypes(definations, 'packages/types/src/augment-types.ts');
generateConst('packages/types/src/augment-api-consts.ts', metadata, definations);

generateTx('packages/types/src/augment-api-tx.ts', metadata, definations);
// Wait for @polkadot/typegen update
generateRpcTypes(definations, 'packages/types/src/augment-api-rpc.ts');
generateQuery('packages/types/src/augment-api-query.ts', metadata, definations);

generateMobx('packages/types/src/augment-api-mobx.ts', metaHex, definations, {
  typesAlias
});
