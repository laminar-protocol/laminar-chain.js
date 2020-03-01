import KovanERC20 from 'flow-protocol-ethereum/artifacts/kovan/abi/ERC20Detailed.json';
import KovanFaucetInterface from 'flow-protocol-ethereum/artifacts/kovan/abi/FaucetInterface.json';
import KovanFlowMarginProtocol from 'flow-protocol-ethereum/artifacts/kovan/abi/FlowMarginProtocol.json';
import KovanFlowProtocol from 'flow-protocol-ethereum/artifacts/kovan/abi/FlowProtocol.json';
import KovanFlowToken from 'flow-protocol-ethereum/artifacts/kovan/abi/FlowToken.json';
import KovanLiquidityPoolInterface from 'flow-protocol-ethereum/artifacts/kovan/abi/LiquidityPoolInterface.json';
import KovanMarginTradingPair from 'flow-protocol-ethereum/artifacts/kovan/abi/MarginTradingPair.json';
import KovanMoneyMarket from 'flow-protocol-ethereum/artifacts/kovan/abi/MoneyMarket.json';
import KovanPriceOracleInterface from 'flow-protocol-ethereum/artifacts/kovan/abi/PriceOracleInterface.json';
import KovanAddresses from 'flow-protocol-ethereum/artifacts/kovan/deployment.json';
import { AbiItem } from 'web3-utils';

export const abis = [
  'ERC20',
  'FaucetInterface',
  'FlowMarginProtocol',
  'FlowProtocol',
  'FlowToken',
  'LiquidityPoolInterface',
  'MarginTradingPair',
  'MoneyMarket',
  'PriceOracleInterface'
] as const;
export const tokenNames = ['DAI', 'fEUR', 'fJPY', 'fXAU', 'fAAPL'] as const;
export const tradingPairSymbols = [
  'l10USDEUR',
  's10USDEUR',
  'l20USDJPY',
  's20USDJPY',
  'l20USDXAU',
  's20USDXAU',
  'l5USDAAPL',
  's5USDAAPL'
] as const;

export type ProtocolType = 'kovan';

export type AbiName = typeof abis[number];

export type TokenName = typeof tokenNames[number];

export type TradingPairSymbol = typeof tradingPairSymbols[number];

export interface TradingPair {
  id: string;
  symbol: TradingPairSymbol;
  base: TokenName;
  quote: TokenName;
  leverage: number;
  address: string;
  name: string;
}

export interface Protocol {
  networkType: ProtocolType;
  abis: Record<AbiName, AbiItem[]>;
  addresses: typeof KovanAddresses;
  tradingPairs: Record<TradingPairSymbol, TradingPair>;
}

const getTradingPairs = (addresses: typeof KovanAddresses): Protocol['tradingPairs'] => ({
  l10USDEUR: {
    id: 'l10USDEUR',
    symbol: 'l10USDEUR',
    base: 'DAI',
    quote: 'fEUR',
    leverage: 10,
    address: addresses.l10USDEUR,
    name: 'USDEUR 10× Long'
  },
  s10USDEUR: {
    id: 's10USDEUR',
    symbol: 's10USDEUR',
    base: 'DAI',
    quote: 'fEUR',
    leverage: -10,
    address: addresses.s10USDEUR,
    name: 'USDEUR 10× Short'
  },
  l20USDJPY: {
    id: 'l20USDJPY',
    symbol: 'l20USDJPY',
    base: 'DAI',
    quote: 'fJPY',
    leverage: 20,
    address: addresses.l20USDJPY,
    name: 'USDJPY 20× Long'
  },
  s20USDJPY: {
    id: 's20USDJPY',
    symbol: 's20USDJPY',
    base: 'DAI',
    quote: 'fJPY',
    leverage: -20,
    address: addresses.s20USDJPY,
    name: 'USDJPY 20× Short'
  },
  l20USDXAU: {
    id: 'l20USDXAU',
    symbol: 'l20USDXAU',
    base: 'DAI',
    quote: 'fXAU',
    leverage: 20,
    address: addresses.l20USDXAU,
    name: 'XAUUSD 20× Long'
  },
  s20USDXAU: {
    id: 's20USDXAU',
    symbol: 's20USDXAU',
    base: 'DAI',
    quote: 'fXAU',
    leverage: -20,
    address: addresses.s20USDXAU,
    name: 'XAUUSD 20× Short'
  },
  l5USDAAPL: {
    id: 'l5USDAAPL',
    symbol: 'l5USDAAPL',
    base: 'DAI',
    quote: 'fAAPL',
    leverage: 5,
    address: addresses.l5USDAAPL,
    name: 'AAPL 5× Long'
  },
  s5USDAAPL: {
    id: 's5USDAAPL',
    symbol: 's5USDAAPL',
    base: 'DAI',
    quote: 'fAAPL',
    leverage: -5,
    address: addresses.s5USDAAPL,
    name: 'AAPL 5× Short'
  }
});

const kovan: Readonly<Protocol> = {
  networkType: 'kovan',
  abis: {
    ERC20: KovanERC20,
    FaucetInterface: KovanFaucetInterface,
    FlowMarginProtocol: KovanFlowMarginProtocol,
    FlowProtocol: KovanFlowProtocol,
    FlowToken: KovanFlowToken,
    LiquidityPoolInterface: KovanLiquidityPoolInterface,
    MarginTradingPair: KovanMarginTradingPair,
    MoneyMarket: KovanMoneyMarket,
    PriceOracleInterface: KovanPriceOracleInterface
  } as Protocol['abis'],
  addresses: KovanAddresses,
  tradingPairs: getTradingPairs(KovanAddresses)
};

const protocols: Record<ProtocolType, Protocol> = {
  kovan
};

export default protocols;
