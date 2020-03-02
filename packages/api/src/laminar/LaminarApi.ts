import { ApiPromise, WsProvider } from '@polkadot/api';
import { ApiOptions } from '@polkadot/api/types';

import { options as getOptions } from './options';
import { FlowApi, TokenInfo, TokenId, PoolOptions, TradingPair } from '../types';
import { Balance, LiquidityPoolOption, Permill } from '@laminar/types/interfaces';
import { Option } from '@polkadot/types/codec';

interface LaminarApiOptions extends ApiOptions {
  provider: WsProvider;
}

class LaminarApi implements FlowApi {
  private api: ApiPromise;
  private minAdditionalCollateralRatio?: number;
  constructor(options: LaminarApiOptions) {
    this.api = new ApiPromise(
      getOptions({
        ...options,
        provider: options.provider
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

  public getBalance = async (address: string, tokenId: TokenId) => {
    const result: Balance = await (this.api.derive as any).currencies.balance(address, tokenId);
    return result.toString();
  };

  public getPoolOptions = async (poolId: string, tokenId: TokenId): Promise<PoolOptions> => {
    const data = await this.api.query.liquidityPools.liquidityPoolOptions<Option<LiquidityPoolOption>>(poolId, tokenId);
    const json = data.toJSON() as any;

    if (!this.minAdditionalCollateralRatio) {
      this.minAdditionalCollateralRatio = (
        await this.api.query.liquidityPools.minAdditionalCollateralRatio<Permill>()
      ).toJSON() as number;
    }

    if (!json) {
      return {
        poolId,
        tokenId,
        bidSpread: null,
        askSpread: null,
        additionalCollateralRatio: this.minAdditionalCollateralRatio,
        syntheticEnabled: false
      };
    } else {
      return {
        ...json,
        additionalCollateralRatio: Math.max(this.minAdditionalCollateralRatio, json.additionalCollateralRatio),
        poolId,
        tokenId
      };
    }
  };

  public getOraclePrice = async (tokenId: TokenId) => {
    const result = await (this.api.rpc as any).oracle.getValue(tokenId);
    return result.value.get('value');
  };

  public getLiquidity = async (poolId: string): Promise<string> => {
    return (await this.api.query.liquidityPools.balances<Balance>(poolId)).toString();
  };

  public redeem = async (account: string, poolId: string, fromToken: TokenId, fromAmount: string) => {
    const extrinsic = this.api.tx.syntheticProtocol.redeem(poolId, fromToken as any, fromAmount, '1000000');
    return this.extrinsicHelper(extrinsic, account);
  };

  public mint = async (account: string, poolId: string, toToken: TokenId, fromAmount: string) => {
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
