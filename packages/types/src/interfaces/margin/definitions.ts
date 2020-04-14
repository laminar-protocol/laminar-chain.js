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
        }
      ],
      type: 'TraderInfo'
    }
  },
  types: {
    PoolInfo: {
      enp: 'Fixed128',
      ell: 'Fixed128'
    },
    TraderInfo: {
      equity: 'Fixed128',
      margin_held: 'Fixed128',
      margin_level: 'Fixed128',
      free_margin: 'Fixed128',
      unrealized_pl: 'Fixed128'
    }
  }
};
