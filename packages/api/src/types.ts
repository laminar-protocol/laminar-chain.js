import { TokenName as EthTokenName, TradingPairSymbol as EthTradingPairSymbol } from './ethereum/protocols';

export type LaminarTokenName = 'LAMI' | 'AUSD' | 'FEUR' | 'FJPY' | 'FBTC' | 'FETH';

export type TokenName = EthTokenName | LaminarTokenName;
export type TradingPairSymbol = EthTradingPairSymbol;

export interface PoolInfo {
  id: string;
  name: string;
  address: string;
}

export interface TokenInfo {
  name: string;
  displayName: string;
  precision: number;
  isBaseToken: boolean;
  isNetworkToken: boolean;
  id: string;
}

export interface PoolOptions {
  additionalCollateralRatio: number | null;
  askSpread: number | null;
  bidSpread: number | null;
}

export interface FlowApi {
  getBalance(address: string, tokenName: TokenName): Promise<string>;

  getPoolOptions(poolId: string, tokenName: TokenName): Promise<PoolOptions>;

  getTokenLiquidity(poolAddr: string, tokenName: TokenName): Promise<string>;

  redeem(account: string, poolId: string, fromSymbol: string, fromAmount: string): Promise<any>;

  mint(account: string, poolId: string, toSymbol: string, fromAmount: string): Promise<any>;

  getOraclePrice(tokenName: string): Promise<string>;

  getPools(): Promise<PoolInfo[]>;

  getTokens(): Promise<TokenInfo[]>;
}
