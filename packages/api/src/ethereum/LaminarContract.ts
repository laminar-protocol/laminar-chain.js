import Web3 from 'web3';
import { provider as Web3Provider } from 'web3-core';
import { Contract } from 'web3-eth-contract';
import { AbiItem } from 'web3-utils';

import protocols, { Protocol, ProtocolType } from './protocols';

export interface LaminarContractOptions {
  provider: Web3Provider;
  signer?: Web3Provider;
  protocolType?: ProtocolType;
}

interface LaminarContract {
  provider: Web3Provider;
  web3: Web3;
  protocol: Protocol;
  baseContracts: Record<
    'marginFlowProtocol' | 'marginFlowProtocolConfig' | 'marginFlowProtocolSafety' | 'syntheticFlowProtocol',
    Contract
  >;
  tokenContracts: Record<string | 'iUSD', Contract>;
  baseTokenContracts: Contract;
}

class LaminarContract implements LaminarContract {
  constructor({ provider, protocolType = 'kovan' }: LaminarContractOptions) {
    this.protocol = protocols[protocolType];
    this.provider = provider;
    this.web3 = new Web3(this.provider);

    const abis = this.protocol.abis;
    const addresses = this.protocol.addresses;

    this.baseContracts = {
      marginFlowProtocol: this.createContract(abis.MarginFlowProtocol, addresses.marginProtocol),
      marginFlowProtocolConfig: this.createContract(abis.MarginFlowProtocolConfig, addresses.marginProtocolConfig),
      marginFlowProtocolSafety: this.createContract(abis.MarginFlowProtocolSafety, addresses.marginProtocolSafety),
      syntheticFlowProtocol: this.createContract(abis.SyntheticFlowProtocol, addresses.syntheticProtocol)
    };

    this.tokenContracts = {
      DAI: this.createContract(abis.ERC20, addresses.baseToken),
      iUSD: this.createContract(abis.ERC20, addresses.iToken),
      fEUR: this.createContract(abis.ERC20, addresses.fEUR),
      fJPY: this.createContract(abis.ERC20, addresses.fJPY),
      fAAPL: this.createContract(abis.ERC20, addresses.fAAPL),
      fXAU: this.createContract(abis.ERC20, addresses.fXAU)
    };

    this.baseTokenContracts = this.tokenContracts.DAI;
  }

  public createContract(abi: AbiItem[] | AbiItem, address: string): Contract {
    return new this.web3.eth.Contract(abi, address);
  }

  public getTokenContract(tokenId: string): Contract {
    return this.createContract(this.protocol.abis.ERC20, tokenId);
  }

  public getBaseContract(name: keyof LaminarContract['baseContracts']): Contract {
    return this.baseContracts[name];
  }

  public getMarginPoolInterfaceContract(poolId: string): Contract {
    return this.createContract(this.protocol.abis.MarginLiquidityPoolInterface, poolId);
  }

  public getMarginPoolRegistryContract(poolId: string): Contract {
    return this.createContract(this.protocol.abis.MarginLiquidityPoolRegistry, poolId);
  }

  public getSyntheticPoolInterfaceContract(poolId: string): Contract {
    return this.createContract(this.protocol.abis.SyntheticLiquidityPoolInterface, poolId);
  }

  public getNetworkType = async (): Promise<string> => this.web3.eth.net.getNetworkType();
}

export default LaminarContract;
