// Auto-generated via `yarn polkadot-types-from-chain`, do not edit
/* eslint-disable */

import { AnyNumber, ITuple, Observable } from '@polkadot/types/types';
import { Option, Vec } from '@polkadot/types/codec';
import { bool } from '@polkadot/types/primitive';
import {
  AccountId,
  Balance,
  CurrencyId,
  FixedI128,
  IdentityDepositBalanceOf,
  LiquidityPoolId,
  LiquidityPoolIdentityInfo,
  MarginPoolOption,
  MarginPoolTradingPairOption,
  MarginPosition,
  MarginTradingPairOption,
  Moment,
  Permill,
  Pool,
  PositionId,
  PositionsSnapshot,
  SwapRate,
  SyntheticPoolCurrencyOption,
  SyntheticPosition,
  SyntheticTokensRatio,
  TradingPair,
  TradingPairRiskThreshold
} from '@laminar/types/interfaces/runtime';
import { OrmlAccountData, OrmlBalanceLock } from '@open-web3/orml-types/interfaces/tokens';
import { ApiTypes } from '@polkadot/api/types';

declare module '@polkadot/api/types/storage' {
  export interface AugmentedQueries<ApiType> {
    baseLiquidityPoolsForMargin: {
      [key: string]: QueryableStorageEntry<ApiType>;
      /**
       * Identity info of liquidity pools: `(identity_info, deposit_amount, is_verified)`.
       *
       * Returns `None` if identity info of the pool not set or removed.
       **/
      identityInfos: AugmentedQuery<
        ApiType,
        (
          arg: LiquidityPoolId | AnyNumber | Uint8Array
        ) => Observable<Option<ITuple<[LiquidityPoolIdentityInfo, IdentityDepositBalanceOf, bool]>>>
      > &
        QueryableStorageEntry<ApiType>;
      /**
       * Next available liquidity pool ID.
       **/
      nextPoolId: AugmentedQuery<ApiType, () => Observable<LiquidityPoolId>> & QueryableStorageEntry<ApiType>;
      /**
       * Liquidity pool information.
       *
       * Returns `None` if no such pool exists.
       **/
      pools: AugmentedQuery<ApiType, (arg: LiquidityPoolId | AnyNumber | Uint8Array) => Observable<Option<Pool>>> &
        QueryableStorageEntry<ApiType>;
    };
    baseLiquidityPoolsForSynthetic: {
      [key: string]: QueryableStorageEntry<ApiType>;
      /**
       * Identity info of liquidity pools: `(identity_info, deposit_amount, is_verified)`.
       *
       * Returns `None` if identity info of the pool not set or removed.
       **/
      identityInfos: AugmentedQuery<
        ApiType,
        (
          arg: LiquidityPoolId | AnyNumber | Uint8Array
        ) => Observable<Option<ITuple<[LiquidityPoolIdentityInfo, IdentityDepositBalanceOf, bool]>>>
      > &
        QueryableStorageEntry<ApiType>;
      /**
       * Next available liquidity pool ID.
       **/
      nextPoolId: AugmentedQuery<ApiType, () => Observable<LiquidityPoolId>> & QueryableStorageEntry<ApiType>;
      /**
       * Liquidity pool information.
       *
       * Returns `None` if no such pool exists.
       **/
      pools: AugmentedQuery<ApiType, (arg: LiquidityPoolId | AnyNumber | Uint8Array) => Observable<Option<Pool>>> &
        QueryableStorageEntry<ApiType>;
    };
    marginLiquidityPools: {
      [key: string]: QueryableStorageEntry<ApiType>;
      /**
       * The accumulated swap rate of trading pairs in liquidity pools.
       **/
      accumulatedSwapRates: AugmentedQueryDoubleMap<
        ApiType,
        (
          key1: LiquidityPoolId | AnyNumber | Uint8Array,
          key2: TradingPair | { base?: any; quote?: any } | string | Uint8Array
        ) => Observable<SwapRate>
      > &
        QueryableStorageEntry<ApiType>;
      /**
       * The default minimum leveraged amount allowed to open a position.
       **/
      defaultMinLeveragedAmount: AugmentedQuery<ApiType, () => Observable<Balance>> & QueryableStorageEntry<ApiType>;
      /**
       * The last time swap rate was accumulated.
       **/
      lastAccumulateTime: AugmentedQuery<ApiType, () => Observable<Moment>> & QueryableStorageEntry<ApiType>;
      /**
       * Liquidity pool options, managed by pool owner.
       **/
      poolOptions: AugmentedQuery<
        ApiType,
        (arg: LiquidityPoolId | AnyNumber | Uint8Array) => Observable<MarginPoolOption>
      > &
        QueryableStorageEntry<ApiType>;
      /**
       * Trading pair options in a liquidity pool.
       *
       * Getter is implemented manually to cap the spread with max spread.
       **/
      poolTradingPairOptions: AugmentedQueryDoubleMap<
        ApiType,
        (
          key1: LiquidityPoolId | AnyNumber | Uint8Array,
          key2: TradingPair | { base?: any; quote?: any } | string | Uint8Array
        ) => Observable<MarginPoolTradingPairOption>
      > &
        QueryableStorageEntry<ApiType>;
      /**
       * Trading pair options.
       **/
      tradingPairOptions: AugmentedQuery<
        ApiType,
        (arg: TradingPair | { base?: any; quote?: any } | string | Uint8Array) => Observable<MarginTradingPairOption>
      > &
        QueryableStorageEntry<ApiType>;
    };
    marginProtocol: {
      [key: string]: QueryableStorageEntry<ApiType>;
      /**
       * Balance of a trader in a liquidity pool.
       *
       * The balance value could be positive or negative:
       * - If positive, it represents 'balance' the trader could use to open positions, withdraw etc.
       * - If negative, it represents how much the trader owes the pool. Owing could happen when realizing loss.
       * but trader has not enough free margin at the moment; Then repayment would be done while realizing profit.
       **/
      balances: AugmentedQueryDoubleMap<
        ApiType,
        (key1: AccountId | string | Uint8Array, key2: LiquidityPoolId | AnyNumber | Uint8Array) => Observable<FixedI128>
      > &
        QueryableStorageEntry<ApiType>;
      /**
       * Margin call pool.
       *
       * New positions may only be opened in a pool if which not in margin called state.
       **/
      marginCalledPools: AugmentedQuery<
        ApiType,
        (arg: LiquidityPoolId | AnyNumber | Uint8Array) => Observable<Option<ITuple<[]>>>
      > &
        QueryableStorageEntry<ApiType>;
      /**
       * Margin call check of a trader in a pool.
       *
       * A trader may only open new positions if not in margin called state.
       **/
      marginCalledTraders: AugmentedQueryDoubleMap<
        ApiType,
        (
          key1: AccountId | string | Uint8Array,
          key2: LiquidityPoolId | AnyNumber | Uint8Array
        ) => Observable<Option<ITuple<[]>>>
      > &
        QueryableStorageEntry<ApiType>;
      /**
       * Next available position ID.
       **/
      nextPositionId: AugmentedQuery<ApiType, () => Observable<PositionId>> & QueryableStorageEntry<ApiType>;
      /**
       * Positions.
       **/
      positions: AugmentedQuery<
        ApiType,
        (arg: PositionId | AnyNumber | Uint8Array) => Observable<Option<MarginPosition>>
      > &
        QueryableStorageEntry<ApiType>;
      /**
       * Positions existence check by pools and trading pairs.
       **/
      positionsByPool: AugmentedQueryDoubleMap<
        ApiType,
        (
          key1: LiquidityPoolId | AnyNumber | Uint8Array,
          key2:
            | ITuple<[TradingPair, PositionId]>
            | [TradingPair | { base?: any; quote?: any } | string | Uint8Array, PositionId | AnyNumber | Uint8Array]
        ) => Observable<Option<ITuple<[]>>>
      > &
        QueryableStorageEntry<ApiType>;
      /**
       * Positions existence check by traders and liquidity pool IDs.
       **/
      positionsByTrader: AugmentedQueryDoubleMap<
        ApiType,
        (
          key1: AccountId | string | Uint8Array,
          key2:
            | ITuple<[LiquidityPoolId, PositionId]>
            | [LiquidityPoolId | AnyNumber | Uint8Array, PositionId | AnyNumber | Uint8Array]
        ) => Observable<Option<ITuple<[]>>>
      > &
        QueryableStorageEntry<ApiType>;
      /**
       * Positions snapshots.
       *
       * Used for performance improvement.
       **/
      positionsSnapshots: AugmentedQueryDoubleMap<
        ApiType,
        (
          key1: LiquidityPoolId | AnyNumber | Uint8Array,
          key2: TradingPair | { base?: any; quote?: any } | string | Uint8Array
        ) => Observable<PositionsSnapshot>
      > &
        QueryableStorageEntry<ApiType>;
      /**
       * Risk thresholds of a trading pair, including trader risk threshold, pool ENP and ELL risk threshold.
       *
       * DEFAULT-NOTE: `trader`, `enp`, and `ell` are all `None` by default.
       **/
      riskThresholds: AugmentedQuery<
        ApiType,
        (arg: TradingPair | { base?: any; quote?: any } | string | Uint8Array) => Observable<TradingPairRiskThreshold>
      > &
        QueryableStorageEntry<ApiType>;
    };
    syntheticLiquidityPools: {
      [key: string]: QueryableStorageEntry<ApiType>;
      /**
       * Maximum spread of a currency.
       **/
      maxSpread: AugmentedQuery<
        ApiType,
        (
          arg:
            | CurrencyId
            | 'LAMI'
            | 'AUSD'
            | 'FEUR'
            | 'FJPY'
            | 'FBTC'
            | 'FETH'
            | 'FAUD'
            | 'FCAD'
            | 'FCHF'
            | 'FXAU'
            | 'FOIL'
            | 'FGBP'
            | number
            | Uint8Array
        ) => Observable<Option<Balance>>
      > &
        QueryableStorageEntry<ApiType>;
      /**
       * Minimum additional collateral ratio.
       **/
      minAdditionalCollateralRatio: AugmentedQuery<ApiType, () => Observable<Permill>> & QueryableStorageEntry<ApiType>;
      /**
       * Currency options in a liquidity pool.
       **/
      poolCurrencyOptions: AugmentedQueryDoubleMap<
        ApiType,
        (
          key1: LiquidityPoolId | AnyNumber | Uint8Array,
          key2:
            | CurrencyId
            | 'LAMI'
            | 'AUSD'
            | 'FEUR'
            | 'FJPY'
            | 'FBTC'
            | 'FETH'
            | 'FAUD'
            | 'FCAD'
            | 'FCHF'
            | 'FXAU'
            | 'FOIL'
            | 'FGBP'
            | number
            | Uint8Array
        ) => Observable<SyntheticPoolCurrencyOption>
      > &
        QueryableStorageEntry<ApiType>;
    };
    syntheticTokens: {
      [key: string]: QueryableStorageEntry<ApiType>;
      /**
       * Positions of a currency in a pool
       **/
      positions: AugmentedQueryDoubleMap<
        ApiType,
        (
          key1: LiquidityPoolId | AnyNumber | Uint8Array,
          key2:
            | CurrencyId
            | 'LAMI'
            | 'AUSD'
            | 'FEUR'
            | 'FJPY'
            | 'FBTC'
            | 'FETH'
            | 'FAUD'
            | 'FCAD'
            | 'FCHF'
            | 'FXAU'
            | 'FOIL'
            | 'FGBP'
            | number
            | Uint8Array
        ) => Observable<SyntheticPosition>
      > &
        QueryableStorageEntry<ApiType>;
      /**
       * Ratios for each currency.
       **/
      ratios: AugmentedQuery<
        ApiType,
        (
          arg:
            | CurrencyId
            | 'LAMI'
            | 'AUSD'
            | 'FEUR'
            | 'FJPY'
            | 'FBTC'
            | 'FETH'
            | 'FAUD'
            | 'FCAD'
            | 'FCHF'
            | 'FXAU'
            | 'FOIL'
            | 'FGBP'
            | number
            | Uint8Array
        ) => Observable<SyntheticTokensRatio>
      > &
        QueryableStorageEntry<ApiType>;
    };
    tokens: {
      [key: string]: QueryableStorageEntry<ApiType>;
      /**
       * The balance of a token type under an account.
       *
       * NOTE: If the total is ever zero, decrease account ref account.
       *
       * NOTE: This is only used in the case that this module is used to store balances.
       **/
      accounts: AugmentedQueryDoubleMap<
        ApiType,
        (
          key1: AccountId | string | Uint8Array,
          key2:
            | CurrencyId
            | 'LAMI'
            | 'AUSD'
            | 'FEUR'
            | 'FJPY'
            | 'FBTC'
            | 'FETH'
            | 'FAUD'
            | 'FCAD'
            | 'FCHF'
            | 'FXAU'
            | 'FOIL'
            | 'FGBP'
            | number
            | Uint8Array
        ) => Observable<OrmlAccountData>
      > &
        QueryableStorageEntry<ApiType>;
      /**
       * Any liquidity locks of a token type under an account.
       * NOTE: Should only be accessed when setting, changing and freeing a lock.
       **/
      locks: AugmentedQueryDoubleMap<
        ApiType,
        (
          key1: AccountId | string | Uint8Array,
          key2:
            | CurrencyId
            | 'LAMI'
            | 'AUSD'
            | 'FEUR'
            | 'FJPY'
            | 'FBTC'
            | 'FETH'
            | 'FAUD'
            | 'FCAD'
            | 'FCHF'
            | 'FXAU'
            | 'FOIL'
            | 'FGBP'
            | number
            | Uint8Array
        ) => Observable<Vec<OrmlBalanceLock>>
      > &
        QueryableStorageEntry<ApiType>;
      /**
       * The total issuance of a token type.
       **/
      totalIssuance: AugmentedQuery<
        ApiType,
        (
          arg:
            | CurrencyId
            | 'LAMI'
            | 'AUSD'
            | 'FEUR'
            | 'FJPY'
            | 'FBTC'
            | 'FETH'
            | 'FAUD'
            | 'FCAD'
            | 'FCHF'
            | 'FXAU'
            | 'FOIL'
            | 'FGBP'
            | number
            | Uint8Array
        ) => Observable<Balance>
      > &
        QueryableStorageEntry<ApiType>;
    };
  }

  export interface QueryableStorage<ApiType extends ApiTypes> extends AugmentedQueries<ApiType> {
    [key: string]: QueryableModuleStorage<ApiType>;
  }
}
