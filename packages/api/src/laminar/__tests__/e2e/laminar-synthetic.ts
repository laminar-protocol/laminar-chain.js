import { Keyring } from '@polkadot/api';
import { WsProvider } from '@polkadot/rpc-provider';
import { LaminarApi } from '../..';

describe('laminar synthetic', () => {
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

  const tokenIdMatch = expect.stringMatching(/^LAMI|AUSD|FEUR|FJPY|FBTC|FETH|FAUD|FCAD|FCHF|FXAU|FOIL|FGBP$/);
  const numberMatch = expect.stringMatching(/^-?\d+$/);
  const stringMatch = expect.any(String);
  const boolMatch = expect.any(Boolean);

  const poolInfoMatch = {
    poolId: stringMatch,
    owner: stringMatch,
    balance: numberMatch,
    options: expect.arrayContaining([
      {
        tokenId: tokenIdMatch,
        askSpread: numberMatch,
        bidSpread: numberMatch,
        additionalCollateralRatio: numberMatch
      }
    ])
  };

  it('poolInfo', done => {
    api.synthetic.poolInfo('0').subscribe(result => {
      console.log(result);

      expect(result).toMatchObject(poolInfoMatch);

      done();
    });
  });

  it('allPoolIds', done => {
    api.synthetic.allPoolIds().subscribe(result => {
      console.log(result);

      expect(result).toMatchObject(expect.arrayContaining([numberMatch]));

      done();
    });
  });
});
