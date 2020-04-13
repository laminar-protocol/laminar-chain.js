import { LaminarApi } from '../..';
import { WsProvider } from '@polkadot/api';
import { Keyring } from '@polkadot/api';

describe('laminar margin', () => {
  jest.setTimeout(300000);

  const api = new LaminarApi({
    provider: new WsProvider('wss://dev-node.laminar-chain.laminar.one/ws')
  });

  let alice;

  beforeAll(async () => {
    await api.isReady();
    const keyring = new Keyring({ type: 'sr25519' });
    alice = keyring.addFromUri('//Alice');
  });

  it('marginInfo', async () => {
    const result = await api.margin.marginInfo().toPromise();
    console.log(result);
  });

  it('poolInfo', async () => {
    const result = await api.margin.poolInfo('0').toPromise();
    console.log(result);
  });

  it('positionsByPool', async () => {
    const result = await api.margin.positionsByPool('0').toPromise();
    console.log(result);
  });

  it('positions', async () => {
    const result = await api.margin.positions('10').toPromise();
    console.log(result);
  });

  it('getPoolEnabledTradingPairs', async () => {
    const result = await api.margin.poolEnabledTradingPairs('0').toPromise();
    expect(Array.isArray(result)).toBeTruthy();
  });

  it.only('getPoolEnabledTradingPairs', done => {
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
        'LongReserved',
        'ShortTwo',
        'ShortThree',
        'ShortFive',
        'ShortTen',
        'ShortTwenty',
        'ShortThirty',
        'ShortFifty',
        'ShortReserved'
      ]
    );

    result.signAndSend(alice, r => {
      console.log(r);
      // expect()
    });
  });
});
