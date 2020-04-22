import { AbiItem } from 'web3-utils';

import KovanERC20 from 'flow-protocol-ethereum/artifacts/kovan/abi/ERC20Detailed.json';
import KovanFaucetInterface from 'flow-protocol-ethereum/artifacts/kovan/abi/FaucetInterface.json';
import KovanFlowMarginProtocol from 'flow-protocol-ethereum/artifacts/kovan/abi/FlowMarginProtocol.json';
import KovanFlowProtocol from 'flow-protocol-ethereum/artifacts/kovan/abi/FlowProtocol.json';
import KovanFlowToken from 'flow-protocol-ethereum/artifacts/kovan/abi/FlowToken.json';
import KovanLiquidityPool from 'flow-protocol-ethereum/artifacts/kovan/abi/LiquidityPool.json';
import KovanLiquidityPoolInterface from 'flow-protocol-ethereum/artifacts/kovan/abi/LiquidityPoolInterface.json';
import KovanMarginTradingPair from 'flow-protocol-ethereum/artifacts/kovan/abi/MarginTradingPair.json';
import KovanMoneyMarket from 'flow-protocol-ethereum/artifacts/kovan/abi/MoneyMarket.json';
import KovanPriceOracleInterface from 'flow-protocol-ethereum/artifacts/kovan/abi/PriceOracleInterface.json';
import KovanSimplePriceOracle from 'flow-protocol-ethereum/artifacts/kovan/abi/SimplePriceOracle.json';
import KovanAddresses from 'flow-protocol-ethereum/artifacts/kovan/deployment.json';

export const abis = [
  'ERC20',
  'FaucetInterface',
  'FlowMarginProtocol',
  'FlowProtocol',
  'FlowToken',
  'LiquidityPoolInterface',
  'LiquidityPool',
  'MarginTradingPair',
  'MoneyMarket',
  'PriceOracleInterface',
  'SimplePriceOracle'
] as const;
export const tokenId = ['DAI', 'fEUR', 'fJPY', 'fXAU', 'fAAPL'] as const;
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

export type TokenId = typeof tokenId[number];

export type TradingPairSymbol = typeof tradingPairSymbols[number];

export interface TradingPair {
  pair: {
    base: TokenId;
    quote: TokenId;
  };
  pairId: string;
  enabledTrades: string[];
  addresses: Record<string, string>;
}

export interface Protocol {
  networkType: ProtocolType;
  abis: Record<AbiName, AbiItem[]>;
  addresses: typeof KovanAddresses;
  tradingPairs: TradingPair[];
}

const getTradingPairs = (addresses: typeof KovanAddresses): Protocol['tradingPairs'] => [
  {
    pairId: 'USDEUR',
    pair: {
      base: 'DAI',
      quote: 'fEUR'
    },
    enabledTrades: ['LongTen', 'ShortTen'],
    addresses: {
      LongTen: addresses.l10USDEUR,
      ShortTen: addresses.s10USDEUR
    }
  },
  {
    pair: {
      base: 'DAI',
      quote: 'fJPY'
    },
    pairId: 'USDJPY',
    enabledTrades: ['LongTwenty', 'ShortTwenty'],
    addresses: {
      LongTwenty: addresses.l20USDJPY,
      ShortTwenty: addresses.s20USDJPY
    }
  },
  {
    pair: {
      base: 'DAI',
      quote: 'fXAU'
    },
    pairId: 'USDXAU',
    enabledTrades: ['LongTwenty', 'ShortTwenty'],
    addresses: {
      LongTwenty: addresses.l20USDXAU,
      ShortTwenty: addresses.s20USDXAU
    }
  },
  {
    pair: {
      base: 'DAI',
      quote: 'fAAPL'
    },
    pairId: 'USDAAPL',
    enabledTrades: ['LongFive', 'ShortFive'],
    addresses: {
      LongFive: addresses.l5USDAAPL,
      ShortFive: addresses.s5USDAAPL
    }
  }
];

const kovan: Readonly<Protocol> = {
  networkType: 'kovan',
  abis: {
    ERC20: KovanERC20,
    FaucetInterface: KovanFaucetInterface,
    FlowMarginProtocol: KovanFlowMarginProtocol,
    FlowProtocol: KovanFlowProtocol,
    FlowToken: KovanFlowToken,
    LiquidityPoolInterface: KovanLiquidityPoolInterface,
    LiquidityPool: KovanLiquidityPool,
    MarginTradingPair: KovanMarginTradingPair,
    MoneyMarket: KovanMoneyMarket,
    PriceOracleInterface: KovanPriceOracleInterface,
    SimplePriceOracle: KovanSimplePriceOracle
  } as Protocol['abis'],
  addresses: KovanAddresses,
  tradingPairs: getTradingPairs(KovanAddresses)
};

const protocols: Record<ProtocolType, Protocol> = {
  kovan
};

export default protocols;
