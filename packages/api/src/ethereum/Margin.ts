import { from, Observable, of } from 'rxjs';
import { Contract } from 'web3-eth-contract';
import { toNumber } from '@laminar/types/utils/precision';
import { MarginInfo } from '../types';
import EthereumApi from './EthereumApi';

class Margin {
  private apiProvider: EthereumApi;
  private protocol: EthereumApi['protocol'];
  private flowMarginProtocol: Contract;

  constructor(provider: EthereumApi) {
    this.apiProvider = provider;
    this.protocol = provider.protocol;
    this.flowMarginProtocol = this.apiProvider.baseContracts.flowMarginProtocol;
  }

  public balance = (address: string) => {
    return from(this.apiProvider.web3.eth.getBalance(address));
  };

  public allPoolIds = () => {
    return of([this.protocol.addresses.pool, this.protocol.addresses.pool2]);
  };

  public marginInfo = (): Observable<MarginInfo> => {
    return from(
      Promise.all([
        this.flowMarginProtocol.methods.liquidityPoolELLLiquidateThreshold().call(),
        this.flowMarginProtocol.methods.liquidityPoolELLMarginThreshold().call(),
        this.flowMarginProtocol.methods.liquidityPoolENPLiquidateThreshold().call(),
        this.flowMarginProtocol.methods.liquidityPoolENPMarginThreshold().call()
      ]).then(([ELLLiquidateThreshold, ELLMarginThreshold, ENPLiquidateThreshold, ENPMarginThreshold]) => {
        return {
          ellThreshold: {
            marginCall: toNumber(ELLMarginThreshold),
            stopOut: toNumber(ELLLiquidateThreshold)
          },
          enpThreshold: {
            marginCall: toNumber(ENPMarginThreshold),
            stopOut: toNumber(ENPLiquidateThreshold)
          }
        };
      })
    );
  };

  //Observable<MarginPoolInfo | null>
  public poolInfo = (poolId: string) => {
    const poolContract = this.apiProvider.createLiquidityPoolContract(poolId);
    const tradingPairs = this.protocol.tradingPairs;
    return from(
      Promise.all([
        this.apiProvider.tokenContracts.DAI.methods.balanceOf(poolId).call(),
        poolContract.methods.owner().call(),
        Promise.all(
          tradingPairs.map(item => {
            return {
              bidSpread: 0,
              askSpread: 0,
              enabledTrades: item.enabledTrades,
              pair: item.pair,
              pairId: item.pairId
            };
          })
        )
      ]).then(([balance, owner, options]) => {
        return {
          poolId: poolContract.options.address,
          balance,
          owner,
          enp: '0',
          ell: '0',
          options
        };
      })
    );
  };

  public traderInfo: undefined;
  public openPosition: undefined;
  public closePosition: undefined;
  public deposit: undefined;
  public withdraw: undefined;
}

export default Margin;
