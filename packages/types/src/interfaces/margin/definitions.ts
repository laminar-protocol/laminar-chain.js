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
      marginHeld: 'Fixed128',
      marginLevel: 'Fixed128',
      freeMargin: 'Fixed128',
      unrealizedPl: 'Fixed128'
    }
  }
};
