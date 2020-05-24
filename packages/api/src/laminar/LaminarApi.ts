import { ApiRx } from '@polkadot/api';
import { WsProvider } from '@polkadot/rpc-provider';
import { ApiOptions } from '@polkadot/api/types';
import { first } from 'rxjs/operators';

import { ActionStatus, ChainType, LaminarTokenNames } from '../types';
import { options as getOptions } from './options';
import Margin from './Margin';
import Synthetic from './Synthetic';
import Currencies from './Currencies';

interface LaminarApiOptions extends ApiOptions {
  provider: WsProvider;
}

class LaminarApi {
  public api: ApiRx;
  public chainType: ChainType = 'laminar';
  public margin: Margin;
  public synthetic: Synthetic;
  public currencies: Currencies;

  static tokenIds: LaminarTokenNames = [
    'LAMI',
    'AUSD',
    'FEUR',
    'FJPY',
    'FBTC',
    'FETH',
    'FAUD',
    'FCAD',
    'FCHF',
    'FXAU',
    'FOIL'
  ];

  constructor(options: LaminarApiOptions) {
    this.api = new ApiRx(
      getOptions({
        ...options,
        provider: options.provider
      })
    );

    this.margin = new Margin(this);
    this.synthetic = new Synthetic(this);
    this.currencies = new Currencies(this);
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

      extrinsic.signAndSend(signOption).subscribe(
        (result: any) => {
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
        },
        (error: any) => {
          actionStatus.message = error.message;
          actionStatus.data = error;
          actionStatus.status = 'error';
          actionStatus.account = extrinsic.signer.toString();

          reject(actionStatus);
        }
      );
    });
  };

  public isReady = async () => {
    await this.api.isReady.pipe(first()).toPromise();
  };
}

export default LaminarApi;
