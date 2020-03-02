import {
  TokenId as EthTokenId,
  TradingPairSymbol as EthTradingPairSymbol,
  TradingPair as EthTradingPair
} from './ethereum/protocols';

export type LaminarTokenId = 'LAMI' | 'AUSD' | 'FEUR' | 'FJPY' | 'FBTC' | 'FETH';

export type TokenId = EthTokenId | LaminarTokenId;
export type TradingPairSymbol = EthTradingPairSymbol;
export type TradingPair = EthTradingPair;

export interface PoolInfo {
  id: string;
  name: string;
  isDefault: boolean;
  address: string;
}

export interface TokenInfo {
  id: TokenId;
  name: string;
  displayName: string;
  precision: number;
  isBaseToken: boolean;
  isNetworkToken: boolean;
}

export interface PoolOptions {
  poolId: PoolInfo['id'];
  tokenId: TokenInfo['id'];
  additionalCollateralRatio: number | null;
  askSpread: number | null;
  bidSpread: number | null;
  syntheticEnabled: boolean;
}

export interface FlowApi {
  isReady(): Promise<any>;

  getBalance(address: string, tokenName: TokenId): Promise<string>;

  getPoolOptions(poolId: string, tokenName: TokenId): Promise<PoolOptions>;

  getLiquidity(poolId: string): Promise<string>;

  redeem(account: string, poolId: string, fromSymbol: string, fromAmount: string): Promise<any>;

  mint(account: string, poolId: string, toSymbol: string, fromAmount: string): Promise<any>;

  getOraclePrice(tokenName: string): Promise<string>;

  getDefaultPools(): Promise<PoolInfo[]>;

  getTokens(): Promise<TokenInfo[]>;

  getTradingPairs(): Promise<TradingPair[]>;
}
