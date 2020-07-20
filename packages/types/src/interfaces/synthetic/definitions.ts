import { Definitions } from '@polkadot/types/types';

export default {
  rpc: {
    poolState: {
      description: '',
      params: [
        {
          name: 'pool_id',
          type: 'LiquidityPoolId'
        },
        {
          name: 'currency_id',
          type: 'CurrencyId'
        }
      ],
      type: 'SyntheticPoolState'
    }
  },
  types: {
    SyntheticPoolState: {
      collateral_ratio: 'FixedI128',
      is_safe: 'boolean'
    }
  }
} as Definitions;
