import definitions from '@polkadot/types/interfaces/runtime/definitions';

export default {
  types: {
    ...definitions.types,
    CurrencyId: {
      _enum: ['LAMI', 'AUSD', 'FEUR', 'FJPY', 'FBTC', 'FETH']
    },
    Leverage: {
      _enum: [
        'LongTwo',
        'LongThree',
        'LongFive',
        'LongTen',
        'LongTwenty',
        'LongThirty',
        'LongFifty',
        'LongReserved',
        'ShortTwo',
        'ShortThree',
        'ShortFive',
        'ShortTen',
        'ShortTwenty',
        'ShortThirty',
        'ShortFifty',
        'ShortReserved'
      ]
    },
    SwapRate: {
      long: 'Fixed128',
      short: 'Fixed128'
    },
    CurrencyIdOf: 'CurrencyId',
    Amount: 'i128',
    AmountOf: 'Amount',
    OracleKey: 'CurrencyId',
    OracleValue: 'Price',
    LiquidityPoolId: 'u32',
    Leverages: {
      _set: {
        _bitLength: 16,
        ShortTwo: 0b0000000000000001,
        ShortThree: 0b0000000000000010,
        ShortFive: 0b0000000000000100,
        ShortTen: 0b0000000000001000,
        ShortTwenty: 0b0000000000010000,
        ShortThirty: 0b0000000000100000,
        ShortFifty: 0b0000000001000000,
        ShortReserved: 0b0000000010000000,
        LongTwo: 0b0000000100000000,
        LongThree: 0b0000001000000000,
        LongFive: 0b0000010000000000,
        LongTen: 0b0000100000000000,
        LongTwenty: 0b0001000000000000,
        LongThirty: 0b0010000000000000,
        LongFifty: 0b0100000000000000,
        LongReserved: 0b1000000000000000
      }
    },
    TradingPair: {
      base: 'CurrencyId',
      quote: 'CurrencyId'
    },
    AccumulateConfig: {
      frequency: 'BlockNumber',
      offset: 'BlockNumber'
    },
    MarginLiquidityPoolOption: {
      bidSpread: 'Permill',
      askSpread: 'Permill',
      enabledTrades: 'Leverages'
    },
    SyntheticLiquidityPoolOption: {
      bidSpread: 'Permill',
      askSpread: 'Permill',
      additionalCollateralRatio: 'Option<Permill>',
      syntheticEnabled: 'bool'
    },
    Position: {
      owner: 'AccountId',
      pool: 'LiquidityPoolId',
      pair: 'TradingPair',
      leverage: 'Leverage',
      leveragedHeld: 'Fixed128',
      leveragedDebits: 'Fixed128',
      leveragedDebitsInUsd: 'Fixed128',
      openAccumulatedSwapRate: 'Fixed128',
      openMargin: 'Balance'
    },
    RiskThreshold: {
      marginCall: 'Permill',
      stopOut: 'Permill'
    },
    Fixed128: 'i128',
    PositionId: 'u64'
  }
};
