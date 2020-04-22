import Web3 from 'web3';
import { Contract } from 'web3-eth-contract';
import { AbiItem } from 'web3-utils';
import { provider as Web3Provider } from 'web3-core';

import protocols, { TokenId, TradingPairSymbol, Protocol, ProtocolType, TradingPair } from './protocols';

export interface LaminarContractOptions {
  provider: Web3Provider;
  signer?: Web3Provider;
  protocolType?: ProtocolType;
}

interface LaminarContract {
  provider: Web3Provider;
  web3: Web3;
  protocol: Protocol;
  baseContracts: Record<'flowProtocol' | 'flowMarginProtocol' | 'oracle' | 'moneyMarket' | 'daiFaucet', Contract>;
  tokenContracts: Record<TokenId | 'iUSD', Contract>;
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

    // this.tradingPairContracts = tradingPairs.reduce((r, curr) => {
    //   r[curr.pairId] = this.createContract(abis.MarginTradingPair, curr.address);
    //   return r;
    // }, {} as Partial<LaminarContract['tradingPairContracts']>) as LaminarContract['tradingPairContracts'];
  }

  private createContract(abi: AbiItem[] | AbiItem, address: string): Contract {
    return new this.web3.eth.Contract(abi, address);
  }

  public getTradingPairs(): TradingPair[] {
    return this.protocol.tradingPairs;
  }

  public getTokenContract(tokenId: string): Contract {
    const contract = this.tokenContracts[tokenId as keyof LaminarContract['tokenContracts']];
    if (!contract) throw new Error(`token ${tokenId} is undefined`);
    return contract;
  }

  public getTradingPairContract(pairId: string, leverage: string) {
    const tradingPairs = this.getTradingPairs();
    const address = tradingPairs.find(({ pairId }) => pairId === pairId)?.addresses[leverage];
    if (!address) throw new Error(`trading pair: ${pairId}/${leverage} is undefined`);
    return this.createContract(this.protocol.abis.MarginTradingPair, address);
  }

  public getBaseContract(name: keyof LaminarContract['baseContracts']): Contract {
    return this.baseContracts[name];
  }

  public createLiquidityPoolContract(poolId: string): Contract {
    return this.createContract(this.protocol.abis.LiquidityPool, poolId);
  }

  public getNetworkType = async (): Promise<string> => this.web3.eth.net.getNetworkType();
}

export default LaminarContract;
