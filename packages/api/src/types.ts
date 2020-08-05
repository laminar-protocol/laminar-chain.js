export type LaminarTokenNames = [
  'LAMI',
  'AUSD',
  'FEUR',
  'FJPY',
  'FBTC',
  'FETH',
  'FAUD',
  'FCAD',
  'FCHF',
  'FXAU',
  'FOIL',
  'FGBP'
];

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
  marginCall: string;
  stopOut: string;
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
  unrealizedPl: string;
  totalLeveragedPosition: string;
  accumulatedSwap: string;
  marginLevel: string;
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
  marginHeld: string;
  openAccumulatedSwapRate: string;
}

export interface TokenInfo {
  id: TokenId;
  name: string;
  symbol: string;
  precision: number;
  isBaseToken: boolean;
  isNetworkToken: boolean;
  address?: string;
}

export interface TraderPairOptions {
  bidSpread: string;
  askSpread: string;
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
  minLeveragedAmount: string;
}

export interface SyntheticPoolInfo {
  poolId: string;
  owner: string;
  balance: string;
  options: {
    additionalCollateralRatio: string | null;
    askSpread: string | null;
    bidSpread: string | null;
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
