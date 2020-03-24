import { EthereumApi, LaminarApi } from '..';
import { WsProvider } from '@polkadot/api';
import Web3 from 'web3';

describe('ethereum api', () => {
  jest.setTimeout(300000);

  // const chain = 'ethereum';
  const chain = 'laminar';

  const getConfig = key => {
    if (key === 'ethereum') {
      return {
        api: new EthereumApi({
          provider: new Web3.providers.HttpProvider('https://kovan.infura.io/v3/16a5aa3a08c24d56b1586cd06b4055d5')
        }),
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

  const api = getConfig(chain).api;
  const address1 = getConfig(chain).address1;

  let tokenIds: any;
  let pools: any;
  let poolAndTokenPair: any;

  beforeAll(async () => {
    await api.isReady();
    tokenIds = (await api.getTokens()).map(r => r.id);
    pools = await api.getDefaultPools();
    poolAndTokenPair = tokenIds.reduce((result, token) => {
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

    return Promise.all(tokenIds.map(token => testFn(address1, token)));
  });

  it('getPoolOptions', async () => {
    const testFn = async (poolId, tokenName: any) => {
      const result = await api.getPoolOptions(poolId, tokenName);
      console.log(`${findPoolName(poolId)}/${tokenName}: ${JSON.stringify(result)}`);
      expect(
        typeof result.additionalCollateralRatio === 'number' || result.additionalCollateralRatio === null
      ).toBeTruthy();
      expect(typeof result.askSpread === 'number' || result.additionalCollateralRatio === null).toBeTruthy();
      expect(typeof result.bidSpread === 'number' || result.additionalCollateralRatio === null).toBeTruthy();
    };

    return Promise.all(poolAndTokenPair.map(({ poolId, tokenName }) => testFn(poolId, tokenName)));
  });

  it('getLiquidity', () => {
    const testFn = async poolId => {
      const result = await api.getLiquidity(poolId);
      console.log(`${findPoolName(poolId)}: liquidity: ${result}`);
      expect(typeof result).toBe('string');
    };

    return Promise.all(pools.map(({ id }) => testFn(id)));
  });

  it('getTradingPairs', async () => {
    const testFn = async () => {
      const result = await api.getTradingPairs();
      console.log(`${chain}: tradingPairs: ${JSON.stringify(result)}`);
      expect(Array.isArray(result)).toBeTruthy();
    };

    await testFn();
  });

  it.skip('json rpc', async () => {
    const laminarApi = api as LaminarApi
    //@ts-ignore
    const result = await laminarApi.api.rpc.oracle.getValue('lami')
    expect(result).toBeTruthy()
  });
});
