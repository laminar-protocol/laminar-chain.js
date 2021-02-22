import fs from 'fs';

import { Metadata } from '@polkadot/metadata';
import { TypeRegistry } from '@polkadot/types';

import { types, typesAlias } from '../src';
import metadataStatic from '../src/metadata/static-latest';

const main = () => {
  const registry = new TypeRegistry();
  registry.register(types);
  registry.setKnownTypes({
    typesAlias,
  });
  const metadata = new Metadata(registry, metadataStatic);

  // hack https://github.com/polkadot-js/api/issues/2687#issuecomment-705342442
  metadata.asLatest.toJSON();

  try {
    metadata.getUniqTypes(true);
  } catch (err) {
    console.log(`🤦‍♀️🤦 metadata.json generation failed: ${err}`);
  }

  const formatted = JSON.stringify(metadata, null, 2);
  fs.writeFileSync('packages/types/src/metadata/metadata.json', formatted);

  console.log('✅ metadata.json generated.');
  console.log('\n*** Build completed');
};

main();
