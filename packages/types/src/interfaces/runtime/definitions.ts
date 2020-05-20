import definitions from '@polkadot/types/interfaces/runtime/definitions';

export default {
  types: {
    ...definitions.types,
    Weight: 'u32',
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
      long: 'Rate',
      short: 'Rate'
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
        LongTwo: 0b0000000000000001,
        LongThree: 0b0000000000000010,
        LongFive: 0b0000000000000100,
        LongTen: 0b0000000000001000,
        LongTwenty: 0b0000000000010000,
        LongThirty: 0b0000000000100000,
        LongFifty: 0b0000000001000000,
        LongReserved: 0b0000000010000000,
        ShortTwo: 0b0000000100000000,
        ShortThree: 0b0000001000000000,
        ShortFive: 0b0000010000000000,
        ShortTen: 0b0000100000000000,
        ShortTwenty: 0b0001000000000000,
        ShortThirty: 0b0010000000000000,
        ShortFifty: 0b0100000000000000,
        ShortReserved: 0b1000000000000000
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
      bidSpread: 'Spread',
      askSpread: 'Spread',
      enabledTrades: 'Leverages'
    },
    SyntheticLiquidityPoolOption: {
      bidSpread: 'Spread',
      askSpread: 'Spread',
      additionalCollateralRatio: 'Option<Permill>',
      syntheticEnabled: 'bool'
    },
    MarginPosition: {
      owner: 'AccountId',
      poolId: 'LiquidityPoolId',
      pair: 'TradingPair',
      leverage: 'Leverage',
      leveragedHeld: 'Fixed128',
      leveragedDebits: 'Fixed128',
      leveragedDebitsInUsd: 'Fixed128',
      openAccumulatedSwapRate: 'Rate',
      marginHeld: 'Fixed128'
    },
    SyntheticPosition: {
      collateral: 'Balance',
      synthetic: 'Balance'
    },
    RiskThreshold: {
      marginCall: 'Permill',
      stopOut: 'Permill'
    },
    Fixed128: 'i128',
    PositionId: 'u64',
    Spread: 'u128',
    Rate: 'Fixed128'
  }
};
