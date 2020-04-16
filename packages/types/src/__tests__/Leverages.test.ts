// Copyright 2017-2020 @polkadot/types authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
import { TypeRegistry } from '@polkadot/types';
import { createTypeUnsafe } from '@polkadot/types/create';
import { u8aToU8a } from '@polkadot/util';
import Metadata from '@polkadot/metadata/Decorated';
import { types } from '../index';
import metadataRaw from '../metadata/static-latest';

describe('Leverages', (): void => {
  const registry = new TypeRegistry();
  registry.register(types);

  new Metadata(registry, metadataRaw);

  const Leverages: any = registry.get('Leverages');

  it('constructs via an string[]', (): void => {
    const leverages = new Leverages(registry, ['ShortTwo', 'LongTwenty']);

    expect(leverages.isEmpty).toEqual(false);
    expect(leverages.toString()).toEqual('[ShortTwo, LongTwenty]');
  });

  it('throws with invalid values', (): void => {
    expect(() => new Leverages(registry, ['ShortTwo', 'ShortThree', 'invalid'])).toThrow(/Invalid key 'invalid'/);
  });

  it('throws with add on invalid', (): void => {
    expect(() => new Leverages(registry, []).add('invalid')).toThrow(/Invalid key 'invalid'/);
  });

  it('allows construction via number', (): void => {
    expect(new Leverages(registry, 16399).eq(['ShortTwo', 'ShortThree', 'ShortFive', 'ShortTen', 'LongFifty'])).toBe(
      true
    );
  });

  it('does not allow invalid number', (): void => {
    expect(() => new Leverages(registry, 65535)).toBeTruthy();
  });

  it('hash a valid encoding', (): void => {
    const leverages = new Leverages(registry, ['ShortTwo', 'ShortThree', 'ShortTwenty']);
    const leverages1 = new Leverages(registry, [
      'ShortTwo',
      'ShortThree',
      'ShortFive',
      'ShortTen',
      'ShortTwenty',
      'ShortThirty',
      'ShortFifty',
      'ShortReserved',
      'LongTwo',
      'LongThree',
      'LongFive',
      'LongTen',
      'LongTwenty',
      'LongThirty',
      'LongFifty',
      'LongReserved'
    ]);

    expect(leverages.toU8a()).toEqual(new Uint8Array([0, 19]));
    expect(leverages1.toU8a()).toEqual(new Uint8Array([255, 255]));
  });

  describe('utils', (): void => {
    const leverages = new Leverages(registry, ['LongThirty', 'LongFifty']);

    it('compares against string array', (): void => {
      expect(leverages.eq(['LongThirty', 'LongFifty'])).toBe(true);
    });

    // it('compares against number (encoded)', (): void => {
    //   expect(leverages.eq(LEVERAGES_FIELDS.LongThirty | LEVERAGES_FIELDS.LongFifty)).toBe(true);
    // });

    it('compares against other sets', (): void => {
      expect(leverages.eq(new Leverages(registry, ['LongThirty', 'LongFifty']))).toBe(true);
    });

    it('returns false on other values', (): void => {
      expect(leverages.eq('LongTwenty')).toBe(false);
    });
  });

  it('has a sane toRawType representation', (): void => {
    expect(new Leverages(registry).toRawType()).toEqual(
      JSON.stringify({
        _set: {
          ShortTwo: 1,
          ShortThree: 2,
          ShortFive: 4,
          ShortTen: 8,
          ShortTwenty: 16,
          ShortThirty: 32,
          ShortFifty: 64,
          ShortReserved: 128,
          LongTwo: 256,
          LongThree: 512,
          LongFive: 1024,
          LongTen: 2048,
          LongTwenty: 4096,
          LongThirty: 8192,
          LongFifty: 16384,
          LongReserved: 32768
        }
      })
    );
  });

  it('EventRecord', (): void => {
    const raw =
      '0x0c000000000000001027000001010000010000001501d43593c715fdd31c61141abd04a99fd6822c8558854ccde39a5684e7a56da27d000000000201ffff000001000000000010270000000100';
    createTypeUnsafe(registry, 'Vec<EventRecord>', [u8aToU8a(raw)], true);
    expect(raw).toBeTruthy();
  });
});
