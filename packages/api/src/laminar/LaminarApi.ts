import BN from 'bn.js';
import { options } from '@laminar/api';
import { ApiPromise, WsProvider } from '@polkadot/api';

import { FlowApi, TokenInfo, TokenName, PoolOptions } from '../types';
import { InterfaceRegistry } from '@laminar/types/interfaceRegistry';

class LaminarApi implements FlowApi {
  private api: ApiPromise;

  constructor() {
    this.api = new ApiPromise(
      options({
        provider: new WsProvider(
          'wss://node-6636393196323627008.jm.onfinality.io/ws?apikey=20cf0fa0-c7ee-4545-8227-4d488f71c6d2'
        )
      }) as any
    );
  }

  private parsePoolId(str: string) {
    return str.split('//');
  }

  public getBalance = async (address: string, tokenId: TokenName) => {
    const result: InterfaceRegistry['Balance'] = await (this.api.derive as any).currencies.balance(address, tokenId);
    return result.toString();
  };

  public redeem = async (account: string, poolId: string, fromToken: string, fromAmount: string) => {
    return new Promise((resolve, reject) => {
      this.api.tx.syntheticProtocol.redeem(poolId, fromToken, fromAmount, '1000000').signAndSend(account, result => {
        if (result.status.isFinalized || result.status.isInBlock) {
          result.events
            .filter(({ event: { section } }): boolean => section === 'system')
            .forEach(({ event: { method } }): void => {
              if (method === 'ExtrinsicFailed') {
                reject(result);
              } else if (method === 'ExtrinsicSuccess') {
                resolve(result);
              }
            });
        } else if (result.isError) {
          reject(result);
        }
      });
    });
  };

  public mint = async (account: string, poolId: string, toToken: string, fromAmount: string) => {
    return new Promise((resolve, reject) => {
      this.api.tx.syntheticProtocol.mint(poolId, toToken, fromAmount, '1000000').signAndSend(account, result => {
        if (result.status.isFinalized || result.status.isInBlock) {
          result.events
            .filter(({ event: { section } }): boolean => section === 'system')
            .forEach(({ event: { method } }): void => {
              if (method === 'ExtrinsicFailed') {
                reject(result);
              } else if (method === 'ExtrinsicSuccess') {
                resolve(result);
              }
            });
        } else if (result.isError) {
          reject(result);
        }
      });
    });
  };

  public getPoolOptions = async (poolId: string, tokenId: string): Promise<PoolOptions> => {
    const data = await this.api.query.liquidityPools.liquidityPoolOptions<
      InterfaceRegistry['Option<LiquidityPoolOption>']
    >(poolId, tokenId);

    // if (!data) {
    return {
      bidSpread: null,
      askSpread: null,
      additionalCollateralRatio: null
    };
    // }

    // const askSpread = data.askSpread;
    // const bidSpread = (data.value as any).get('bidSpread');
    // const additionalCollateralRatio = data.additionalCollateralRatio;

    // return {
    //   bidSpread: data.bidSpread !== null ? fromPrecision(bidSpread.toString(10), 6) : null,
    //   askSpread: askSpread !== null ? fromPrecision(askSpread.toString(10), 6) : null,
    //   additionalCollateralRatio:
    //     additionalCollateralRatio !== null ? fromPrecision(additionalCollateralRatio.toString(10), 6) : null
    // };
  };

  public getOrcalePrice = async (tokenId: TokenName) => {
    const result = await (this.api.rpc as any).oracle.getValue(tokenId);
    return result.value.get('value');
  };

  public getTokenLiquidity = async (_poolId: string, tokenId: TokenName) => {
    const [poolId, poolAddr] = this.parsePoolId(_poolId);

    const balance = await this.getBalance(poolAddr, tokenId);
    const { additionalCollateralRatio } = await this.getPoolOptions(poolId, tokenId);
    return new BN(balance).mul(new BN(1 + Number(additionalCollateralRatio))).toString();
  };

  public getPools = async () => {
    const nextPoolId = await this.api.query.liquidityPools.nextPoolId<InterfaceRegistry['LiquidityPoolId']>();

    return Promise.all(
      Array.from(Array(nextPoolId.toNumber()).keys()).map(id => {
        return this.api.query.liquidityPools.owners(id).then(result => {
          // @TODO fixme
          const address = (result.toJSON() && result.toJSON()) as string;

          return {
            id: `${id}//${address}`,
            address,
            name: address.slice(0, 12)
          };
        });
      })
    );
  };

  public getTokens = async (): Promise<TokenInfo[]> => [
    {
      name: 'LAMI',
      displayName: 'LAMI',
      precision: 18,
      isBaseToken: false,
      isNetworkToken: true,
      id: 'LAMI'
    },
    {
      name: 'AUSD',
      displayName: 'AUSD',
      precision: 18,
      isBaseToken: true,
      isNetworkToken: false,
      id: 'AUSD'
    },
    {
      name: 'EUR',
      displayName: 'Euro',
      precision: 18,
      isBaseToken: false,
      isNetworkToken: false,
      id: 'FEUR'
    },
    {
      name: 'JPY',
      displayName: 'Yen',
      precision: 18,
      isBaseToken: false,
      isNetworkToken: false,
      id: 'FJPY'
    },
    {
      name: 'BTC',
      displayName: 'BTC',
      precision: 18,
      isBaseToken: false,
      isNetworkToken: false,
      id: 'FBTC'
    },
    {
      name: 'ETH',
      displayName: 'ETH',
      precision: 18,
      isBaseToken: false,
      isNetworkToken: false,
      id: 'FETH'
    }
  ];
}

export default LaminarApi;
