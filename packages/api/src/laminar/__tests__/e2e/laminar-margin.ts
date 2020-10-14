import { Keyring } from '@polkadot/api';
import { WsProvider } from '@polkadot/rpc-provider';
import { LaminarApi } from '../..';

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

  const tokenIdMatch = expect.stringMatching(/^LAMI|AUSD|FEUR|FJPY|FBTC|FETH|FAUD|FCAD|FCHF|FXAU|FOIL|FGBP$/);
  const numberMatch = expect.stringMatching(/^-?\d+$/);
  const stringMatch = expect.any(String);
  const boolMatch = expect.any(Boolean);

  const pairMatch = {
    base: tokenIdMatch,
    quote: tokenIdMatch
  };

  const tradingPairOptionMatch = {
    pair: {
      base: tokenIdMatch,
      quote: tokenIdMatch
    },
    pairId: stringMatch,
    bidSpread: numberMatch,
    askSpread: numberMatch,
    enabledTrades: expect.arrayContaining([stringMatch])
  };

  const poolInfoMatch = {
    balance: numberMatch,
    ell: numberMatch,
    enp: numberMatch,
    minLeveragedAmount: numberMatch,
    owner: stringMatch,
    poolId: stringMatch,
    options: expect.arrayContaining([tradingPairOptionMatch])
  };

  const marginInfoMatch = {
    ellThreshold: {
      marginCall: numberMatch,
      stopOut: numberMatch
    },
    enpThreshold: {
      marginCall: numberMatch,
      stopOut: numberMatch
    }
  };

  const traderInfoMatch = {
    accumulatedSwap: numberMatch,
    balance: numberMatch,
    equity: numberMatch,
    freeMargin: numberMatch,
    marginHeld: numberMatch,
    marginLevel: numberMatch,
    totalLeveragedPosition: numberMatch,
    unrealizedPl: numberMatch
  };

  const traderThresholdMatch = {
    marginCall: numberMatch,
    stopOut: numberMatch
  };

  const accumulatedSwapRateMatch = {
    poolId: stringMatch,
    pair: {
      base: tokenIdMatch,
      quote: tokenIdMatch
    },
    pairId: stringMatch,
    long: numberMatch,
    short: numberMatch
  };

  const positionMatch = {
    owner: stringMatch,
    poolId: stringMatch,
    pair: pairMatch,
    leverage: stringMatch,
    leveragedHeld: numberMatch,
    leveragedDebits: numberMatch,
    marginHeld: numberMatch,
    openAccumulatedSwapRate: numberMatch
  };

  it('pairId', done => {
    api.margin.pairIdHelper().subscribe(getPairId => {
      expect(getPairId({ base: 'AUSD', quote: 'FEUR' })).toEqual('USDEUR');
      done();
    });
  });

  it('tradingPairOptions', done => {
    api.margin.tradingPairOptions('0').subscribe(result => {
      console.log(result);

      expect(result).toMatchObject(expect.arrayContaining([tradingPairOptionMatch]));

      done();
    });
  });

  it('poolInfo', done => {
    api.margin.poolInfo('0').subscribe(result => {
      console.log(result);

      expect(result).toMatchObject(poolInfoMatch);

      done();
    });
  });

  it('marginInfo', done => {
    api.margin.marginInfo().subscribe(result => {
      console.log(result);

      expect(result).toMatchObject(marginInfoMatch);

      done();
    });
  });

  it('traderInfo', done => {
    api.margin.traderInfo('5CoyPV8fECowgxpFx295i8so1izVf8habhrL1VWxV2rkc244', '0').subscribe(result => {
      console.log(result);

      expect(result).toMatchObject(traderInfoMatch);

      done();
    });
  });

  it('traderThreshold', done => {
    api.margin.traderThreshold('FOIL', 'AUSD').subscribe(result => {
      console.log(result);

      expect(result).toMatchObject(traderThresholdMatch);

      done();
    });
  });

  it('accumulatedSwapRates', done => {
    api.margin.accumulatedSwapRates().subscribe(result => {
      console.log(result);

      expect(result).toMatchObject(expect.arrayContaining([accumulatedSwapRateMatch]));

      done();
    });
  });

  it('position', done => {
    api.margin.position('825').subscribe(result => {
      console.log(result);

      expect(result).toMatchObject(positionMatch);

      done();
    });
  });

  it('allPoolIds', done => {
    api.margin.allPoolIds().subscribe(result => {
      console.log(result);

      expect(result).toMatchObject(expect.arrayContaining([numberMatch]));

      done();
    });
  });

  it('positionsByPool', done => {
    api.margin.positionsByPool('0').subscribe(result => {
      console.log(result);

      expect(result).toMatchObject(
        expect.arrayContaining([
          {
            pair: pairMatch,
            positionId: stringMatch
          }
        ])
      );

      done();
    });
  });

  it('positionsByTrader', done => {
    api.margin.positionsByTrader('5CoyPV8fECowgxpFx295i8so1izVf8habhrL1VWxV2rkc244').subscribe(result => {
      console.log(result);

      expect(result).toMatchObject(
        expect.arrayContaining([
          {
            poolId: stringMatch,
            positionId: stringMatch
          }
        ])
      );

      done();
    });
  });
});
