import { EthereumApi, LaminarApi } from '../';
import { WsProvider } from '@polkadot/api';
import Web3 from 'web3';

describe('ethereum api', () => {
  jest.setTimeout(300000);

  const getEthAccountPair = () => {
    return {
      publicKey: '0x885501bcfBad1cAE12B4FD2272F1AbdE6dd88B38',
      privateKey: '0x68A1734F68389BC532A7D5B9F339C039AD9CE960ECECFA4E82DCB298F88D5D3A'
    };
  };

  const chain = 'ethereum';
  // const chain = 'laminar';

  const getConfig = key => {
    if (key === 'ethereum') {
      const api = new EthereumApi({
        provider: new Web3.providers.HttpProvider('https://kovan.infura.io/v3/16a5aa3a08c24d56b1586cd06b4055d5')
      });
      api.web3.eth.accounts.wallet.add(getEthAccountPair().privateKey);

      return {
        api: api,
        address1: '0x885501bcfBad1cAE12B4FD2272F1AbdE6dd88B38'
      };
    } else if (key === 'laminar') {
      return {
        api: new LaminarApi({
          provider: new WsProvider('wss://testnet-node-1.laminar-chain.laminar.one/ws')
        }),
        address1: '5FBf5sTp3xZH7WhBMkTmMgrNQUyLmfTpGerwsEuAbC5fWVay'
      };
    }
  };

  const api = getConfig(chain).api as EthereumApi;

  const address1 = getConfig(chain).address1;

  let tokenNames: any;
  let pools: any;
  let poolAndTokenPair: any;

  beforeAll(async () => {
    await api.isReady();
    tokenNames = (await api.getTokens()).map(r => r.id);
    pools = await api.getDefaultPools();
    poolAndTokenPair = tokenNames.reduce((result, token) => {
      const tokens = pools.map((pool: any) => ({
        poolId: pool.id,
        tokenName: token
      }));
      // @ts-ignore
      return result.concat(tokens);
    }, []);
  });

  it('allowance', async () => {
    const result = await api.getPoolAllowance('0x885501bcfBad1cAE12B4FD2272F1AbdE6dd88B38', pools[0].id);
    console.log(`${pools[0].id} allowance: `, result);
    expect(result).toBeDefined()
  });

  it.skip('approve', async () => {
    // await (api as any).getTokenContract('DAI')
    //   .methods.approve((api as any).baseContracts.flowProtocol.options.address, '1000')
    //   .send({ from: '0x885501bcfBad1cAE12B4FD2272F1AbdE6dd88B38', gas: 1000000 })
    //   .then(result => console.log(result));
    // const allowance = await (api as any).getBaseTokenAllowance(getEthAccountPair().publicKey);
    // console.log(allowance)
    await api.depositLiquidity(getEthAccountPair().publicKey, pools[0].id, '10000');
    // await api.liquidityPoolGrant(getEthAccountPair().publicKey, pools[0].id);
  });
});
