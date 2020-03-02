import { ApiPromise, WsProvider } from '@polkadot/api';

import { options } from './options';
import { FlowApi, TokenInfo, TokenName, PoolOptions, TradingPair } from '../types';
import { Balance, LiquidityPoolOption } from '@laminar/types/interfaces';
import { Option } from '@polkadot/types/codec';

interface LaminarApiOptions {
  provider: WsProvider;
}

class LaminarApi implements FlowApi {
  private api: ApiPromise;

  constructor({ provider }: LaminarApiOptions) {
    this.api = new ApiPromise(
      options({
        provider: provider
      })
    );
  }

  private extrinsicHelper = (extrinsic: any, signOption: any) => {
    return new Promise((resolve, reject) => {
      extrinsic.signAndSend(signOption, (result: any) => {
        if (result.status.isFinalized || result.status.isInBlock) {
          result.events
            .filter(({ event: { section } }: any): boolean => section === 'system')
            .forEach(({ event: { method } }: any): void => {
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

  public isReady = async () => {
    return this.api.isReady;
  };

  public getBalance = async (address: string, tokenId: TokenName) => {
    const result: Balance = await (this.api.derive as any).currencies.balance(address, tokenId);
    return result.toString();
  };

  public getPoolOptions = async (poolId: string, tokenId: string): Promise<PoolOptions> => {
    const data = await this.api.query.liquidityPools.liquidityPoolOptions<Option<LiquidityPoolOption>>(poolId, tokenId);
    const json = data.toJSON() as any;

    console.error(poolId, tokenId, json);
    if (!json) {
      return {
        bidSpread: null,
        askSpread: null,
        additionalCollateralRatio: null
      };
    } else {
      return json;
    }
  };

  public getOraclePrice = async (tokenId: TokenName) => {
    const result = await (this.api.rpc as any).oracle.getValue(tokenId);
    return result.value.get('value');
  };

  public getLiquidity = async (poolId: string): Promise<string> => {
    return (await this.api.query.liquidityPools.balances<Balance>(poolId)).toString();
  };

  public redeem = async (account: string, poolId: string, fromToken: TokenName, fromAmount: string) => {
    const extrinsic = this.api.tx.syntheticProtocol.redeem(poolId, fromToken as any, fromAmount, '1000000');
    return this.extrinsicHelper(extrinsic, account);
  };

  public mint = async (account: string, poolId: string, toToken: TokenName, fromAmount: string) => {
    const extrinsic = this.api.tx.syntheticProtocol.mint(poolId, toToken as any, fromAmount, '1000000');
    return this.extrinsicHelper(extrinsic, account);
  };

  public getDefaultPools = async () => {
    // const nextPoolId = await this.api.query.liquidityPools.nextPoolId<LiquidityPoolId>();

    return Promise.all(
      ['0'].map(id => {
        return this.api.query.liquidityPools.owners(id).then(result => {
          // @TODO fixme
          const address = (result.toJSON() && result.toJSON()) as string;

          return {
            id: `${id}`,
            address,
            isDefault: true,
            name: `${id}//${address.slice(0, 12)}`
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

  public getTradingPairs = async (): Promise<TradingPair[]> => {
    return [];
  };
}

export default LaminarApi;
