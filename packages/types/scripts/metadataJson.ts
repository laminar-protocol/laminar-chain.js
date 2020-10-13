import fs from 'fs';

import Metadata from '@polkadot/metadata/Metadata';
import { TypeRegistry } from '@polkadot/types';

import { types, typesAlias } from '../src';
import metadataStatic from '../src/metadata/static-latest';

const main = () => {
  const registry = new TypeRegistry();
  registry.register(types);
  registry.setKnownTypes({
    typesAlias
  });
  const metadata = new Metadata(registry, metadataStatic);
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
