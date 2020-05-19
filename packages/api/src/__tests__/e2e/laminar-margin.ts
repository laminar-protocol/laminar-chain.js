import { LaminarApi } from '../..';
import { WsProvider } from '@polkadot/rpc-provider';
import { Keyring } from '@polkadot/api';

describe('laminar margin', () => {
  jest.setTimeout(300000);

  const api = new LaminarApi({
    provider: new WsProvider('wss://testnet-node-1.laminar-chain.laminar.one/ws')
  });

  let alice;

  beforeAll(async () => {
    await api.isReady();
    const keyring = new Keyring({ type: 'sr25519' });
    alice = keyring.addFromUri('//Alice');
  });

  it('marginInfo', done => {
    const result = api.margin.marginInfo().subscribe(result => {
      console.log(result);
    });
  });

  it('traderInfo', done => {
    const result = api.margin.traderInfo('5EkTxjD5K75Z7T7tb6oREeoLt82MygJJP2oJ6DFF4weLt28D', '0').subscribe(result => {
      console.log(result);
    });
  });

  it('traderThreshold', done => {
    const result = api.margin.traderThreshold('FEUR', 'AUSD').subscribe(result => {
      console.log(result);
    });
  });

  it('poolInfo', async () => {
    const result = await api.margin.poolInfo('0').toPromise();
    console.log(result);
  });

  it('positionsByPool', async () => {
    const result = await api.margin.positionsByPool('0').toPromise();
    console.log(result);
  });

  // it('positions', async () => {
  //   const result = await api.margin.positions('10').toPromise();
  //   console.log(result);
  // });

  // it('getPoolEnabledTradingPairs', async () => {
  //   const result = await api.margin.poolEnabledTradingPairs('0').toPromise();
  //   expect(Array.isArray(result)).toBeTruthy();
  // });

  it('poolInfo111', done => {
    const result = api.synthetic.poolInfo('0').subscribe(result => {
      console.log(result);
    });
  });

  it('positionsByTrader', done => {
    const result = api.margin
      .positionsByTrader('5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY')
      .subscribe(result => {
        console.log(result);
      });
  });

  it('getPoolEnabledTradingPairs', done => {
    const result = api.api.tx.marginLiquidityPools.setEnabledTrades(
      '0',
      {
        base: 'AUSD',
        quote: 'FEUR'
      },
      [
        'LongTwo',
        'LongThree',
        'LongFive',
        'LongTen',
        'LongTwenty',
        'LongThirty',
        'LongFifty',
        // 'LongReserved',
        'ShortTwo',
        'ShortThree',
        'ShortFive',
        'ShortTen',
        'ShortTwenty',
        'ShortThirty',
        'ShortFifty'
        // 'ShortReserved'
      ]
    );

    console.error('哈哈哈哈哈哈');
    result.signAndSend(alice).subscribe(results => {
      console.log(results);
    });
  });
});
