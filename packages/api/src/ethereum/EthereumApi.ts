import { ActionStatus, ChainType } from '../types';
import Currencies from './Currencies';
import LaminarContract, { LaminarContractOptions } from './LaminarContract';
import Margin from './Margin';
import Synthetic from './Synthetic';

export const UINT256_MAX = '115792089237316195423570985008687907853269984665640564039457584007913129639935';

class EthereumApi extends LaminarContract {
  public chainType: ChainType = 'ethereum';
  public gas?: string;
  public margin: Margin;
  public currencies: Currencies;
  public synthetic: Synthetic;

  constructor(options: LaminarContractOptions & { gas?: string }) {
    super(options);
    this.gas = options.gas;
    this.margin = new Margin(this);
    this.currencies = new Currencies(this);
    this.synthetic = new Synthetic(this);
  }

  public extrinsicHelper = (
    extrinsic: any,
    signOption: any,
    { action }: { action?: string } = {}
  ): Promise<ActionStatus> => {
    const actionStatus = {
      account: signOption.from,
      action,
    } as Partial<ActionStatus>;

    if (this.gas) {
      signOption.gas = this.gas;
    }

    return extrinsic
      .send(signOption)
      .then((result: any) => {
        actionStatus.data = result;
        actionStatus.status = 'success';
        return actionStatus;
      })
      .catch((error: any) => {
        actionStatus.data = error;
        actionStatus.status = 'error';
        actionStatus.message = error && error.message ? error.message : '';
        return Promise.reject(actionStatus);
      });
  };

  public isReady = async () => {
    console.log('EthereumApi isReady');
  };
}

export default EthereumApi;
