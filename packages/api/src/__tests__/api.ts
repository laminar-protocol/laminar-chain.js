import { EthereumApi, LaminarApi } from '../';
import { WsProvider } from '@polkadot/api';
import Web3 from 'web3';

describe('ethereum api', () => {
  jest.setTimeout(30000);

  // const chain = 'ethereum'
  const chain = 'laminar';

  const config = {
    ethereum: {
      api: new EthereumApi({
        provider: new Web3.providers.HttpProvider('https://kovan.infura.io/v3/16a5aa3a08c24d56b1586cd06b4055d5')
      }),
      address1: '0x885501bcfBad1cAE12B4FD2272F1AbdE6dd88B38'
    },
    laminar: {
      api: new LaminarApi({
        provider: new WsProvider(
          'wss://node-6636393196323627008.jm.onfinality.io/ws?apikey=20cf0fa0-c7ee-4545-8227-4d488f71c6d2'
        )
      }),
      address1: '5FBf5sTp3xZH7WhBMkTmMgrNQUyLmfTpGerwsEuAbC5fWVay'
    }
  };

  const api = config[chain].api;
  const address1 = config[chain].address1;

  let tokenNames: any;
  let pools: any;
  let poolAndTokenPair: any;

  beforeAll(async () => {
    await api.isReady()
    tokenNames = (await api.getTokens()).map(r => r.id);
    pools = await api.getPools();
    poolAndTokenPair = tokenNames.reduce((result, token) => {
      const tokens = pools.map((pool: any) => ({
        poolId: pool.id,
        tokenName: token
      }));
      // @ts-ignore
      return result.concat(tokens);
    }, []);
  });

  const findPoolName = findId => {
    return pools.find(({ id }) => findId === id).name;
  };

  it('getBalance', async () => {
    const testFn = async (address: any, tokenName: any) => {
      const result = await api.getBalance(address, tokenName);
      console.log(`${tokenName}: balance: ${result}`);
      return expect(typeof result).toBe('string');
    };
    await expect(api.getBalance(address1, 'LAMII' as any)).rejects.toThrowError();

    return Promise.all(tokenNames.map(token => testFn(address1, token)));
  });

  it('getPoolOptions', async () => {
    const testFn = async (poolId, tokenName: any) => {
      const result = await api.getPoolOptions(poolId, tokenName);
      console.log(`${findPoolName(poolId)}/${tokenName}: ${JSON.stringify(result)}`);
      expect(typeof result.additionalCollateralRatio).toBe('number');
      expect(typeof result.askSpread).toBe('number');
      expect(typeof result.bidSpread).toBe('number');
    };

    return Promise.all(poolAndTokenPair.map(({ poolId, tokenName }) => testFn(poolId, tokenName)));
  });

  it('getTokenLiquidity', () => {
    const testFn = async (poolId, tokenName: any) => {
      const result = await api.getTokenLiquidity(poolId, tokenName);
      console.log(`${findPoolName(poolId)}/${tokenName}: liquidity: ${result}`);
      expect(typeof result).toBe('string');
    };

    return Promise.all(poolAndTokenPair.map(({ poolId, tokenName }) => testFn(poolId, tokenName)));
  });
});
