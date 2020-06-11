// Auto-generated via `yarn polkadot-types-from-chain`, do not edit
/* eslint-disable */

import { AnyNumber, ITuple, Observable } from '@polkadot/types/types';
import { Option, Vec } from '@polkadot/types/codec';
import { bool, u32 } from '@polkadot/types/primitive';
import { AccountId, Balance, CurrencyId, DepositBalanceOf, FixedI128, LiquidityPoolId, MarginPoolOption, MarginPoolTradingPairOption, MarginPosition, MarginTradingPairOption, Moment, OracleKey, Permill, Pool, PoolTraderInfo, PositionId, SwapRate, SyntheticPoolCurrencyOption, SyntheticPosition, SyntheticTokensRatio, TradingPair, TradingPairRiskThreshold } from '@laminar/types/interfaces/runtime';
import { OrderedSet, TimestampedValueOf } from '@open-web3/orml-types/interfaces/oracle';
import { AccountData, BalanceLock } from '@polkadot/types/interfaces/balances';
import { AuthorityId } from '@polkadot/types/interfaces/consensus';
import { IdentityInfo } from '@polkadot/types/interfaces/identity';
import { ApiTypes } from '@polkadot/api/types';

declare module '@polkadot/api/types/storage' {
  export interface AugmentedQueries<ApiType> {
    baseLiquidityPoolsForMargin: {
      [index: string]: QueryableStorageEntry<ApiType>;
      /**
       * Store identity info of liquidity pool LiquidityPoolId => Option<(IdentityInfo, DepositAmount, VerifyStatus)>
       **/
      identityInfos: AugmentedQuery<ApiType, (arg: LiquidityPoolId | AnyNumber | Uint8Array) => Observable<Option<ITuple<[IdentityInfo, DepositBalanceOf, bool]>>>> & QueryableStorageEntry<ApiType>;
      nextPoolId: AugmentedQuery<ApiType, () => Observable<LiquidityPoolId>> & QueryableStorageEntry<ApiType>;
      pools: AugmentedQuery<ApiType, (arg: LiquidityPoolId | AnyNumber | Uint8Array) => Observable<Option<Pool>>> & QueryableStorageEntry<ApiType>;
    };
    baseLiquidityPoolsForSynthetic: {
      [index: string]: QueryableStorageEntry<ApiType>;
      /**
       * Store identity info of liquidity pool LiquidityPoolId => Option<(IdentityInfo, DepositAmount, VerifyStatus)>
       **/
      identityInfos: AugmentedQuery<ApiType, (arg: LiquidityPoolId | AnyNumber | Uint8Array) => Observable<Option<ITuple<[IdentityInfo, DepositBalanceOf, bool]>>>> & QueryableStorageEntry<ApiType>;
      nextPoolId: AugmentedQuery<ApiType, () => Observable<LiquidityPoolId>> & QueryableStorageEntry<ApiType>;
      pools: AugmentedQuery<ApiType, (arg: LiquidityPoolId | AnyNumber | Uint8Array) => Observable<Option<Pool>>> & QueryableStorageEntry<ApiType>;
    };
    marginLiquidityPools: {
      [index: string]: QueryableStorageEntry<ApiType>;
      accumulatedSwapRates: AugmentedQueryDoubleMap<ApiType, (key1: LiquidityPoolId | AnyNumber | Uint8Array, key2: TradingPair | { base?: any; quote?: any } | string | Uint8Array) => Observable<SwapRate>> & QueryableStorageEntry<ApiType>;
      defaultMinLeveragedAmount: AugmentedQuery<ApiType, () => Observable<Balance>> & QueryableStorageEntry<ApiType>;
      lastAccumulateTime: AugmentedQuery<ApiType, () => Observable<Moment>> & QueryableStorageEntry<ApiType>;
      poolOptions: AugmentedQuery<ApiType, (arg: LiquidityPoolId | AnyNumber | Uint8Array) => Observable<MarginPoolOption>> & QueryableStorageEntry<ApiType>;
      poolTradingPairOptions: AugmentedQueryDoubleMap<ApiType, (key1: LiquidityPoolId | AnyNumber | Uint8Array, key2: TradingPair | { base?: any; quote?: any } | string | Uint8Array) => Observable<MarginPoolTradingPairOption>> & QueryableStorageEntry<ApiType>;
      tradingPairOptions: AugmentedQuery<ApiType, (arg: TradingPair | { base?: any; quote?: any } | string | Uint8Array) => Observable<MarginTradingPairOption>> & QueryableStorageEntry<ApiType>;
    };
    marginProtocol: {
      [index: string]: QueryableStorageEntry<ApiType>;
      balances: AugmentedQueryDoubleMap<ApiType, (key1: AccountId | string | Uint8Array, key2: LiquidityPoolId | AnyNumber | Uint8Array) => Observable<FixedI128>> & QueryableStorageEntry<ApiType>;
      marginCalledPools: AugmentedQuery<ApiType, (arg: LiquidityPoolId | AnyNumber | Uint8Array) => Observable<Option<bool>>> & QueryableStorageEntry<ApiType>;
      marginCalledTraders: AugmentedQueryDoubleMap<ApiType, (key1: AccountId | string | Uint8Array, key2: LiquidityPoolId | AnyNumber | Uint8Array) => Observable<Option<bool>>> & QueryableStorageEntry<ApiType>;
      nextPositionId: AugmentedQuery<ApiType, () => Observable<PositionId>> & QueryableStorageEntry<ApiType>;
      poolTraderInfos: AugmentedQueryDoubleMap<ApiType, (key1: LiquidityPoolId | AnyNumber | Uint8Array, key2: TradingPair | { base?: any; quote?: any } | string | Uint8Array) => Observable<PoolTraderInfo>> & QueryableStorageEntry<ApiType>;
      positions: AugmentedQuery<ApiType, (arg: PositionId | AnyNumber | Uint8Array) => Observable<Option<MarginPosition>>> & QueryableStorageEntry<ApiType>;
      positionsByPool: AugmentedQueryDoubleMap<ApiType, (key1: LiquidityPoolId | AnyNumber | Uint8Array, key2: ITuple<[TradingPair, PositionId]> | [TradingPair | { base?: any; quote?: any } | string | Uint8Array, PositionId | AnyNumber | Uint8Array]) => Observable<Option<bool>>> & QueryableStorageEntry<ApiType>;
      positionsByTrader: AugmentedQueryDoubleMap<ApiType, (key1: AccountId | string | Uint8Array, key2: ITuple<[LiquidityPoolId, PositionId]> | [LiquidityPoolId | AnyNumber | Uint8Array, PositionId | AnyNumber | Uint8Array]) => Observable<Option<bool>>> & QueryableStorageEntry<ApiType>;
      /**
       * Risk thresholds of a trading pair, including trader risk threshold, pool ENP and ELL.
       * 
       * DEFAULT-NOTE: `trader`, `enp`, and `ell` are all `None` by default.
       **/
      riskThresholds: AugmentedQuery<ApiType, (arg: TradingPair | { base?: any; quote?: any } | string | Uint8Array) => Observable<TradingPairRiskThreshold>> & QueryableStorageEntry<ApiType>;
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
      isUpdated: AugmentedQuery<ApiType, (arg: OracleKey | 'LAMI'|'AUSD'|'FEUR'|'FJPY'|'FBTC'|'FETH'|'FAUD'|'FCAD'|'FCHF'|'FXAU'|'FOIL'|'FGBP' | number | Uint8Array) => Observable<bool>> & QueryableStorageEntry<ApiType>;
      /**
       * The current members of the collective. This is stored sorted (just by value).
       **/
      members: AugmentedQuery<ApiType, () => Observable<OrderedSet>> & QueryableStorageEntry<ApiType>;
      nonces: AugmentedQuery<ApiType, (arg: AccountId | string | Uint8Array) => Observable<u32>> & QueryableStorageEntry<ApiType>;
      /**
       * Raw values for each oracle operators
       **/
      rawValues: AugmentedQueryDoubleMap<ApiType, (key1: AccountId | string | Uint8Array, key2: OracleKey | 'LAMI'|'AUSD'|'FEUR'|'FJPY'|'FBTC'|'FETH'|'FAUD'|'FCAD'|'FCHF'|'FXAU'|'FOIL'|'FGBP' | number | Uint8Array) => Observable<Option<TimestampedValueOf>>> & QueryableStorageEntry<ApiType>;
      /**
       * Session key for oracle operators
       **/
      sessionKeys: AugmentedQuery<ApiType, (arg: AccountId | string | Uint8Array) => Observable<Option<AuthorityId>>> & QueryableStorageEntry<ApiType>;
      /**
       * Combined value, may not be up to date
       **/
      values: AugmentedQuery<ApiType, (arg: OracleKey | 'LAMI'|'AUSD'|'FEUR'|'FJPY'|'FBTC'|'FETH'|'FAUD'|'FCAD'|'FCHF'|'FXAU'|'FOIL'|'FGBP' | number | Uint8Array) => Observable<Option<TimestampedValueOf>>> & QueryableStorageEntry<ApiType>;
    };
    syntheticLiquidityPools: {
      [index: string]: QueryableStorageEntry<ApiType>;
      maxSpread: AugmentedQuery<ApiType, (arg: CurrencyId | 'LAMI'|'AUSD'|'FEUR'|'FJPY'|'FBTC'|'FETH'|'FAUD'|'FCAD'|'FCHF'|'FXAU'|'FOIL'|'FGBP' | number | Uint8Array) => Observable<Balance>> & QueryableStorageEntry<ApiType>;
      minAdditionalCollateralRatio: AugmentedQuery<ApiType, () => Observable<Permill>> & QueryableStorageEntry<ApiType>;
      poolCurrencyOptions: AugmentedQueryDoubleMap<ApiType, (key1: LiquidityPoolId | AnyNumber | Uint8Array, key2: CurrencyId | 'LAMI'|'AUSD'|'FEUR'|'FJPY'|'FBTC'|'FETH'|'FAUD'|'FCAD'|'FCHF'|'FXAU'|'FOIL'|'FGBP' | number | Uint8Array) => Observable<SyntheticPoolCurrencyOption>> & QueryableStorageEntry<ApiType>;
    };
    syntheticTokens: {
      [index: string]: QueryableStorageEntry<ApiType>;
      positions: AugmentedQueryDoubleMap<ApiType, (key1: LiquidityPoolId | AnyNumber | Uint8Array, key2: CurrencyId | 'LAMI'|'AUSD'|'FEUR'|'FJPY'|'FBTC'|'FETH'|'FAUD'|'FCAD'|'FCHF'|'FXAU'|'FOIL'|'FGBP' | number | Uint8Array) => Observable<SyntheticPosition>> & QueryableStorageEntry<ApiType>;
      ratios: AugmentedQuery<ApiType, (arg: CurrencyId | 'LAMI'|'AUSD'|'FEUR'|'FJPY'|'FBTC'|'FETH'|'FAUD'|'FCAD'|'FCHF'|'FXAU'|'FOIL'|'FGBP' | number | Uint8Array) => Observable<SyntheticTokensRatio>> & QueryableStorageEntry<ApiType>;
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
      accounts: AugmentedQueryDoubleMap<ApiType, (key1: AccountId | string | Uint8Array, key2: CurrencyId | 'LAMI'|'AUSD'|'FEUR'|'FJPY'|'FBTC'|'FETH'|'FAUD'|'FCAD'|'FCHF'|'FXAU'|'FOIL'|'FGBP' | number | Uint8Array) => Observable<AccountData>> & QueryableStorageEntry<ApiType>;
      /**
       * Any liquidity locks of a token type under an account.
       * NOTE: Should only be accessed when setting, changing and freeing a lock.
       **/
      locks: AugmentedQueryDoubleMap<ApiType, (key1: AccountId | string | Uint8Array, key2: CurrencyId | 'LAMI'|'AUSD'|'FEUR'|'FJPY'|'FBTC'|'FETH'|'FAUD'|'FCAD'|'FCHF'|'FXAU'|'FOIL'|'FGBP' | number | Uint8Array) => Observable<Vec<BalanceLock>>> & QueryableStorageEntry<ApiType>;
      /**
       * The total issuance of a token type.
       **/
      totalIssuance: AugmentedQuery<ApiType, (arg: CurrencyId | 'LAMI'|'AUSD'|'FEUR'|'FJPY'|'FBTC'|'FETH'|'FAUD'|'FCAD'|'FCHF'|'FXAU'|'FOIL'|'FGBP' | number | Uint8Array) => Observable<Balance>> & QueryableStorageEntry<ApiType>;
    };
  }

  export interface QueryableStorage<ApiType extends ApiTypes> extends AugmentedQueries<ApiType> {
    [index: string]: QueryableModuleStorage<ApiType>;
  }
}
