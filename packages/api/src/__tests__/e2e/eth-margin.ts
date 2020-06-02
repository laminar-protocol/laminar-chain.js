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
    api.margin.poolInfo('0x7884f42F780b6942e29151F96EEFC287fF2A0172').subscribe(result => {
      console.log(result);
    });
  });

  it('getEnpAndEll', async done => {
    try {
      await api.baseContracts.marginFlowProtocolSafety.methods
        .getEnpAndEll('0x3E514eF4a4bc5b6e9893957f834bb5bb21048F0A')
        .call();
    } catch (error) {
      console.log(error);
    }
  });

  it('getMarginLevel', async done => {
    try {
      const result = await api.baseContracts.marginFlowProtocolSafety.methods
        .getMarginLevel('0x3E514eF4a4bc5b6e9893957f834bb5bb21048F0A', '0x885501bcfBad1cAE12B4FD2272F1AbdE6dd88B38')
        .call();
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  });

  it('traderInfo', done => {
    api.margin
      .traderInfo('0x885501bcfBad1cAE12B4FD2272F1AbdE6dd88B38', '0x7884f42F780b6942e29151F96EEFC287fF2A0172')
      .subscribe(result => {
        console.log(result);
      });
  });

  it('oracleValues', done => {
    api.currencies.oracleValues().subscribe(result => {
      console.log(result);
    });
  });

  it('traderThreshold', done => {
    api.margin.traderThreshold('AUSD', 'FEUR').subscribe(result => {
      console.log(result);
    });
  });
});
