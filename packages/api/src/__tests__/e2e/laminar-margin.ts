import { LaminarApi } from '../..';
import { WsProvider } from '@polkadot/api';

describe('laminar margin', () => {
  jest.setTimeout(300000);

  const api = new LaminarApi({
    provider: new WsProvider('wss://dev-node.laminar-chain.laminar.one/ws')
  });

  beforeAll(async () => {
    await api.isReady();
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
});
