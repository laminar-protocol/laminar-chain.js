import BN from 'bn.js';
import { TokenNames as EthTokenNames } from './ethereum/protocols';

export type LaminarTokenNames = ['LAMI', 'AUSD', 'FEUR', 'FJPY', 'FBTC', 'FETH'];

export type TokenId = string | LaminarTokenNames[number];

export type TradingPair = {
  base: TokenId;
  quote: TokenId;
};

export type LeverageEnum = [
  'LongTwo',
  'LongThree',
  'LongFive',
  'LongTen',
  'LongTwenty',
  'LongThirty',
  'LongFifty',
  'LongReserved',
  'ShortTwo',
  'ShortThree',
  'ShortFive',
  'ShortTen',
  'ShortTwenty',
  'ShortThirty',
  'ShortFifty',
  'ShortReserved'
][number];

export type Threshold = {
  marginCall: number;
  stopOut: number;
};

export interface PoolInfo {
  id: string;
  name: string;
  isDefault: boolean;
  owner: string;
}

export interface MarginInfo {
  ellThreshold: Threshold;
  enpThreshold: Threshold;
}

export interface TraderInfo {
  equity: string;
  balance: string;
  freeMargin: string;
  marginHeld: string;
  marginLevel: string;
  unrealizedPl: string;
  totalLeveragedPosition: string;
  accumulatedSwap: string;
}

export interface AccumulatedSwapRate {
  poolId: string;
  pair: {
    base: string;
    quote: string;
  };
  pairId: string;
  long: string;
  short: string;
}

export interface MarginPosition {
  owner: string;
  poolId: string;
  pair: {
    base: string;
    quote: string;
  };
  leverage: string;
  leveragedHeld: string;
  leveragedDebits: string;
  leveragedDebitsInUsd: string;
  openAccumulatedSwapRate: string;
  marginHeld: string;
}

export interface TokenInfo {
  id: TokenId;
  name: typeof EthTokenNames[number] | LaminarTokenNames[number];
  displayName: string;
  precision: number;
  isBaseToken: boolean;
  isNetworkToken: boolean;
  address?: string;
}

export interface PoolOptions {
  poolId: string;
  tokenId: string;
  additionalCollateralRatio: number | null;
  askSpread: number | null;
  bidSpread: number | null;
  syntheticEnabled: boolean;
}

export interface TraderPairOptions {
  bidSpread: number;
  askSpread: number;
  enabledTrades: string[];
  pair: {
    base: TokenId;
    quote: TokenId;
  };
  pairId: string;
}

export interface MarginPoolInfo {
  poolId: string;
  owner: string;
  balance: string;
  ell: string;
  enp: string;
  options: TraderPairOptions[];
}

export interface SyntheticPoolInfo {
  poolId: string;
  owner: string;
  balance: string;
  options: {
    additionalCollateralRatio: number | null;
    askSpread: number | null;
    bidSpread: number | null;
    tokenId: TokenId;
  }[];
}

export type ChainType = 'ethereum' | 'laminar';

export interface ActionStatus {
  account: string;
  action: string;
  txHash?: string;
  blockHash?: string;
  message?: string;
  data?: any;
  status: 'error' | 'event' | 'queued' | 'success';
}

export interface OracleValue {
  tokenId: TokenId;
  timestamp: number;
  value: string;
}

export interface TokenBalance {
  tokenId: TokenId;
  free: string;
}

export interface FlowApi {
  chainType: ChainType;

  isReady(): Promise<void>;

  getBalance(address: string, tokenName: TokenId): Promise<string>;

  getPoolOptions(poolId: string, tokenName: TokenId): Promise<PoolOptions>;

  getPoolOwner(poolId: string): Promise<PoolInfo['owner'] | null>;

  getLiquidity(poolId: string): Promise<string>;

  redeem(account: string, poolId: string, fromSymbol: string, fromAmount: string | BN): Promise<ActionStatus>;

  mint(account: string, poolId: string, toSymbol: string, fromAmount: string | BN): Promise<ActionStatus>;

  depositLiquidity(account: string, poolId: string, amount: string | BN): Promise<ActionStatus>;

  withdrawLiquidity(account: string, poolId: string, amount: string | BN): Promise<ActionStatus>;

  createPool(account: string): Promise<ActionStatus>;

  getOraclePrice(tokenName: string): Promise<string>;

  getDefaultPools(): Promise<PoolInfo[]>;

  getTokens(): Promise<TokenInfo[]>;
}
