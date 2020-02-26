import Web3 from 'web3';
import { Contract } from 'web3-eth-contract';
import { AbiItem } from 'web3-utils';
import { provider as Web3Provider } from 'web3-core';

import protocols, { TokenName, TradingPairSymbol, Protocol, ProtocolType } from './protocols';

export interface LaminarContractOptions {
  provider: Web3Provider;
  protocolType?: ProtocolType;
}

interface LaminarContract {
  provider: Web3Provider;
  web3: Web3;
  protocol: Protocol;
  baseContracts: Record<'flowProtocol' | 'flowMarginProtocol' | 'oracle' | 'moneyMarket' | 'daiFaucet', Contract>;
  tokenContracts: Record<TokenName | 'iUSD', Contract>;
  tradingPairContracts: Record<TradingPairSymbol, Contract>;
}

class LaminarContract implements LaminarContract {
  constructor({ provider, protocolType = 'kovan' }: LaminarContractOptions) {
    this.protocol = protocols[protocolType];
    this.provider = provider;
    this.web3 = new Web3(this.provider);

    const abis = this.protocol.abis;
    const addresses = this.protocol.addresses;
    const tradingPairs = this.protocol.tradingPairs;

    this.baseContracts = {
      flowProtocol: this.createContract(abis.FlowProtocol, addresses.protocol),
      flowMarginProtocol: this.createContract(abis.FlowMarginProtocol, addresses.marginProtocol),
      oracle: this.createContract(abis.PriceOracleInterface, addresses.oracle),
      moneyMarket: this.createContract(abis.MoneyMarket, addresses.moneyMarket),
      daiFaucet: this.createContract(abis.FaucetInterface, addresses.baseToken)
    };

    this.tokenContracts = {
      DAI: this.createContract(abis.ERC20, addresses.baseToken),
      iUSD: this.createContract(abis.ERC20, addresses.iToken),
      fEUR: this.createContract(abis.ERC20, addresses.fEUR),
      fJPY: this.createContract(abis.ERC20, addresses.fJPY),
      fAAPL: this.createContract(abis.ERC20, addresses.fAAPL),
      fXAU: this.createContract(abis.ERC20, addresses.fXAU)
    };

    this.tradingPairContracts = (Object.keys(tradingPairs) as (keyof LaminarContract['tradingPairContracts'])[]).reduce(
      (r, name) => {
        r[name] = this.createContract(abis.MarginTradingPair, tradingPairs[name].address);
        return r;
      },
      {} as Partial<LaminarContract['tradingPairContracts']>
    ) as LaminarContract['tradingPairContracts'];
  }

  private createContract(abi: AbiItem[] | AbiItem, address: string): Contract {
    return new this.web3.eth.Contract(abi, address);
  }

  public getTradingPairInfo(pairSymbol: TradingPairSymbol) {
    return this.protocol.tradingPairs[pairSymbol];
  }

  public getTokenContract(tokenName: string): Contract {
    const contract = this.tokenContracts[tokenName as keyof LaminarContract['tokenContracts']];
    if (!contract) throw new Error(`token ${tokenName} is undefined`);
    return contract;
  }

  public getBaseContract(name: keyof LaminarContract['baseContracts']): Contract {
    return this.baseContracts[name];
  }

  public createLiquidityPoolContract(poolAddress: string) {
    return this.createContract(this.protocol.abis.LiquidityPoolInterface, poolAddress);
  }

  public getNetworkType = async (): Promise<string> => this.web3.eth.net.getNetworkType();
}

export default LaminarContract;
