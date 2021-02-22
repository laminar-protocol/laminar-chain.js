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
    | 'marginFlowProtocol'
    | 'marginFlowProtocolConfig'
    | 'marginFlowProtocolSafety'
    | 'marginLiquidityPoolRegistry'
    | 'syntheticFlowProtocol'
    | 'priceOracleInterface'
    | 'moneyMarket',
    Contract
  >;
  tokenIds: Record<string, string>;
  tokenContracts: Record<string, Contract>;
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
      marginLiquidityPoolRegistry: this.createContract(abis.MarginLiquidityPoolRegistry, addresses.marginPoolRegistry),
      syntheticFlowProtocol: this.createContract(abis.SyntheticFlowProtocol, addresses.syntheticProtocol),
      priceOracleInterface: this.createContract(abis.PriceOracleInterface, addresses.oracle),
      moneyMarket: this.createContract(abis.MoneyMarket, addresses.moneyMarket),
    };

    this.tokenIds = {
      DAI: addresses.baseToken,
      IUSD: addresses.iToken,
      FEUR: addresses.fEUR,
      FJPY: addresses.fJPY,
      FCAD: addresses.fCAD,
      FCHF: addresses.fCHF,
      FGBP: addresses.fGBP,
      FAUD: addresses.fAUD,
      FOIL: addresses.fUSOIL,
      FXAU: addresses.fXAU,
      FBTC: addresses.fBTC,
      FETH: addresses.fETH,
    };

    this.tokenContracts = {
      DAI: this.createContract(abis.ERC20, this.tokenIds.DAI),
      IUSD: this.createContract(abis.ERC20, this.tokenIds.IUSD),
      FEUR: this.createContract(abis.ERC20, this.tokenIds.FEUR),
      FJPY: this.createContract(abis.ERC20, this.tokenIds.FJPY),
      FCAD: this.createContract(abis.ERC20, this.tokenIds.FCAD),
      FCHF: this.createContract(abis.ERC20, this.tokenIds.FCHF),
      FGBP: this.createContract(abis.ERC20, this.tokenIds.FGBP),
      FAUD: this.createContract(abis.ERC20, this.tokenIds.FAUD),
      FOIL: this.createContract(abis.ERC20, this.tokenIds.FOIL),
      FXAU: this.createContract(abis.ERC20, this.tokenIds.FXAU),
      FBTC: this.createContract(abis.ERC20, this.tokenIds.FBTC),
      FETH: this.createContract(abis.ERC20, this.tokenIds.FETH),
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

  public getSyntheticPoolInterfaceContract(poolId: string): Contract {
    return this.createContract(this.protocol.abis.SyntheticLiquidityPoolInterface, poolId);
  }

  public getSyntheticFlowTokenContract(tokenId: string): Contract {
    return this.createContract(this.protocol.abis.SyntheticFlowToken, tokenId);
  }

  public getNetworkType = async (): Promise<string> => this.web3.eth.net.getNetworkType();
}

export default LaminarContract;
