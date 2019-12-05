import definitions from '@polkadot/types/interfaces/runtime/definitions';

export default {
  types: {
    ...definitions.types,
    CurrencyId: 'u8',
    CurrencyIdOf: 'CurrencyId',
    Amount: 'i128',
    AmountOf: 'Amount',
    ExchangeRate: 'FixedU128',
    OracleKey: 'CurrencyId',
    OracleValue: 'Price',
    Rate: 'FixedU128',
    Ratio: 'FixedU128'
  }
};
