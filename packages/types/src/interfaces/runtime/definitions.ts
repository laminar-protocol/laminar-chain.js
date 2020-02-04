import definitions from '@polkadot/types/interfaces/runtime/definitions';

export default {
  types: {
    ...definitions.types,
    CurrencyId: {
      _enum: ['LAMI', 'AUSD', 'FEUR', 'FJPY']
    },
    CurrencyIdOf: 'CurrencyId',
    Amount: 'i128',
    AmountOf: 'Amount',
    OracleKey: 'CurrencyId',
    OracleValue: 'Price',
    LiquidityPoolId: 'u32',
    Leverages: {
      _set: {
        LongOne: 0b0000000000000001,
        LongTwo: 0b0000000000000010,
        LongThree: 0b0000000000000100,
        LongFive: 0b0000000000001000,
        LongTen: 0b0000000000010000,
        LongTwenty: 0b0000000000100000,
        LongThirty: 0b0000000001000000,
        LongFifty: 0b0000000010000000,
        ShortOne: 0b0000000100000000,
        ShortTwo: 0b0000001000000000,
        ShortThree: 0b0000010000000000,
        ShortFive: 0b0000100000000000,
        ShortTen: 0b0001000000000000,
        ShortTwenty: 0b0010000000000000,
        ShortThirty: 0b0100000000000000,
        ShortFifty: 0b1000000000000000
      }
    },
    LiquidityPoolOption: {
      bidSpread: 'Permill',
      askSpread: 'Permill',
      additionalCollateralRatio: 'Option<Permill>',
      enabled: 'Leverages'
    },
    Position: {
      collateral: 'Balance',
      synthetic: 'Balance'
    }
  }
};
