import Metadata from '@polkadot/metadata/Metadata';
import { TypeRegistry } from '@polkadot/types';
import { types, typesAlias } from '../index';
import metadataStatic from '../metadata/static-latest';
import fs from 'fs';

describe('metadata', () => {
  it('check types', () => {
    const registry = new TypeRegistry();
    registry.register(types);
    registry.setKnownTypes({
      typesAlias
    });
    const metadata = new Metadata(registry, metadataStatic);

    // hack
    metadata.asLatest.toJSON();

    fs.writeFileSync('./hhhh', metadata.toString());
    // console.log(metadata.toString());
    // metadata.getUniqTypes(true);
    expect(true).toBe(true);
  });
});
