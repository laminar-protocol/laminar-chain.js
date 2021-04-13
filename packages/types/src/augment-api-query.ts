// Auto-generated via `yarn polkadot-types-from-chain`, do not edit
/* eslint-disable */

import type { Option, Vec, bool } from '@polkadot/types';
import type { AnyNumber, ITuple, Observable } from '@polkadot/types/types';
import type { AccountId, Balance, CurrencyId, FixedI128, IdentityDepositBalanceOf, LiquidityPoolId, LiquidityPoolIdentityInfo, MarginPoolOption, MarginPoolTradingPairOption, MarginPosition, MarginTradingPairOption, Moment, Permill, Pool, PositionId, PositionsSnapshot, SwapRate, SyntheticPoolCurrencyOption, SyntheticPosition, SyntheticTokensRatio, TradingPair, TradingPairRiskThreshold } from '@laminar/types/interfaces/runtime';
import type { OrmlAccountData, OrmlBalanceLock } from '@open-web3/orml-types/interfaces/tokens';
import type { Price } from '@open-web3/orml-types/interfaces/traits';
import type { ApiTypes } from '@polkadot/api/types';

declare module '@polkadot/api/types/storage' {
  export interface AugmentedQueries<ApiType> {
    baseLiquidityPoolsForMargin: {
      [key: string]: QueryableStorageEntry<ApiType>;
      /**
       * Identity info of liquidity pools: `(identity_info, deposit_amount, is_verified)`.
       * 
       * Returns `None` if identity info of the pool not set or removed.
       **/
      identityInfos: AugmentedQuery<ApiType, (arg: LiquidityPoolId | AnyNumber | Uint8Array) => Observable<Option<ITuple<[LiquidityPoolIdentityInfo, IdentityDepositBalanceOf, bool]>>>, [LiquidityPoolId]> & QueryableStorageEntry<ApiType, [LiquidityPoolId]>;
      /**
       * Next available liquidity pool ID.
       **/
      nextPoolId: AugmentedQuery<ApiType, () => Observable<LiquidityPoolId>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Liquidity pool information.
       * 
       * Returns `None` if no such pool exists.
       **/
      pools: AugmentedQuery<ApiType, (arg: LiquidityPoolId | AnyNumber | Uint8Array) => Observable<Option<Pool>>, [LiquidityPoolId]> & QueryableStorageEntry<ApiType, [LiquidityPoolId]>;
    };
    baseLiquidityPoolsForSynthetic: {
      [key: string]: QueryableStorageEntry<ApiType>;
      /**
       * Identity info of liquidity pools: `(identity_info, deposit_amount, is_verified)`.
       * 
       * Returns `None` if identity info of the pool not set or removed.
       **/
      identityInfos: AugmentedQuery<ApiType, (arg: LiquidityPoolId | AnyNumber | Uint8Array) => Observable<Option<ITuple<[LiquidityPoolIdentityInfo, IdentityDepositBalanceOf, bool]>>>, [LiquidityPoolId]> & QueryableStorageEntry<ApiType, [LiquidityPoolId]>;
      /**
       * Next available liquidity pool ID.
       **/
      nextPoolId: AugmentedQuery<ApiType, () => Observable<LiquidityPoolId>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Liquidity pool information.
       * 
       * Returns `None` if no such pool exists.
       **/
      pools: AugmentedQuery<ApiType, (arg: LiquidityPoolId | AnyNumber | Uint8Array) => Observable<Option<Pool>>, [LiquidityPoolId]> & QueryableStorageEntry<ApiType, [LiquidityPoolId]>;
    };
    marginLiquidityPools: {
      [key: string]: QueryableStorageEntry<ApiType>;
      /**
       * The accumulated swap rate of trading pairs in liquidity pools.
       **/
      accumulatedSwapRates: AugmentedQueryDoubleMap<ApiType, (key1: LiquidityPoolId | AnyNumber | Uint8Array, key2: TradingPair | { base?: any; quote?: any } | string | Uint8Array) => Observable<SwapRate>, [LiquidityPoolId, TradingPair]> & QueryableStorageEntry<ApiType, [LiquidityPoolId, TradingPair]>;
      /**
       * The default minimum leveraged amount allowed to open a position.
       **/
      defaultMinLeveragedAmount: AugmentedQuery<ApiType, () => Observable<Balance>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * The last time swap rate was accumulated.
       **/
      lastAccumulateTime: AugmentedQuery<ApiType, () => Observable<Moment>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Liquidity pool options, managed by pool owner.
       **/
      poolOptions: AugmentedQuery<ApiType, (arg: LiquidityPoolId | AnyNumber | Uint8Array) => Observable<MarginPoolOption>, [LiquidityPoolId]> & QueryableStorageEntry<ApiType, [LiquidityPoolId]>;
      /**
       * Trading pair options in a liquidity pool.
       * 
       * Getter is implemented manually to cap the spread with max spread.
       **/
      poolTradingPairOptions: AugmentedQueryDoubleMap<ApiType, (key1: LiquidityPoolId | AnyNumber | Uint8Array, key2: TradingPair | { base?: any; quote?: any } | string | Uint8Array) => Observable<MarginPoolTradingPairOption>, [LiquidityPoolId, TradingPair]> & QueryableStorageEntry<ApiType, [LiquidityPoolId, TradingPair]>;
      /**
       * Trading pair options.
       **/
      tradingPairOptions: AugmentedQuery<ApiType, (arg: TradingPair | { base?: any; quote?: any } | string | Uint8Array) => Observable<MarginTradingPairOption>, [TradingPair]> & QueryableStorageEntry<ApiType, [TradingPair]>;
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
      balances: AugmentedQueryDoubleMap<ApiType, (key1: AccountId | string | Uint8Array, key2: LiquidityPoolId | AnyNumber | Uint8Array) => Observable<FixedI128>, [AccountId, LiquidityPoolId]> & QueryableStorageEntry<ApiType, [AccountId, LiquidityPoolId]>;
      /**
       * Margin call pool.
       * 
       * New positions may only be opened in a pool if which not in margin called state.
       **/
      marginCalledPools: AugmentedQuery<ApiType, (arg: LiquidityPoolId | AnyNumber | Uint8Array) => Observable<Option<ITuple<[]>>>, [LiquidityPoolId]> & QueryableStorageEntry<ApiType, [LiquidityPoolId]>;
      /**
       * Margin call check of a trader in a pool.
       * 
       * A trader may only open new positions if not in margin called state.
       **/
      marginCalledTraders: AugmentedQueryDoubleMap<ApiType, (key1: AccountId | string | Uint8Array, key2: LiquidityPoolId | AnyNumber | Uint8Array) => Observable<Option<ITuple<[]>>>, [AccountId, LiquidityPoolId]> & QueryableStorageEntry<ApiType, [AccountId, LiquidityPoolId]>;
      /**
       * Next available position ID.
       **/
      nextPositionId: AugmentedQuery<ApiType, () => Observable<PositionId>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Positions.
       **/
      positions: AugmentedQuery<ApiType, (arg: PositionId | AnyNumber | Uint8Array) => Observable<Option<MarginPosition>>, [PositionId]> & QueryableStorageEntry<ApiType, [PositionId]>;
      /**
       * Positions existence check by pools and trading pairs.
       **/
      positionsByPool: AugmentedQueryDoubleMap<ApiType, (key1: LiquidityPoolId | AnyNumber | Uint8Array, key2: ITuple<[TradingPair, PositionId]> | [TradingPair | { base?: any; quote?: any } | string | Uint8Array, PositionId | AnyNumber | Uint8Array]) => Observable<Option<ITuple<[]>>>, [LiquidityPoolId, ITuple<[TradingPair, PositionId]>]> & QueryableStorageEntry<ApiType, [LiquidityPoolId, ITuple<[TradingPair, PositionId]>]>;
      /**
       * Positions existence check by traders and liquidity pool IDs.
       **/
      positionsByTrader: AugmentedQueryDoubleMap<ApiType, (key1: AccountId | string | Uint8Array, key2: ITuple<[LiquidityPoolId, PositionId]> | [LiquidityPoolId | AnyNumber | Uint8Array, PositionId | AnyNumber | Uint8Array]) => Observable<Option<ITuple<[]>>>, [AccountId, ITuple<[LiquidityPoolId, PositionId]>]> & QueryableStorageEntry<ApiType, [AccountId, ITuple<[LiquidityPoolId, PositionId]>]>;
      /**
       * Positions snapshots.
       * 
       * Used for performance improvement.
       **/
      positionsSnapshots: AugmentedQueryDoubleMap<ApiType, (key1: LiquidityPoolId | AnyNumber | Uint8Array, key2: TradingPair | { base?: any; quote?: any } | string | Uint8Array) => Observable<PositionsSnapshot>, [LiquidityPoolId, TradingPair]> & QueryableStorageEntry<ApiType, [LiquidityPoolId, TradingPair]>;
      /**
       * Risk thresholds of a trading pair, including trader risk threshold, pool ENP and ELL risk threshold.
       * 
       * DEFAULT-NOTE: `trader`, `enp`, and `ell` are all `None` by default.
       **/
      riskThresholds: AugmentedQuery<ApiType, (arg: TradingPair | { base?: any; quote?: any } | string | Uint8Array) => Observable<TradingPairRiskThreshold>, [TradingPair]> & QueryableStorageEntry<ApiType, [TradingPair]>;
    };
    syntheticLiquidityPools: {
      [key: string]: QueryableStorageEntry<ApiType>;
      /**
       * Maximum spread of a currency.
       **/
      maxSpread: AugmentedQuery<ApiType, (arg: CurrencyId | 'LAMI' | 'AUSD' | 'FEUR' | 'FJPY' | 'FBTC' | 'FETH' | 'FAUD' | 'FCAD' | 'FCHF' | 'FXAU' | 'FOIL' | 'FGBP' | number | Uint8Array) => Observable<Option<Price>>, [CurrencyId]> & QueryableStorageEntry<ApiType, [CurrencyId]>;
      /**
       * Minimum additional collateral ratio.
       **/
      minAdditionalCollateralRatio: AugmentedQuery<ApiType, () => Observable<Permill>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Currency options in a liquidity pool.
       **/
      poolCurrencyOptions: AugmentedQueryDoubleMap<ApiType, (key1: LiquidityPoolId | AnyNumber | Uint8Array, key2: CurrencyId | 'LAMI' | 'AUSD' | 'FEUR' | 'FJPY' | 'FBTC' | 'FETH' | 'FAUD' | 'FCAD' | 'FCHF' | 'FXAU' | 'FOIL' | 'FGBP' | number | Uint8Array) => Observable<SyntheticPoolCurrencyOption>, [LiquidityPoolId, CurrencyId]> & QueryableStorageEntry<ApiType, [LiquidityPoolId, CurrencyId]>;
    };
    syntheticTokens: {
      [key: string]: QueryableStorageEntry<ApiType>;
      /**
       * Positions of a currency in a pool
       **/
      positions: AugmentedQueryDoubleMap<ApiType, (key1: LiquidityPoolId | AnyNumber | Uint8Array, key2: CurrencyId | 'LAMI' | 'AUSD' | 'FEUR' | 'FJPY' | 'FBTC' | 'FETH' | 'FAUD' | 'FCAD' | 'FCHF' | 'FXAU' | 'FOIL' | 'FGBP' | number | Uint8Array) => Observable<SyntheticPosition>, [LiquidityPoolId, CurrencyId]> & QueryableStorageEntry<ApiType, [LiquidityPoolId, CurrencyId]>;
      /**
       * Ratios for each currency.
       **/
      ratios: AugmentedQuery<ApiType, (arg: CurrencyId | 'LAMI' | 'AUSD' | 'FEUR' | 'FJPY' | 'FBTC' | 'FETH' | 'FAUD' | 'FCAD' | 'FCHF' | 'FXAU' | 'FOIL' | 'FGBP' | number | Uint8Array) => Observable<SyntheticTokensRatio>, [CurrencyId]> & QueryableStorageEntry<ApiType, [CurrencyId]>;
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
      accounts: AugmentedQueryDoubleMap<ApiType, (key1: AccountId | string | Uint8Array, key2: CurrencyId | 'LAMI' | 'AUSD' | 'FEUR' | 'FJPY' | 'FBTC' | 'FETH' | 'FAUD' | 'FCAD' | 'FCHF' | 'FXAU' | 'FOIL' | 'FGBP' | number | Uint8Array) => Observable<OrmlAccountData>, [AccountId, CurrencyId]> & QueryableStorageEntry<ApiType, [AccountId, CurrencyId]>;
      /**
       * Any liquidity locks of a token type under an account.
       * NOTE: Should only be accessed when setting, changing and freeing a lock.
       **/
      locks: AugmentedQueryDoubleMap<ApiType, (key1: AccountId | string | Uint8Array, key2: CurrencyId | 'LAMI' | 'AUSD' | 'FEUR' | 'FJPY' | 'FBTC' | 'FETH' | 'FAUD' | 'FCAD' | 'FCHF' | 'FXAU' | 'FOIL' | 'FGBP' | number | Uint8Array) => Observable<Vec<OrmlBalanceLock>>, [AccountId, CurrencyId]> & QueryableStorageEntry<ApiType, [AccountId, CurrencyId]>;
      /**
       * The total issuance of a token type.
       **/
      totalIssuance: AugmentedQuery<ApiType, (arg: CurrencyId | 'LAMI' | 'AUSD' | 'FEUR' | 'FJPY' | 'FBTC' | 'FETH' | 'FAUD' | 'FCAD' | 'FCHF' | 'FXAU' | 'FOIL' | 'FGBP' | number | Uint8Array) => Observable<Balance>, [CurrencyId]> & QueryableStorageEntry<ApiType, [CurrencyId]>;
    };
  }

  export interface QueryableStorage<ApiType extends ApiTypes> extends AugmentedQueries<ApiType> {
    [key: string]: QueryableModuleStorage<ApiType>;
  }
}
