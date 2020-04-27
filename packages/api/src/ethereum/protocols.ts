import { AbiItem } from 'web3-utils';

import KovanERC20 from 'flow-protocol-ethereum/artifacts/kovan/abi/ERC20Detailed.json';
import KovanFaucetInterface from 'flow-protocol-ethereum/artifacts/kovan/abi/FaucetInterface.json';
import KovanMarginFlowProtocol from 'flow-protocol-ethereum/artifacts/kovan/abi/MarginFlowProtocol.json';
import KovanMarginFlowProtocolSafety from 'flow-protocol-ethereum/artifacts/kovan/abi/MarginFlowProtocolSafety.json';
import KovanMarginLiquidityPoolInterface from 'flow-protocol-ethereum/artifacts/kovan/abi/MarginLiquidityPoolInterface.json';
import KovanMarginLiquidityPoolRegistry from 'flow-protocol-ethereum/artifacts/kovan/abi/MarginLiquidityPoolRegistry.json';
import KovanMoneyMarket from 'flow-protocol-ethereum/artifacts/kovan/abi/MoneyMarket.json';
import KovanPriceOracleInterface from 'flow-protocol-ethereum/artifacts/kovan/abi/PriceOracleInterface.json';
import KovanSimplePriceOracle from 'flow-protocol-ethereum/artifacts/kovan/abi/SimplePriceOracle.json';
import KovanSyntheticFlowProtocol from 'flow-protocol-ethereum/artifacts/kovan/abi/SyntheticFlowProtocol.json';
import KovanSyntheticFlowToken from 'flow-protocol-ethereum/artifacts/kovan/abi/SyntheticFlowToken.json';
import KovanSyntheticLiquidityPoolInterface from 'flow-protocol-ethereum/artifacts/kovan/abi/SyntheticLiquidityPoolInterface.json';

import KovanAddresses from 'flow-protocol-ethereum/artifacts/kovan/deployment.json';

export const abis = [
  'ERC20',
  'FaucetInterface',
  'MarginFlowProtocol',
  'MarginFlowProtocolSafety',
  'MarginLiquidityPoolInterface',
  'MarginLiquidityPoolRegistry',
  'MoneyMarket',
  'PriceOracleInterface',
  'SimplePriceOracle',
  'SyntheticFlowProtocol',
  'SyntheticFlowToken',
  'SyntheticLiquidityPoolInterface'
] as const;

export const tokenName = ['DAI', 'fEUR', 'fJPY', 'fXAU', 'fAAPL'] as const;

export type ProtocolType = 'kovan';

export type AbiName = typeof abis[number];

export type TokenName = typeof tokenName[number];

export interface Protocol {
  networkType: ProtocolType;
  abis: Record<AbiName, AbiItem[]>;
  addresses: typeof KovanAddresses;
}

const kovan: Readonly<Protocol> = {
  networkType: 'kovan',
  abis: {
    ERC20: KovanERC20,
    FaucetInterface: KovanFaucetInterface,
    MarginFlowProtocol: KovanMarginFlowProtocol,
    MarginFlowProtocolSafety: KovanMarginFlowProtocolSafety,
    MarginLiquidityPoolInterface: KovanMarginLiquidityPoolInterface,
    MarginLiquidityPoolRegistry: KovanMarginLiquidityPoolRegistry,
    MoneyMarket: KovanMoneyMarket,
    PriceOracleInterface: KovanPriceOracleInterface,
    SimplePriceOracle: KovanSimplePriceOracle,
    SyntheticFlowProtocol: KovanSyntheticFlowProtocol,
    SyntheticFlowToken: KovanSyntheticFlowToken,
    SyntheticLiquidityPoolInterface: KovanSyntheticLiquidityPoolInterface
  } as Protocol['abis'],
  addresses: KovanAddresses
};

const protocols: Record<ProtocolType, Protocol> = {
  kovan
};

export default protocols;
