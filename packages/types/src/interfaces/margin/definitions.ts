// import definitions from '@polkadot/types/interfaces/runtime/definitions';

export default {
  rpc: {
    poolInfo: {
      description: '',
      params: [
        {
          name: 'liquidityPoolId',
          type: 'LiquidityPoolId'
        }
      ],
      type: 'PoolInfo'
    },
    traderInfo: {
      description: '',
      params: [
        {
          name: 'who',
          type: 'AccountId'
        },
        {
          name: 'liquidityPoolId',
          type: 'LiquidityPoolId'
        }
      ],
      type: 'TraderInfo'
    }
  },
  types: {
    PoolInfo: {
      enp: 'Rate',
      ell: 'Rate'
    },
    TraderInfo: {
      equity: 'FixedI128',
      margin_held: 'FixedI128',
      margin_level: 'Rate',
      free_margin: 'FixedI128',
      unrealized_pl: 'FixedI128'
    }
  }
};
