import Metadata from '@polkadot/metadata/Metadata';
import { TypeRegistry } from '@polkadot/types';
import { types } from '../index';
import metadataStatic from '../metadata/static-latest';

describe('metadata', () => {
  it('check types', () => {
    const registry = new TypeRegistry();
    registry.register(types);
    const metadata = new Metadata(registry, metadataStatic);
    console.log(metadata.toString());
    metadata.getUniqTypes(true);
    expect(true).toBe(true);
  });
});
