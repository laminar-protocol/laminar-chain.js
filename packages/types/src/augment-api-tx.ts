// Auto-generated via `yarn polkadot-types-from-chain`, do not edit
/* eslint-disable */

import type { Compact, Option, bool } from '@polkadot/types';
import type { AnyNumber } from '@polkadot/types/types';
import type { AccountId, AmountOf, Balance, BalanceOf, Call, CurrencyId, CurrencyIdOf, FixedI128, Leverage, Leverages, LiquidityPoolId, LiquidityPoolIdentityInfo, LookupSource, Moment, Permill, PositionId, RiskThreshold, SwapRate, TradingPair } from '@laminar/types/interfaces/runtime';
import type { Price } from '@open-web3/orml-types/interfaces/traits';
import type { Extrinsic } from '@polkadot/types/interfaces/extrinsics';
import type { ApiTypes, SubmittableExtrinsic } from '@polkadot/api/types';

declare module '@polkadot/api/types/submittable' {
  export interface AugmentedSubmittables<ApiType> {
    baseLiquidityPoolsForMargin: {
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
      /**
       * Remove the identity info of a liquidity pool.
       * 
       * May only be called from the pool owner. The reserved balance would be released.
       **/
      clearIdentity: AugmentedSubmittable<(poolId: Compact<LiquidityPoolId> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [Compact<LiquidityPoolId>]>;
      /**
       * Create a liquidity pool.
       * 
       * Caller would be the owner of created pool.
       **/
      createPool: AugmentedSubmittable<() => SubmittableExtrinsic<ApiType>, []>;
      /**
       * Deposit liquidity to a pool.
       **/
      depositLiquidity: AugmentedSubmittable<(poolId: Compact<LiquidityPoolId> | AnyNumber | Uint8Array, amount: Compact<Balance> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [Compact<LiquidityPoolId>, Compact<Balance>]>;
      /**
       * Disable a liquidity pool.
       * 
       * May only be called from the pool owner.
       **/
      disablePool: AugmentedSubmittable<(poolId: Compact<LiquidityPoolId> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [Compact<LiquidityPoolId>]>;
      /**
       * Remove a liquidity pool.
       * 
       * May only be called from the pool owner. Pools may only be removed when there is no liability.
       **/
      removePool: AugmentedSubmittable<(poolId: Compact<LiquidityPoolId> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [Compact<LiquidityPoolId>]>;
      /**
       * Set identity of a liquidity pool.
       * 
       * May only be called from the pool owner. `IdentityDeposit` amount of balance would be reserved.
       **/
      setIdentity: AugmentedSubmittable<(poolId: Compact<LiquidityPoolId> | AnyNumber | Uint8Array, identityInfo: LiquidityPoolIdentityInfo | { legalName?: any; displayName?: any; web?: any; email?: any; image_url?: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [Compact<LiquidityPoolId>, LiquidityPoolIdentityInfo]>;
      /**
       * Transfer the ownership of the liquidity pool to `to`.
       * 
       * May only be called from the pool owner.
       **/
      transferLiquidityPool: AugmentedSubmittable<(poolId: Compact<LiquidityPoolId> | AnyNumber | Uint8Array, to: AccountId | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [Compact<LiquidityPoolId>, AccountId]>;
      /**
       * Mark the identity of a liquidity pool as verified.
       * 
       * May only be called from `UpdateOrigin`.
       **/
      verifyIdentity: AugmentedSubmittable<(poolId: Compact<LiquidityPoolId> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [Compact<LiquidityPoolId>]>;
      /**
       * Withdraw liquidity from a pool.
       **/
      withdrawLiquidity: AugmentedSubmittable<(poolId: Compact<LiquidityPoolId> | AnyNumber | Uint8Array, amount: Compact<Balance> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [Compact<LiquidityPoolId>, Compact<Balance>]>;
    };
    baseLiquidityPoolsForSynthetic: {
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
      /**
       * Remove the identity info of a liquidity pool.
       * 
       * May only be called from the pool owner. The reserved balance would be released.
       **/
      clearIdentity: AugmentedSubmittable<(poolId: Compact<LiquidityPoolId> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [Compact<LiquidityPoolId>]>;
      /**
       * Create a liquidity pool.
       * 
       * Caller would be the owner of created pool.
       **/
      createPool: AugmentedSubmittable<() => SubmittableExtrinsic<ApiType>, []>;
      /**
       * Deposit liquidity to a pool.
       **/
      depositLiquidity: AugmentedSubmittable<(poolId: Compact<LiquidityPoolId> | AnyNumber | Uint8Array, amount: Compact<Balance> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [Compact<LiquidityPoolId>, Compact<Balance>]>;
      /**
       * Disable a liquidity pool.
       * 
       * May only be called from the pool owner.
       **/
      disablePool: AugmentedSubmittable<(poolId: Compact<LiquidityPoolId> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [Compact<LiquidityPoolId>]>;
      /**
       * Remove a liquidity pool.
       * 
       * May only be called from the pool owner. Pools may only be removed when there is no liability.
       **/
      removePool: AugmentedSubmittable<(poolId: Compact<LiquidityPoolId> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [Compact<LiquidityPoolId>]>;
      /**
       * Set identity of a liquidity pool.
       * 
       * May only be called from the pool owner. `IdentityDeposit` amount of balance would be reserved.
       **/
      setIdentity: AugmentedSubmittable<(poolId: Compact<LiquidityPoolId> | AnyNumber | Uint8Array, identityInfo: LiquidityPoolIdentityInfo | { legalName?: any; displayName?: any; web?: any; email?: any; image_url?: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [Compact<LiquidityPoolId>, LiquidityPoolIdentityInfo]>;
      /**
       * Transfer the ownership of the liquidity pool to `to`.
       * 
       * May only be called from the pool owner.
       **/
      transferLiquidityPool: AugmentedSubmittable<(poolId: Compact<LiquidityPoolId> | AnyNumber | Uint8Array, to: AccountId | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [Compact<LiquidityPoolId>, AccountId]>;
      /**
       * Mark the identity of a liquidity pool as verified.
       * 
       * May only be called from `UpdateOrigin`.
       **/
      verifyIdentity: AugmentedSubmittable<(poolId: Compact<LiquidityPoolId> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [Compact<LiquidityPoolId>]>;
      /**
       * Withdraw liquidity from a pool.
       **/
      withdrawLiquidity: AugmentedSubmittable<(poolId: Compact<LiquidityPoolId> | AnyNumber | Uint8Array, amount: Compact<Balance> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [Compact<LiquidityPoolId>, Compact<Balance>]>;
    };
    currencies: {
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
      /**
       * Transfer some balance to another account under `currency_id`.
       * 
       * The dispatch origin for this call must be `Signed` by the transactor.
       * 
       * # <weight>
       * - Preconditions:
       * - T::MultiCurrency is orml_tokens
       * - T::NativeCurrency is pallet_balances
       * - Complexity: `O(1)`
       * - Db reads: 5
       * - Db writes: 2
       * -------------------
       * Base Weight:
       * - non-native currency: 90.23 µs
       * - native currency in worst case: 70 µs
       * # </weight>
       **/
      transfer: AugmentedSubmittable<(dest: LookupSource | { Id: any } | { Index: any } | { Raw: any } | { Address32: any } | { Address20: any } | string | Uint8Array, currencyId: CurrencyIdOf | 'LAMI' | 'AUSD' | 'DOT' | 'FEUR' | 'FJPY' | 'FBTC' | 'FETH' | 'FAUD' | 'FCAD' | 'FCHF' | 'FXAU' | 'FOIL' | 'FGBP' | number | Uint8Array, amount: Compact<BalanceOf> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [LookupSource, CurrencyIdOf, Compact<BalanceOf>]>;
      /**
       * Transfer some native currency to another account.
       * 
       * The dispatch origin for this call must be `Signed` by the transactor.
       * 
       * # <weight>
       * - Preconditions:
       * - T::MultiCurrency is orml_tokens
       * - T::NativeCurrency is pallet_balances
       * - Complexity: `O(1)`
       * - Db reads: 2 * `Accounts`
       * - Db writes: 2 * `Accounts`
       * -------------------
       * Base Weight: 70 µs
       * # </weight>
       **/
      transferNativeCurrency: AugmentedSubmittable<(dest: LookupSource | { Id: any } | { Index: any } | { Raw: any } | { Address32: any } | { Address20: any } | string | Uint8Array, amount: Compact<BalanceOf> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [LookupSource, Compact<BalanceOf>]>;
      /**
       * update amount of account `who` under `currency_id`.
       * 
       * The dispatch origin of this call must be _Root_.
       * 
       * # <weight>
       * - Preconditions:
       * - T::MultiCurrency is orml_tokens
       * - T::NativeCurrency is pallet_balances
       * - Complexity: `O(1)`
       * - Db reads:
       * - non-native currency: 5
       * - Db writes:
       * - non-native currency: 2
       * -------------------
       * Base Weight:
       * - non-native currency: 66.24 µs
       * - native currency and killing account: 26.33 µs
       * - native currency and create account: 27.39 µs
       * # </weight>
       **/
      updateBalance: AugmentedSubmittable<(who: LookupSource | { Id: any } | { Index: any } | { Raw: any } | { Address32: any } | { Address20: any } | string | Uint8Array, currencyId: CurrencyIdOf | 'LAMI' | 'AUSD' | 'DOT' | 'FEUR' | 'FJPY' | 'FBTC' | 'FETH' | 'FAUD' | 'FCAD' | 'FCHF' | 'FXAU' | 'FOIL' | 'FGBP' | number | Uint8Array, amount: AmountOf | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [LookupSource, CurrencyIdOf, AmountOf]>;
    };
    marginLiquidityPools: {
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
      /**
       * Disable a trading pair.
       * 
       * May only be called from `UpdateOrigin`.
       **/
      disableTradingPair: AugmentedSubmittable<(pair: TradingPair | { base?: any; quote?: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [TradingPair]>;
      /**
       * Enable a trading pair.
       * 
       * May only be called from `UpdateOrigin`.
       **/
      enableTradingPair: AugmentedSubmittable<(pair: TradingPair | { base?: any; quote?: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [TradingPair]>;
      /**
       * Disable `pair` in `pool_id`.
       * 
       * May only be called from the pool owner.
       **/
      liquidityPoolDisableTradingPair: AugmentedSubmittable<(poolId: Compact<LiquidityPoolId> | AnyNumber | Uint8Array, pair: TradingPair | { base?: any; quote?: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [Compact<LiquidityPoolId>, TradingPair]>;
      /**
       * Enable `pair` in `pool_id`.
       * 
       * May only be called from the pool owner.
       **/
      liquidityPoolEnableTradingPair: AugmentedSubmittable<(poolId: Compact<LiquidityPoolId> | AnyNumber | Uint8Array, pair: TradingPair | { base?: any; quote?: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [Compact<LiquidityPoolId>, TradingPair]>;
      /**
       * Set swap rate accumulation configuration.
       * 
       * May only be called from `UpdateOrigin`.
       **/
      setAccumulateConfig: AugmentedSubmittable<(pair: TradingPair | { base?: any; quote?: any } | string | Uint8Array, frequency: Moment | AnyNumber | Uint8Array, offset: Moment | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [TradingPair, Moment, Moment]>;
      /**
       * Set additional swap rate for `pool_id`.
       * 
       * May only be called from the pool owner.
       **/
      setAdditionalSwapRate: AugmentedSubmittable<(poolId: Compact<LiquidityPoolId> | AnyNumber | Uint8Array, rate: FixedI128 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [Compact<LiquidityPoolId>, FixedI128]>;
      /**
       * Set default minimum leveraged amount to open a position.
       * 
       * May only be called from `UpdateOrigin`.
       **/
      setDefaultMinLeveragedAmount: AugmentedSubmittable<(amount: Compact<Balance> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [Compact<Balance>]>;
      /**
       * Set enabled leverages for `pair` in `pool_id`.
       * 
       * May only be called from the pool owner.
       **/
      setEnabledLeverages: AugmentedSubmittable<(poolId: Compact<LiquidityPoolId> | AnyNumber | Uint8Array, pair: TradingPair | { base?: any; quote?: any } | string | Uint8Array, enabled: Leverages) => SubmittableExtrinsic<ApiType>, [Compact<LiquidityPoolId>, TradingPair, Leverages]>;
      /**
       * Set maximum spread for `pair`.
       * 
       * May only be called from `UpdateOrigin`.
       **/
      setMaxSpread: AugmentedSubmittable<(pair: TradingPair | { base?: any; quote?: any } | string | Uint8Array, maxSpread: Compact<Balance> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [TradingPair, Compact<Balance>]>;
      /**
       * Set minimum leveraged amount to open a position in `pool_id`.
       * 
       * May only be called from the pool owner.
       **/
      setMinLeveragedAmount: AugmentedSubmittable<(poolId: Compact<LiquidityPoolId> | AnyNumber | Uint8Array, amount: Compact<Balance> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [Compact<LiquidityPoolId>, Compact<Balance>]>;
      /**
       * Set bid and ask spread for `pair` in `pool_id`.
       * 
       * May only be called from the pool owner.
       **/
      setSpread: AugmentedSubmittable<(poolId: Compact<LiquidityPoolId> | AnyNumber | Uint8Array, pair: TradingPair | { base?: any; quote?: any } | string | Uint8Array, bid: Compact<Balance> | AnyNumber | Uint8Array, ask: Compact<Balance> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [Compact<LiquidityPoolId>, TradingPair, Compact<Balance>, Compact<Balance>]>;
      /**
       * Set swap rate for `pair`.
       * 
       * May only be called from `UpdateOrigin`.
       **/
      setSwapRate: AugmentedSubmittable<(pair: TradingPair | { base?: any; quote?: any } | string | Uint8Array, rate: SwapRate | { long?: any; short?: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [TradingPair, SwapRate]>;
    };
    marginProtocol: {
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
      /**
       * Close position by id.
       **/
      closePosition: AugmentedSubmittable<(positionId: Compact<PositionId> | AnyNumber | Uint8Array, price: Price | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [Compact<PositionId>, Price]>;
      /**
       * Deposit liquidity to caller's account.
       **/
      deposit: AugmentedSubmittable<(poolId: Compact<LiquidityPoolId> | AnyNumber | Uint8Array, amount: Compact<Balance> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [Compact<LiquidityPoolId>, Compact<Balance>]>;
      /**
       * Remove a pool's margin-called status.
       * 
       * May only be called from none origin. Would fail if the pool is not safe yet.
       **/
      liquidityPoolBecomeSafe: AugmentedSubmittable<(pool: Compact<LiquidityPoolId> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [Compact<LiquidityPoolId>]>;
      /**
       * Force close a liquidity pool.
       * 
       * May only be called from none origin. Would fail if pool ENP or ELL thresholds not reached.
       **/
      liquidityPoolForceClose: AugmentedSubmittable<(pool: Compact<LiquidityPoolId> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [Compact<LiquidityPoolId>]>;
      /**
       * Margin call a liquidity pool.
       * 
       * May only be called from none origin. Would fail if the pool still safe.
       **/
      liquidityPoolMarginCall: AugmentedSubmittable<(pool: Compact<LiquidityPoolId> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [Compact<LiquidityPoolId>]>;
      /**
       * Open a position in `pool_id`.
       **/
      openPosition: AugmentedSubmittable<(poolId: Compact<LiquidityPoolId> | AnyNumber | Uint8Array, pair: TradingPair | { base?: any; quote?: any } | string | Uint8Array, leverage: Leverage | 'LongTwo' | 'LongThree' | 'LongFive' | 'LongTen' | 'LongTwenty' | 'LongThirty' | 'LongFifty' | 'LongReserved' | 'ShortTwo' | 'ShortThree' | 'ShortFive' | 'ShortTen' | 'ShortTwenty' | 'ShortThirty' | 'ShortFifty' | 'ShortReserved' | number | Uint8Array, leveragedAmount: Compact<Balance> | AnyNumber | Uint8Array, price: Price | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [Compact<LiquidityPoolId>, TradingPair, Leverage, Compact<Balance>, Price]>;
      /**
       * Set risk thresholds of a trading pair.
       * 
       * May only be called from `UpdateOrigin`.
       **/
      setTradingPairRiskThreshold: AugmentedSubmittable<(pair: TradingPair | { base?: any; quote?: any } | string | Uint8Array, trader: Option<RiskThreshold> | null | object | string | Uint8Array, enp: Option<RiskThreshold> | null | object | string | Uint8Array, ell: Option<RiskThreshold> | null | object | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [TradingPair, Option<RiskThreshold>, Option<RiskThreshold>, Option<RiskThreshold>]>;
      /**
       * Remove trader's margin-called status.
       * 
       * May only be called from none origin. Would fail if the trader is not safe yet.
       **/
      traderBecomeSafe: AugmentedSubmittable<(who: LookupSource | { Id: any } | { Index: any } | { Raw: any } | { Address32: any } | { Address20: any } | string | Uint8Array, poolId: Compact<LiquidityPoolId> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [LookupSource, Compact<LiquidityPoolId>]>;
      /**
       * Margin call a trader.
       * 
       * May only be called from none origin. Would fail if the trader is still safe.
       **/
      traderMarginCall: AugmentedSubmittable<(who: LookupSource | { Id: any } | { Index: any } | { Raw: any } | { Address32: any } | { Address20: any } | string | Uint8Array, poolId: Compact<LiquidityPoolId> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [LookupSource, Compact<LiquidityPoolId>]>;
      /**
       * Stop out a trader.
       * 
       * May only be called from none origin. Would fail if stop out threshold not reached.
       **/
      traderStopOut: AugmentedSubmittable<(who: LookupSource | { Id: any } | { Index: any } | { Raw: any } | { Address32: any } | { Address20: any } | string | Uint8Array, poolId: Compact<LiquidityPoolId> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [LookupSource, Compact<LiquidityPoolId>]>;
      /**
       * Withdraw liquidity from caller's account.
       **/
      withdraw: AugmentedSubmittable<(poolId: Compact<LiquidityPoolId> | AnyNumber | Uint8Array, amount: Compact<Balance> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [Compact<LiquidityPoolId>, Compact<Balance>]>;
    };
    syntheticLiquidityPools: {
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
      /**
       * Set additional collateral ratio of `currency_id` in `pool_id`.
       * 
       * May only be called from the pool owner.
       **/
      setAdditionalCollateralRatio: AugmentedSubmittable<(poolId: Compact<LiquidityPoolId> | AnyNumber | Uint8Array, currencyId: CurrencyId | 'LAMI' | 'AUSD' | 'DOT' | 'FEUR' | 'FJPY' | 'FBTC' | 'FETH' | 'FAUD' | 'FCAD' | 'FCHF' | 'FXAU' | 'FOIL' | 'FGBP' | number | Uint8Array, ratio: Option<Permill> | null | object | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [Compact<LiquidityPoolId>, CurrencyId, Option<Permill>]>;
      /**
       * Set max spread of `currency_id`.
       * 
       * May only be called from `UpdateOrigin`.
       **/
      setMaxSpread: AugmentedSubmittable<(currencyId: CurrencyId | 'LAMI' | 'AUSD' | 'DOT' | 'FEUR' | 'FJPY' | 'FBTC' | 'FETH' | 'FAUD' | 'FCAD' | 'FCHF' | 'FXAU' | 'FOIL' | 'FGBP' | number | Uint8Array, maxSpread: Compact<Balance> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [CurrencyId, Compact<Balance>]>;
      /**
       * Set minimum additional collateral ratio.
       * 
       * May only be called from `UpdateOrigin`.
       **/
      setMinAdditionalCollateralRatio: AugmentedSubmittable<(ratio: Compact<Permill> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [Compact<Permill>]>;
      /**
       * Set bid and ask spread of `currency_id` in `pool_id`.
       * 
       * May only be called from the pool owner.
       **/
      setSpread: AugmentedSubmittable<(poolId: Compact<LiquidityPoolId> | AnyNumber | Uint8Array, currencyId: CurrencyId | 'LAMI' | 'AUSD' | 'DOT' | 'FEUR' | 'FJPY' | 'FBTC' | 'FETH' | 'FAUD' | 'FCAD' | 'FCHF' | 'FXAU' | 'FOIL' | 'FGBP' | number | Uint8Array, bid: Compact<Balance> | AnyNumber | Uint8Array, ask: Compact<Balance> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [Compact<LiquidityPoolId>, CurrencyId, Compact<Balance>, Compact<Balance>]>;
      /**
       * Enable or disable synthetic of `currency_id` in `pool_id`.
       * 
       * May only be called from the pool owner.
       **/
      setSyntheticEnabled: AugmentedSubmittable<(poolId: Compact<LiquidityPoolId> | AnyNumber | Uint8Array, currencyId: CurrencyId | 'LAMI' | 'AUSD' | 'DOT' | 'FEUR' | 'FJPY' | 'FBTC' | 'FETH' | 'FAUD' | 'FCAD' | 'FCHF' | 'FXAU' | 'FOIL' | 'FGBP' | number | Uint8Array, enabled: bool | boolean | Uint8Array) => SubmittableExtrinsic<ApiType>, [Compact<LiquidityPoolId>, CurrencyId, bool]>;
    };
    syntheticProtocol: {
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
      /**
       * Add collateral to `currency_id` in `pool_id` by `collateral_amount`.
       **/
      addCollateral: AugmentedSubmittable<(poolId: Compact<LiquidityPoolId> | AnyNumber | Uint8Array, currencyId: CurrencyId | 'LAMI' | 'AUSD' | 'DOT' | 'FEUR' | 'FJPY' | 'FBTC' | 'FETH' | 'FAUD' | 'FCAD' | 'FCHF' | 'FXAU' | 'FOIL' | 'FGBP' | number | Uint8Array, collateralAmount: Compact<Balance> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [Compact<LiquidityPoolId>, CurrencyId, Compact<Balance>]>;
      /**
       * Liquidite `currency_id` in `pool_id` by `synthetic_amount`.
       **/
      liquidate: AugmentedSubmittable<(poolId: Compact<LiquidityPoolId> | AnyNumber | Uint8Array, currencyId: CurrencyId | 'LAMI' | 'AUSD' | 'DOT' | 'FEUR' | 'FJPY' | 'FBTC' | 'FETH' | 'FAUD' | 'FCAD' | 'FCHF' | 'FXAU' | 'FOIL' | 'FGBP' | number | Uint8Array, syntheticAmount: Compact<Balance> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [Compact<LiquidityPoolId>, CurrencyId, Compact<Balance>]>;
      /**
       * Mint synthetic tokens.
       **/
      mint: AugmentedSubmittable<(poolId: Compact<LiquidityPoolId> | AnyNumber | Uint8Array, currencyId: CurrencyId | 'LAMI' | 'AUSD' | 'DOT' | 'FEUR' | 'FJPY' | 'FBTC' | 'FETH' | 'FAUD' | 'FCAD' | 'FCHF' | 'FXAU' | 'FOIL' | 'FGBP' | number | Uint8Array, collateralAmount: Compact<Balance> | AnyNumber | Uint8Array, maxPrice: Price | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [Compact<LiquidityPoolId>, CurrencyId, Compact<Balance>, Price]>;
      /**
       * Redeem collateral.
       **/
      redeem: AugmentedSubmittable<(poolId: Compact<LiquidityPoolId> | AnyNumber | Uint8Array, currencyId: CurrencyId | 'LAMI' | 'AUSD' | 'DOT' | 'FEUR' | 'FJPY' | 'FBTC' | 'FETH' | 'FAUD' | 'FCAD' | 'FCHF' | 'FXAU' | 'FOIL' | 'FGBP' | number | Uint8Array, syntheticAmount: Compact<Balance> | AnyNumber | Uint8Array, minPrice: Price | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [Compact<LiquidityPoolId>, CurrencyId, Compact<Balance>, Price]>;
      /**
       * Withdraw all available collateral.
       * 
       * May only be called from the pool owner.
       **/
      withdrawCollateral: AugmentedSubmittable<(poolId: Compact<LiquidityPoolId> | AnyNumber | Uint8Array, currencyId: CurrencyId | 'LAMI' | 'AUSD' | 'DOT' | 'FEUR' | 'FJPY' | 'FBTC' | 'FETH' | 'FAUD' | 'FCAD' | 'FCHF' | 'FXAU' | 'FOIL' | 'FGBP' | number | Uint8Array) => SubmittableExtrinsic<ApiType>, [Compact<LiquidityPoolId>, CurrencyId]>;
    };
    syntheticTokens: {
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
      /**
       * Set collateral ratio.
       * 
       * May only be called from `UpdateOrigin`.
       **/
      setCollateralRatio: AugmentedSubmittable<(currencyId: CurrencyId | 'LAMI' | 'AUSD' | 'DOT' | 'FEUR' | 'FJPY' | 'FBTC' | 'FETH' | 'FAUD' | 'FCAD' | 'FCHF' | 'FXAU' | 'FOIL' | 'FGBP' | number | Uint8Array, ratio: Compact<Permill> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [CurrencyId, Compact<Permill>]>;
      /**
       * Set extreme liquidation ratio.
       * 
       * May only be called from `UpdateOrigin`.
       **/
      setExtremeRatio: AugmentedSubmittable<(currencyId: CurrencyId | 'LAMI' | 'AUSD' | 'DOT' | 'FEUR' | 'FJPY' | 'FBTC' | 'FETH' | 'FAUD' | 'FCAD' | 'FCHF' | 'FXAU' | 'FOIL' | 'FGBP' | number | Uint8Array, ratio: Compact<Permill> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [CurrencyId, Compact<Permill>]>;
      /**
       * Set liquidation ratio.
       * 
       * May only be called from `UpdateOrigin`.
       **/
      setLiquidationRatio: AugmentedSubmittable<(currencyId: CurrencyId | 'LAMI' | 'AUSD' | 'DOT' | 'FEUR' | 'FJPY' | 'FBTC' | 'FETH' | 'FAUD' | 'FCAD' | 'FCHF' | 'FXAU' | 'FOIL' | 'FGBP' | number | Uint8Array, ratio: Compact<Permill> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [CurrencyId, Compact<Permill>]>;
    };
    tokens: {
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
      /**
       * Transfer some balance to another account.
       * 
       * The dispatch origin for this call must be `Signed` by the transactor.
       * 
       * # <weight>
       * - Complexity: `O(1)`
       * - Db reads: 4
       * - Db writes: 2
       * -------------------
       * Base Weight: 84.08 µs
       * # </weight>
       **/
      transfer: AugmentedSubmittable<(dest: LookupSource | { Id: any } | { Index: any } | { Raw: any } | { Address32: any } | { Address20: any } | string | Uint8Array, currencyId: CurrencyId | 'LAMI' | 'AUSD' | 'DOT' | 'FEUR' | 'FJPY' | 'FBTC' | 'FETH' | 'FAUD' | 'FCAD' | 'FCHF' | 'FXAU' | 'FOIL' | 'FGBP' | number | Uint8Array, amount: Compact<Balance> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [LookupSource, CurrencyId, Compact<Balance>]>;
      /**
       * Transfer all remaining balance to the given account.
       * 
       * The dispatch origin for this call must be `Signed` by the transactor.
       * 
       * # <weight>
       * - Complexity: `O(1)`
       * - Db reads: 4
       * - Db writes: 2
       * -------------------
       * Base Weight: 87.71 µs
       * # </weight>
       **/
      transferAll: AugmentedSubmittable<(dest: LookupSource | { Id: any } | { Index: any } | { Raw: any } | { Address32: any } | { Address20: any } | string | Uint8Array, currencyId: CurrencyId | 'LAMI' | 'AUSD' | 'DOT' | 'FEUR' | 'FJPY' | 'FBTC' | 'FETH' | 'FAUD' | 'FCAD' | 'FCHF' | 'FXAU' | 'FOIL' | 'FGBP' | number | Uint8Array) => SubmittableExtrinsic<ApiType>, [LookupSource, CurrencyId]>;
    };
  }

  export interface SubmittableExtrinsics<ApiType extends ApiTypes> extends AugmentedSubmittables<ApiType> {
    (extrinsic: Call | Extrinsic | Uint8Array | string): SubmittableExtrinsic<ApiType>;
    [key: string]: SubmittableModuleExtrinsics<ApiType>;
  }
}
