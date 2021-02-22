export default {
  rpc: {
    poolState: {
      description: '',
      params: [
        {
          name: 'pool_id',
          type: 'u32',
        },
        {
          name: 'currency_id',
          type: 'CurrencyId',
        },
      ],
      type: 'SyntheticPoolState',
    },
  },
  types: {
    SyntheticPoolState: {
      collateral_ratio: 'FixedI128',
      is_safe: 'boolean',
    },
  },
};
