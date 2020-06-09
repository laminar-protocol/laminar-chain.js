import { EthereumApi, LaminarApi } from '../..';
import Web3 from 'web3';

describe('ethereum api', () => {
  jest.setTimeout(300000);

  const api = new EthereumApi({
    provider: new Web3.providers.WebsocketProvider('wss://kovan.infura.io/ws/v3/16a5aa3a08c24d56b1586cd06b4055d5')
  });

  beforeAll(async () => {
    await api.isReady();
  });

  it('allPoolIds', done => {
    api.synthetic.allPoolIds().subscribe(result => {
      console.log(result);
    });
  });

  it('poolInfo', done => {
    api.synthetic.poolInfo('0x61a7645ef693ea7740b121232ddc7b874be7fa09').subscribe(result => {
      console.log(result);
    });
  });

  it('getSyntheticFlowTokenContract', async done => {
    const a = api.getSyntheticFlowTokenContract('0x779DB2A890B7EbfFb9B38631Deb81C1febfB5361');
    const r = await a.methods.balanceOf('0x885501bcfBad1cAE12B4FD2272F1AbdE6dd88B38').call();
    console.log(r);
  });
});
