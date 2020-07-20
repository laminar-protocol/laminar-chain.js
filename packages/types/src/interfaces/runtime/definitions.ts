import definitions from '@polkadot/types/interfaces/runtime/definitions';
import { Definitions } from '@polkadot/types/types';

export default {
  rpc: { ...definitions.rpc },
  types: {
    ...definitions.types,
    OrderedSet: 'Vec<AccountId>',
    CurrencyId: {
      _enum: ['LAMI', 'AUSD', 'FEUR', 'FJPY', 'FBTC', 'FETH', 'FAUD', 'FCAD', 'FCHF', 'FXAU', 'FOIL', 'FGBP']
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
      frequency: 'Moment',
      offset: 'Moment'
    },
    IdentityDepositBalanceOf: 'Balance',
    Pool: {
      owner: 'AccountId',
      balance: 'Balance'
    },
    MarginTradingPairOption: {
      enabled: 'bool',
      maxSpread: 'Option<u128>',
      swapRate: 'SwapRate',
      accumulateConfig: 'Option<AccumulateConfig>'
    },
    MarginPoolOption: {
      additionalSwapRate: 'FixedI128',
      minLeveragedAmount: 'u128'
    },
    MarginPoolTradingPairOption: {
      enabled: 'bool',
      bidSpread: 'Option<Spread>',
      askSpread: 'Option<Spread>',
      enabledTrades: 'Leverages'
    },
    SyntheticPoolCurrencyOption: {
      bidSpread: 'Option<Spread>',
      askSpread: 'Option<Spread>',
      additionalCollateralRatio: 'Option<Permill>',
      syntheticEnabled: 'bool'
    },
    MarginPosition: {
      owner: 'AccountId',
      poolId: 'LiquidityPoolId',
      pair: 'TradingPair',
      leverage: 'Leverage',
      leveragedHeld: 'FixedI128',
      leveragedDebits: 'FixedI128',
      openAccumulatedSwapRate: 'Rate',
      marginHeld: 'FixedI128'
    },
    SyntheticPosition: {
      collateral: 'Balance',
      synthetic: 'Balance'
    },
    RiskThreshold: {
      marginCall: 'Permill',
      stopOut: 'Permill'
    },
    FixedI128: 'i128',
    PositionId: 'u64',
    Spread: 'Balance',
    Rate: 'FixedI128',
    PoolTraderInfo: {
      positionNum: 'PositionId',
      long: 'PairInfo',
      short: 'PairInfo'
    },
    PairInfo: {
      baseAmount: 'FixedI128',
      quoteAmount: 'FixedI128'
    },
    TradingPairRiskThreshold: {
      trader: 'Option<RiskThreshold>',
      enp: 'Option<RiskThreshold>',
      ell: 'Option<RiskThreshold>'
    },
    SyntheticTokensRatio: {
      extreme: 'Option<Permill>',
      liquidation: 'Option<Permill>',
      collateral: 'Option<Permill>'
    },
    PositionsSnapshot: {
      positionsCount: 'PositionId',
      long: 'LeveragedAmounts',
      short: 'LeveragedAmounts'
    },
    LeveragedAmounts: {
      held: 'FixedI128',
      debits: 'FixedI128'
    },
    LiquidityPoolIdentityInfo: {
      legalName: 'Vec<u8>',
      displayName: 'Vec<u8>',
      web: 'Vec<u8>',
      email: 'Vec<u8>',
      image_url: 'Vec<u8>'
    }
  }
} as Definitions;
