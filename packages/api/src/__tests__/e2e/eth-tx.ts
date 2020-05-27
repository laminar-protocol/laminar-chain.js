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

  beforeAll(async () => {
    await api.isReady();
  });

  it('dai faucet', done => {
    api.margin.openPosition(
      '0x885501bcfbad1cae12b4fd2272f1abde6dd88b38',
      '0xc8e4268474efc471093681ed10898a5ee73398ae',
      { base: '0xbf7a7169562078c96f0ec1a8afd6ae50f12e5a99', quote: '0xabcf7f2e1569ff12cee47391c0225f11fd96b8fe' },
      'ShortTwo',
      '1000000',
      '1000000'
    );
  });
});
