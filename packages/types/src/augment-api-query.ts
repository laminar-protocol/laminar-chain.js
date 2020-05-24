// Auto-generated via `yarn polkadot-types-from-chain`, do not edit
/* eslint-disable */

import { AnyNumber, ITuple, Observable } from '@polkadot/types/types';
import { Option, Vec } from '@polkadot/types/codec';
import { bool, u32 } from '@polkadot/types/primitive';
import { AccountId, AccumulateConfig, Balance, CurrencyId, Fixed128, LiquidityPoolId, MarginLiquidityPoolOption, MarginPosition, OracleKey, OrderedSet, Permill, PositionId, RiskThreshold, SwapRate, SyntheticLiquidityPoolOption, SyntheticPosition, TradingPair } from '@laminar/types/interfaces/runtime';
import { TimestampedValueOf } from '@open-web3/orml-types/interfaces/oracle';
import { AccountData, BalanceLock } from '@polkadot/types/interfaces/balances';
import { AuthorityId } from '@polkadot/types/interfaces/consensus';
import { ApiTypes } from '@polkadot/api/types';

declare module '@polkadot/api/types/storage' {
  export interface AugmentedQueries<ApiType> {
    baseLiquidityPoolsForMargin: {
      [index: string]: QueryableStorageEntry<ApiType>;
      balances: AugmentedQuery<ApiType, (arg: LiquidityPoolId | AnyNumber | Uint8Array) => Observable<Balance>> & QueryableStorageEntry<ApiType>;
      nextPoolId: AugmentedQuery<ApiType, () => Observable<LiquidityPoolId>> & QueryableStorageEntry<ApiType>;
      owners: AugmentedQuery<ApiType, (arg: LiquidityPoolId | AnyNumber | Uint8Array) => Observable<Option<ITuple<[AccountId, LiquidityPoolId]>>>> & QueryableStorageEntry<ApiType>;
    };
    baseLiquidityPoolsForSynthetic: {
      [index: string]: QueryableStorageEntry<ApiType>;
      balances: AugmentedQuery<ApiType, (arg: LiquidityPoolId | AnyNumber | Uint8Array) => Observable<Balance>> & QueryableStorageEntry<ApiType>;
      nextPoolId: AugmentedQuery<ApiType, () => Observable<LiquidityPoolId>> & QueryableStorageEntry<ApiType>;
      owners: AugmentedQuery<ApiType, (arg: LiquidityPoolId | AnyNumber | Uint8Array) => Observable<Option<ITuple<[AccountId, LiquidityPoolId]>>>> & QueryableStorageEntry<ApiType>;
    };
    marginLiquidityPools: {
      [index: string]: QueryableStorageEntry<ApiType>;
      accumulatedSwapRates: AugmentedQueryDoubleMap<ApiType, (key1: LiquidityPoolId | AnyNumber | Uint8Array, key2: TradingPair | { base?: any; quote?: any } | string | Uint8Array) => Observable<SwapRate>> & QueryableStorageEntry<ApiType>;
      accumulates: AugmentedQuery<ApiType, (arg: TradingPair | { base?: any; quote?: any } | string | Uint8Array) => Observable<Option<ITuple<[AccumulateConfig, TradingPair]>>>> & QueryableStorageEntry<ApiType>;
      additionalSwapRate: AugmentedQuery<ApiType, (arg: LiquidityPoolId | AnyNumber | Uint8Array) => Observable<Option<Fixed128>>> & QueryableStorageEntry<ApiType>;
      defaultMinLeveragedAmount: AugmentedQuery<ApiType, () => Observable<Balance>> & QueryableStorageEntry<ApiType>;
      enabledTradingPairs: AugmentedQuery<ApiType, (arg: TradingPair | { base?: any; quote?: any } | string | Uint8Array) => Observable<Option<bool>>> & QueryableStorageEntry<ApiType>;
      liquidityPoolEnabledTradingPairs: AugmentedQueryDoubleMap<ApiType, (key1: LiquidityPoolId | AnyNumber | Uint8Array, key2: TradingPair | { base?: any; quote?: any } | string | Uint8Array) => Observable<Option<bool>>> & QueryableStorageEntry<ApiType>;
      liquidityPoolOptions: AugmentedQueryDoubleMap<ApiType, (key1: LiquidityPoolId | AnyNumber | Uint8Array, key2: TradingPair | { base?: any; quote?: any } | string | Uint8Array) => Observable<Option<MarginLiquidityPoolOption>>> & QueryableStorageEntry<ApiType>;
      maxSpread: AugmentedQuery<ApiType, (arg: TradingPair | { base?: any; quote?: any } | string | Uint8Array) => Observable<Option<Balance>>> & QueryableStorageEntry<ApiType>;
      minLeveragedAmount: AugmentedQuery<ApiType, (arg: LiquidityPoolId | AnyNumber | Uint8Array) => Observable<Option<Balance>>> & QueryableStorageEntry<ApiType>;
      swapRates: AugmentedQuery<ApiType, (arg: TradingPair | { base?: any; quote?: any } | string | Uint8Array) => Observable<Option<SwapRate>>> & QueryableStorageEntry<ApiType>;
    };
    marginProtocol: {
      [index: string]: QueryableStorageEntry<ApiType>;
      balances: AugmentedQueryDoubleMap<ApiType, (key1: AccountId | string | Uint8Array, key2: LiquidityPoolId | AnyNumber | Uint8Array) => Observable<Fixed128>> & QueryableStorageEntry<ApiType>;
      liquidityPoolEllThreshold: AugmentedQuery<ApiType, (arg: TradingPair | { base?: any; quote?: any } | string | Uint8Array) => Observable<Option<RiskThreshold>>> & QueryableStorageEntry<ApiType>;
      liquidityPoolEnpThreshold: AugmentedQuery<ApiType, (arg: TradingPair | { base?: any; quote?: any } | string | Uint8Array) => Observable<Option<RiskThreshold>>> & QueryableStorageEntry<ApiType>;
      marginCalledPools: AugmentedQuery<ApiType, (arg: LiquidityPoolId | AnyNumber | Uint8Array) => Observable<Option<bool>>> & QueryableStorageEntry<ApiType>;
      marginCalledTraders: AugmentedQueryDoubleMap<ApiType, (key1: AccountId | string | Uint8Array, key2: LiquidityPoolId | AnyNumber | Uint8Array) => Observable<Option<bool>>> & QueryableStorageEntry<ApiType>;
      nextPositionId: AugmentedQuery<ApiType, () => Observable<PositionId>> & QueryableStorageEntry<ApiType>;
      positions: AugmentedQuery<ApiType, (arg: PositionId | AnyNumber | Uint8Array) => Observable<Option<MarginPosition>>> & QueryableStorageEntry<ApiType>;
      positionsByPool: AugmentedQueryDoubleMap<ApiType, (key1: LiquidityPoolId | AnyNumber | Uint8Array, key2: ITuple<[TradingPair, PositionId]> | [TradingPair | { base?: any; quote?: any } | string | Uint8Array, PositionId | AnyNumber | Uint8Array]) => Observable<Option<bool>>> & QueryableStorageEntry<ApiType>;
      positionsByTrader: AugmentedQueryDoubleMap<ApiType, (key1: AccountId | string | Uint8Array, key2: ITuple<[LiquidityPoolId, PositionId]> | [LiquidityPoolId | AnyNumber | Uint8Array, PositionId | AnyNumber | Uint8Array]) => Observable<Option<bool>>> & QueryableStorageEntry<ApiType>;
      traderRiskThreshold: AugmentedQuery<ApiType, (arg: TradingPair | { base?: any; quote?: any } | string | Uint8Array) => Observable<Option<RiskThreshold>>> & QueryableStorageEntry<ApiType>;
    };
    oracle: {
      [index: string]: QueryableStorageEntry<ApiType>;
      /**
       * If an oracle operator has feed a value in this block
       **/
      hasDispatched: AugmentedQuery<ApiType, () => Observable<OrderedSet>> & QueryableStorageEntry<ApiType>;
      /**
       * True if Self::values(key) is up to date, otherwise the value is stale
       **/
      isUpdated: AugmentedQuery<ApiType, (arg: OracleKey | 'LAMI'|'AUSD'|'FEUR'|'FJPY'|'FBTC'|'FETH'|'FAUD'|'FCAD'|'FCHF'|'FXAU'|'FOIL' | number | Uint8Array) => Observable<bool>> & QueryableStorageEntry<ApiType>;
      /**
       * The current members of the collective. This is stored sorted (just by value).
       **/
      members: AugmentedQuery<ApiType, () => Observable<OrderedSet>> & QueryableStorageEntry<ApiType>;
      nonces: AugmentedQuery<ApiType, (arg: AccountId | string | Uint8Array) => Observable<u32>> & QueryableStorageEntry<ApiType>;
      /**
       * Raw values for each oracle operators
       **/
      rawValues: AugmentedQueryDoubleMap<ApiType, (key1: AccountId | string | Uint8Array, key2: OracleKey | 'LAMI'|'AUSD'|'FEUR'|'FJPY'|'FBTC'|'FETH'|'FAUD'|'FCAD'|'FCHF'|'FXAU'|'FOIL' | number | Uint8Array) => Observable<Option<TimestampedValueOf>>> & QueryableStorageEntry<ApiType>;
      /**
       * Session key for oracle operators
       **/
      sessionKeys: AugmentedQuery<ApiType, (arg: AccountId | string | Uint8Array) => Observable<Option<AuthorityId>>> & QueryableStorageEntry<ApiType>;
      /**
       * Combined value, may not be up to date
       **/
      values: AugmentedQuery<ApiType, (arg: OracleKey | 'LAMI'|'AUSD'|'FEUR'|'FJPY'|'FBTC'|'FETH'|'FAUD'|'FCAD'|'FCHF'|'FXAU'|'FOIL' | number | Uint8Array) => Observable<Option<TimestampedValueOf>>> & QueryableStorageEntry<ApiType>;
    };
    syntheticLiquidityPools: {
      [index: string]: QueryableStorageEntry<ApiType>;
      liquidityPoolOptions: AugmentedQueryDoubleMap<ApiType, (key1: LiquidityPoolId | AnyNumber | Uint8Array, key2: CurrencyId | 'LAMI'|'AUSD'|'FEUR'|'FJPY'|'FBTC'|'FETH'|'FAUD'|'FCAD'|'FCHF'|'FXAU'|'FOIL' | number | Uint8Array) => Observable<Option<SyntheticLiquidityPoolOption>>> & QueryableStorageEntry<ApiType>;
      maxSpread: AugmentedQuery<ApiType, (arg: CurrencyId | 'LAMI'|'AUSD'|'FEUR'|'FJPY'|'FBTC'|'FETH'|'FAUD'|'FCAD'|'FCHF'|'FXAU'|'FOIL' | number | Uint8Array) => Observable<Balance>> & QueryableStorageEntry<ApiType>;
      minAdditionalCollateralRatio: AugmentedQuery<ApiType, () => Observable<Permill>> & QueryableStorageEntry<ApiType>;
    };
    syntheticTokens: {
      [index: string]: QueryableStorageEntry<ApiType>;
      collateralRatio: AugmentedQuery<ApiType, (arg: CurrencyId | 'LAMI'|'AUSD'|'FEUR'|'FJPY'|'FBTC'|'FETH'|'FAUD'|'FCAD'|'FCHF'|'FXAU'|'FOIL' | number | Uint8Array) => Observable<Option<Permill>>> & QueryableStorageEntry<ApiType>;
      extremeRatio: AugmentedQuery<ApiType, (arg: CurrencyId | 'LAMI'|'AUSD'|'FEUR'|'FJPY'|'FBTC'|'FETH'|'FAUD'|'FCAD'|'FCHF'|'FXAU'|'FOIL' | number | Uint8Array) => Observable<Option<Permill>>> & QueryableStorageEntry<ApiType>;
      liquidationRatio: AugmentedQuery<ApiType, (arg: CurrencyId | 'LAMI'|'AUSD'|'FEUR'|'FJPY'|'FBTC'|'FETH'|'FAUD'|'FCAD'|'FCHF'|'FXAU'|'FOIL' | number | Uint8Array) => Observable<Option<Permill>>> & QueryableStorageEntry<ApiType>;
      positions: AugmentedQueryDoubleMap<ApiType, (key1: LiquidityPoolId | AnyNumber | Uint8Array, key2: CurrencyId | 'LAMI'|'AUSD'|'FEUR'|'FJPY'|'FBTC'|'FETH'|'FAUD'|'FCAD'|'FCHF'|'FXAU'|'FOIL' | number | Uint8Array) => Observable<SyntheticPosition>> & QueryableStorageEntry<ApiType>;
    };
    tokens: {
      [index: string]: QueryableStorageEntry<ApiType>;
      /**
       * The balance of a token type under an account.
       * 
       * NOTE: If the total is ever zero, decrease account ref account.
       * 
       * NOTE: This is only used in the case that this module is used to store balances.
       **/
      accounts: AugmentedQueryDoubleMap<ApiType, (key1: CurrencyId | 'LAMI'|'AUSD'|'FEUR'|'FJPY'|'FBTC'|'FETH'|'FAUD'|'FCAD'|'FCHF'|'FXAU'|'FOIL' | number | Uint8Array, key2: AccountId | string | Uint8Array) => Observable<AccountData>> & QueryableStorageEntry<ApiType>;
      /**
       * Any liquidity locks of a token type under an account.
       * NOTE: Should only be accessed when setting, changing and freeing a lock.
       **/
      locks: AugmentedQueryDoubleMap<ApiType, (key1: CurrencyId | 'LAMI'|'AUSD'|'FEUR'|'FJPY'|'FBTC'|'FETH'|'FAUD'|'FCAD'|'FCHF'|'FXAU'|'FOIL' | number | Uint8Array, key2: AccountId | string | Uint8Array) => Observable<Vec<BalanceLock>>> & QueryableStorageEntry<ApiType>;
      /**
       * The total issuance of a token type.
       **/
      totalIssuance: AugmentedQuery<ApiType, (arg: CurrencyId | 'LAMI'|'AUSD'|'FEUR'|'FJPY'|'FBTC'|'FETH'|'FAUD'|'FCAD'|'FCHF'|'FXAU'|'FOIL' | number | Uint8Array) => Observable<Balance>> & QueryableStorageEntry<ApiType>;
    };
  }

  export interface QueryableStorage<ApiType extends ApiTypes> extends AugmentedQueries<ApiType> {
    [index: string]: QueryableModuleStorage<ApiType>;
  }
}
