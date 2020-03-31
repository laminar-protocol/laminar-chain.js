import { Set } from '@polkadot/types';

const LEVERAGES_FIELDS = {
  LongTwo: 0b0000000000000001,
  LongThree: 0b0000000000000010,
  LongFive: 0b0000000000000100,
  LongTen: 0b0000000000001000,
  LongTwenty: 0b0000000000010000,
  LongThirty: 0b0000000000100000,
  LongFifty: 0b0000000001000000,
  ShortTwo: 0b0000000100000000,
  ShortThree: 0b0000001000000000,
  ShortFive: 0b0000010000000000,
  ShortTen: 0b0000100000000000,
  ShortTwenty: 0b0001000000000000,
  ShortThirty: 0b0010000000000000,
  ShortFifty: 0b0100000000000000
};

const Leverages = Set.with(LEVERAGES_FIELDS, 16);

export default Leverages;
