import { Keyring } from '@polkadot/api';
import { WsProvider } from '@polkadot/rpc-provider';
import { LaminarApi } from '../../..';

describe('laminar currencies', () => {
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

  const tokenIdMatch = expect.stringMatching(/^LAMI|AUSD|FEUR|FJPY|FBTC|FETH|FAUD|FCAD|FCHF|FXAU|FOIL|FGBP$/);
  const numberMatch = expect.stringMatching(/^-?\d+$/);
  const stringMatch = expect.any(String);
  const boolMatch = expect.any(Boolean);

  const tokenMatch = {
    name: stringMatch,
    symbol: stringMatch,
    precision: expect.any(Number),
    isBaseToken: boolMatch,
    isNetworkToken: boolMatch,
    id: tokenIdMatch
  };

  const balanceMatch = {
    tokenId: tokenIdMatch,
    free: numberMatch
  };

  const oracleValueMatch = {
    timestamp: expect.any(Number),
    tokenId: tokenIdMatch,
    value: numberMatch
  };

  it('tokens', done => {
    api.currencies.tokens().subscribe(result => {
      console.log(result);

      expect(result).toMatchObject(expect.arrayContaining([tokenMatch]));

      done();
    });
  });

  it('balances', done => {
    api.currencies.balances('5CoyPV8fECowgxpFx295i8so1izVf8habhrL1VWxV2rkc244').subscribe(result => {
      console.log(result);

      expect(result).toMatchObject(expect.arrayContaining([balanceMatch]));

      done();
    });
  });

  it('oracleValues', done => {
    api.currencies.oracleValues(1).subscribe(result => {
      console.log(result);

      expect(result).toMatchObject(expect.arrayContaining([oracleValueMatch]));

      done();
    });
  });
});
