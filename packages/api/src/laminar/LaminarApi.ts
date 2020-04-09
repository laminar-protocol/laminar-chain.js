import BN from 'bn.js';
import { first } from 'rxjs/operators';
import { ApiRx, WsProvider } from '@polkadot/api';
import { ApiOptions } from '@polkadot/api/types';
import { Option } from '@polkadot/types/codec';
import { Balance, MarginLiquidityPoolOption, Permill, AccountId } from '@laminar/types/interfaces';

import { options as getOptions } from './options';
import { FlowApi, TokenInfo, TokenId, PoolOptions, TradingPair, ChainType, ActionStatus } from '../types';
import Margin from './Margin';

interface LaminarApiOptions extends ApiOptions {
  provider: WsProvider;
}

class LaminarApi implements FlowApi {
  private minAdditionalCollateralRatio?: number;

  public api: ApiRx;
  public chainType: ChainType = 'laminar';
  public margin: Margin;

  static TokenIds = ['LAMI', 'AUSD', 'FEUR', 'FJPY', 'FBTC', 'FETH'] as const;

  constructor(options: LaminarApiOptions) {
    this.api = new ApiRx(
      getOptions({
        ...options,
        provider: options.provider
      })
    );

    this.margin = new Margin(this);
  }

  public extrinsicHelper = (
    extrinsic: any,
    signOption: any,
    { action }: { action?: string } = {}
  ): Promise<ActionStatus> => {
    return new Promise((resolve, reject) => {
      const actionStatus = {
        txHash: extrinsic.toHex(),
        action
      } as Partial<ActionStatus>;

      extrinsic.signAndSend(signOption, (result: any) => {
        if (result.status.isInBlock) {
          actionStatus.blockHash = result.status.asInBlock.toHex();
        }

        if (result.status.isFinalized || result.status.isInBlock) {
          actionStatus.data = result;
          actionStatus.account = extrinsic.signer.toString();

          result.events
            .filter(({ event: { section } }: any): boolean => section === 'system')
            .forEach((event: any): void => {
              const {
                event: { data, method }
              } = event;

              if (method === 'ExtrinsicFailed') {
                const [dispatchError] = data;
                let message = dispatchError.type;

                if (dispatchError.isModule) {
                  try {
                    const mod = dispatchError.asModule;
                    const error = this.api.registry.findMetaError(
                      new Uint8Array([mod.index.toNumber(), mod.error.toNumber()])
                    );
                    message = `${error.section}.${error.name}`;
                  } catch (error) {
                    // swallow
                  }
                }

                actionStatus.message = message;
                actionStatus.status = 'error';
                reject(actionStatus);
              } else if (method === 'ExtrinsicSuccess') {
                actionStatus.status = 'success';
                resolve(actionStatus as ActionStatus);
              }
            });
        } else if (result.isError) {
          actionStatus.account = extrinsic.signer.toString();
          actionStatus.status = 'error';
          actionStatus.data = result;

          reject(actionStatus);
        }
      });
    });
  };

  public isReady = async () => {
    await this.api.isReady.pipe(first()).toPromise();
  };

  public getBalance = async (address: string, tokenId: TokenId) => {
    const result: Balance = await (this.api.derive as any).currencies.balance(address, tokenId);
    return result.toString();
  };

  public getPoolOptions = async (poolId: string, tokenId: TokenId): Promise<PoolOptions> => {
    const data = await this.api.query.liquidityPools
      .liquidityPoolOptions<Option<MarginLiquidityPoolOption>>(poolId, tokenId)
      .pipe(first())
      .toPromise();
    const json = data.toJSON() as any;

    if (!this.minAdditionalCollateralRatio) {
      this.minAdditionalCollateralRatio = (
        await this.api.query.liquidityPools
          .minAdditionalCollateralRatio<Permill>()
          .pipe(first())
          .toPromise()
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

  public getPoolOwner = async (poolId: string) => {
    const result = await this.api.query.liquidityPools
      .owners<Option<AccountId>>(poolId)
      .pipe(first())
      .toPromise();
    if (result.isNone) return null;
    return (result.toJSON() && result.toJSON()) as string;
  };

  public getOraclePrice = async (tokenId: TokenId) => {
    const result = await (this.api.rpc as any).oracle.getValue(tokenId);
    return result.value.get('value');
  };

  public getLiquidity = async (poolId: string): Promise<string> => {
    return (
      await this.api.query.liquidityPools
        .balances<Balance>(poolId)
        .pipe(first())
        .toPromise()
    ).toString();
  };

  public createPool = async (account: string) => {
    const extrinsic = this.api.tx.liquidityPools.createPool();
    return this.extrinsicHelper(extrinsic, account, { action: 'Create Pool' });
  };

  public redeem = async (account: string, poolId: string, fromToken: TokenId, fromAmount: string | BN) => {
    const extrinsic = this.api.tx.syntheticProtocol.redeem(poolId, fromToken as any, fromAmount, '1000000');
    return this.extrinsicHelper(extrinsic, account, { action: 'Swap' });
  };

  public mint = async (account: string, poolId: string, toToken: TokenId, fromAmount: string | BN) => {
    const extrinsic = this.api.tx.syntheticProtocol.mint(poolId, toToken as any, fromAmount, '1000000');
    return this.extrinsicHelper(extrinsic, account, { action: 'Swap' });
  };

  public depositLiquidity = async (account: string, poolId: string, amount: string | BN) => {
    const extrinsic = this.api.tx.liquidityPools.depositLiquidity(poolId, amount);
    return this.extrinsicHelper(extrinsic, account, { action: 'Deposit Liquidity' });
  };

  public withdrawLiquidity = async (account: string, poolId: string, amount: string | BN) => {
    const extrinsic = this.api.tx.liquidityPools.withdrawLiquidity(poolId, amount);
    return this.extrinsicHelper(extrinsic, account, { action: 'WithDraw Liquidity' });
  };

  public getDefaultPools = async () => {
    // const nextPoolId = await this.api.query.liquidityPools.nextPoolId<LiquidityPoolId>();

    return Promise.all(
      ['0'].map(id => {
        return this.api.query.liquidityPools
          .owners(id)
          .pipe(first())
          .toPromise()
          .then(result => {
            // @TODO fixme
            const address = (result.toJSON() && result.toJSON()) as string;

            return {
              id: `${id}`,
              owner: address,
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

export type LaminarTokenId = typeof LaminarApi.TokenIds[number];

export default LaminarApi;
