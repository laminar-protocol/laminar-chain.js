import Metadata from '@polkadot/metadata/Metadata';
import { TypeRegistry } from '@polkadot/types';
import { types, typesModules } from '../index';
import metadataStatic from '../metadata/static-latest';

describe('metadata', () => {
  it('check types', () => {
    const registry = new TypeRegistry();
    registry.register(types);
    registry.setKnownTypes({
      typesAlias: typesModules
    });
    const metadata = new Metadata(registry, metadataStatic);
    console.log(metadata.toString());
    metadata.getUniqTypes(true);
    expect(true).toBe(true);
  });
});
