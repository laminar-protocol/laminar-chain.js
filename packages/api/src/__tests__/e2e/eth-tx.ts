import { EthereumApi } from '../..';
import Web3 from 'web3';
import { TokenId } from '../../ethereum/protocols';
import { PoolInfo } from '../../types';

describe('ethereum api', () => {
  jest.setTimeout(300000);

  const getEthAccountPair = () => {
    return {
      publicKey: '0x885501bcfBad1cAE12B4FD2272F1AbdE6dd88B38',
      privateKey: '0x68A1734F68389BC532A7D5B9F339C039AD9CE960ECECFA4E82DCB298F88D5D3A'
    };
  };

  const provider = new Web3.providers.HttpProvider('https://kovan.infura.io/v3/16a5aa3a08c24d56b1586cd06b4055d5');

  const api = new EthereumApi({
    provider,
    gas: '1000000'
  });

  api.web3.eth.accounts.wallet.add(getEthAccountPair().privateKey);

  let tokenIds: TokenId[] = [];
  let pools: PoolInfo[];
  let poolAndTokenPair: any;
  let baseTokenId: TokenId;

  beforeAll(async () => {
    await api.isReady();
    tokenIds = (await api.getTokens()).map(r => r.id) as TokenId[];
    pools = await api.getDefaultPools();
    poolAndTokenPair = tokenIds.reduce((result, token) => {
      const tokens = pools.map((pool: any) => ({
        poolId: pool.id,
        tokenName: token
      }));
      // @ts-ignore
      return result.concat(tokens);
    }, []);
    baseTokenId = tokenIds[0];
  });

  const address1 = getEthAccountPair().publicKey;

  const getBalance = async (account: string, tokenId: TokenId) => {
    const balance = await api.getBalance(account, tokenId);
    console.log(`${account}: ${tokenId}: ${balance}`);
    return balance;
  };

  const getTokenAllowance = async (account: string, tokenId: TokenId) => {
    const allowance = await api.getTokenAllowance(account, tokenId);
    console.log(`${account}: allowance: ${allowance}`);
    return allowance;
  };

  const mintWithMaxPrice = async (account: string, tokenId: TokenId, maxPrice: string, callback?: () => void) => {
    await getTokenAllowance(account, tokenId);
    await getBalance(account, tokenId);
    await getBalance(account, baseTokenId);
    await api.mintWithMaxPrice(account, pools[0].id, tokenId, '9999999', maxPrice);
    await getBalance(account, tokenId);
    await getBalance(account, baseTokenId);
  };

  const redeemWithMinPrice = async (account: string, tokenId: TokenId, minPrice: string) => {
    await getBalance(account, tokenId);
    await getBalance(account, baseTokenId);
    await api.redeemWithMinPrice(account, pools[0].id, tokenId, '9999999', minPrice);
    await getBalance(account, tokenId);
    await getBalance(account, baseTokenId);
  };

  it.skip('mintWithMaxPrice', async () => {
    // await mintWithMaxPrice(address1, tokenIds[1], '2');
    await mintWithMaxPrice(address1, tokenIds[1], '99999999999999999999999999999999');
  });

  it.skip('redeemWithMinPrice', async () => {
    await redeemWithMinPrice(address1, tokenIds[1], '1291911119111111111');
  });
});
