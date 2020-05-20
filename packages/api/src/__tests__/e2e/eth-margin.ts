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

  it('getEnableTradePairs', done => {
    api.margin.getEnableTradePairs().subscribe(result => {
      console.log(result);
    });
  });

  it('poolInfo', done => {
    api.margin.poolInfo('0xAAe87632fAE233Cba4e2175c15717924b88BEE8D').subscribe(result => {
      console.log(result);
    });
  });

  it('traderInfo', done => {
    api.margin
      .traderInfo('0x885501bcfBad1cAE12B4FD2272F1AbdE6dd88B38', '0xAAe87632fAE233Cba4e2175c15717924b88BEE8D')
      .subscribe(result => {
        console.log(result);
      });
  });

  it('traderThreshold', done => {
    api.margin.traderThreshold('AUSD', 'FEUR').subscribe(result => {
      console.log(result);
    });
  });

  it('positions', done => {
    api.margin.position('3').subscribe(result => {
      console.log(result);
    });
  });
});
