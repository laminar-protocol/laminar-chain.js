import BN from 'bn.js';
import { ApiPromise, WsProvider } from '@polkadot/api';

import { options } from './options';
import { FlowApi, TokenInfo, TokenName, PoolOptions } from '../types';
import { Balance, LiquidityPoolId, LiquidityPoolOption } from '@laminar/types/interfaces';
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

  private parsePoolId = (str: string) => {
    return str.split('//');
  };

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

  public getBalance = async (address: string, tokenId: TokenName) => {
    const result: Balance = await (this.api.derive as any).currencies.balance(address, tokenId);
    return result.toString();
  };

  public getPoolOptions = async (poolId: string, tokenId: string): Promise<PoolOptions> => {
    const data = await this.api.query.liquidityPools.liquidityPoolOptions<Option<LiquidityPoolOption>>(poolId, tokenId);

    if (!data) {
      return {
        bidSpread: null,
        askSpread: null,
        additionalCollateralRatio: null
      };
    }
    const options = data.value as LiquidityPoolOption;

    return options.toJSON() as any;
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

  public redeem = async (account: string, poolId: string, fromToken: TokenName, fromAmount: string) => {
    const extrinsic = this.api.tx.syntheticProtocol.redeem(poolId, fromToken as any, fromAmount, '1000000');
    return this.extrinsicHelper(extrinsic, account);
  };

  public mint = async (account: string, poolId: string, toToken: TokenName, fromAmount: string) => {
    const extrinsic = this.api.tx.syntheticProtocol.mint(poolId, toToken as any, fromAmount, '1000000');
    return this.extrinsicHelper(extrinsic, account);
  };

  public getPools = async () => {
    const nextPoolId = await this.api.query.liquidityPools.nextPoolId<LiquidityPoolId>();

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
