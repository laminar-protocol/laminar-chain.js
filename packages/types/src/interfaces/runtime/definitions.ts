import definitions from '@polkadot/types/interfaces/runtime/definitions';

export default {
  types: {
    ...definitions.types,
    CurrencyId: {
      _enum: ['LAMI', 'AUSD', 'FEUR', 'FJPY', 'FBTC', 'FETH']
    },
    CurrencyIdOf: 'CurrencyId',
    Amount: 'i128',
    AmountOf: 'Amount',
    OracleKey: 'CurrencyId',
    OracleValue: 'Price',
    LiquidityPoolId: 'u32',
    // @TODO
    Leverages: 'u16',
    Leverage: 'u16',
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
