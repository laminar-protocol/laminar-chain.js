export default {
  rpc: {
    poolState: {
      description: '',
      params: [
        {
          name: 'pool_id',
          type: 'u32'
        },
        {
          name: 'at',
          type: 'BlockHash',
          isOptional: true
        }
      ],
      type: 'MarginPoolState'
    },
    traderState: {
      description: '',
      params: [
        {
          name: 'who',
          type: 'AccountId'
        },
        {
          name: 'pool_id',
          type: 'LiquidityPoolId'
        },
        {
          name: 'at',
          type: 'BlockHash',
          isOptional: true
        }
      ],
      type: 'MarginTraderState'
    }
  },
  types: {
    MarginPoolState: {
      enp: 'FixedI128',
      ell: 'FixedI128',
      required_deposit: 'FixedI128'
    },
    MarginTraderState: {
      equity: 'FixedI128',
      margin_held: 'FixedI128',
      margin_level: 'FixedI128',
      free_margin: 'FixedI128',
      unrealized_pl: 'FixedI128'
    }
  }
};
