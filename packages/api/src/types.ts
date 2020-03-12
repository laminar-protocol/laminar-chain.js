import BN from 'bn.js';

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
  owner: string;
}

export interface TokenInfo {
  id: TokenId;
  name: string;
  displayName: string;
  precision: number;
  isBaseToken: boolean;
  isNetworkToken: boolean;
  address?: string;
}

export interface PoolOptions {
  poolId: PoolInfo['id'];
  tokenId: TokenInfo['id'];
  additionalCollateralRatio: number | null;
  askSpread: number | null;
  bidSpread: number | null;
  syntheticEnabled: boolean;
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

  getTradingPairs(): Promise<TradingPair[]>;
}
