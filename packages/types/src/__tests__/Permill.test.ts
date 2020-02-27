// import Metadata from '@polkadot/metadata/Metadata';
import { TypeRegistry } from '@polkadot/types';
import { types } from '../index';
// import metadataStatic from '../metadata/static-latest';

describe('permill', () => {
  const registry = new TypeRegistry();
  registry.register(types);
  const Permill: any = registry.get('Permill');

  it('toJSON', () => {
    expect(new Permill(registry, 0).toJSON()).toBe('0');
    expect(new Permill(registry, 1).toJSON()).toBe('0.000001');
    expect(new Permill(registry, 22).toJSON()).toBe('0.000022');
    expect(new Permill(registry, 330).toJSON()).toBe('0.00033');
    expect(new Permill(registry, 4404).toJSON()).toBe('0.004404');
    expect(new Permill(registry, 50000).toJSON()).toBe('0.05');
    expect(new Permill(registry, 660000).toJSON()).toBe('0.66');
    // console.log(new Permill(registry, 1).toJSON());
    // console.log(new Permill(registry, 111111).toJSON());
    // console.log(new Permill(registry, 1111111).toJSON());
    // console.log(new Permill(registry, 11111111).toJSON());
    // console.log(new Permill(registry, 11111111).toJSON());
  });
});
