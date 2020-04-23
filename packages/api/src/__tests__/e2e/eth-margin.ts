import { EthereumApi, LaminarApi } from '../..';
import Web3 from 'web3';

describe('ethereum api', () => {
  jest.setTimeout(300000);

  const api = new EthereumApi({
    provider: new Web3.providers.HttpProvider('https://kovan.infura.io/v3/16a5aa3a08c24d56b1586cd06b4055d5')
  });

  beforeAll(async () => {
    await api.isReady();
  });

  it('allPoolIds', done => {
    api.margin.allPoolIds().subscribe(result => {
      console.log(result);
    });
  });

  it('marginInfo', done => {
    api.margin.marginInfo().subscribe(result => {
      console.log(result);
    });
  });

  it('poolInfo', done => {
    api.margin.poolInfo('0xabde99E93bc45b9cded88D0b9e79bE4221668608').subscribe(result => {
      console.log(result);
    });
  });
});
