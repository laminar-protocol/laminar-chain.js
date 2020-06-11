// Auto-generated via `yarn polkadot-types-from-chain`, do not edit
/* eslint-disable */

import { AnyNumber, ITuple } from '@polkadot/types/types';
import { Compact, Option, Vec } from '@polkadot/types/codec';
import { bool, u32 } from '@polkadot/types/primitive';
import { AccountId, AccountIndex, Address, AmountOf, Balance, BalanceOf, Call, CurrencyId, CurrencyIdOf, FixedI128, Leverage, Leverages, LiquidityPoolId, LookupSource, Moment, OracleKey, OracleValue, Permill, PositionId, RiskThreshold, SwapRate, TradingPair } from '@laminar/types/interfaces/runtime';
import { Price } from '@open-web3/orml-types/interfaces/prices';
import { AuthorityId } from '@polkadot/types/interfaces/consensus';
import { Extrinsic, Signature } from '@polkadot/types/interfaces/extrinsics';
import { IdentityInfo } from '@polkadot/types/interfaces/identity';
import { ApiTypes, SubmittableExtrinsic } from '@polkadot/api/types';

declare module '@polkadot/api/types/submittable' {
  export interface AugmentedSubmittables<ApiType> {
    baseLiquidityPoolsForMargin: {
      [index: string]: SubmittableExtrinsicFunction<ApiType>;
      clearIdentity: AugmentedSubmittable<(poolId: Compact<LiquidityPoolId> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      createPool: AugmentedSubmittable<() => SubmittableExtrinsic<ApiType>>;
      depositLiquidity: AugmentedSubmittable<(poolId: Compact<LiquidityPoolId> | AnyNumber | Uint8Array, amount: Compact<Balance> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      disablePool: AugmentedSubmittable<(poolId: Compact<LiquidityPoolId> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      removePool: AugmentedSubmittable<(poolId: Compact<LiquidityPoolId> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      setIdentity: AugmentedSubmittable<(poolId: Compact<LiquidityPoolId> | AnyNumber | Uint8Array, identityInfo: IdentityInfo | { additional?: any; display?: any; legal?: any; web?: any; riot?: any; email?: any; pgpFingerprint?: any; image?: any; twitter?: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      transferLiquidityPool: AugmentedSubmittable<(poolId: Compact<LiquidityPoolId> | AnyNumber | Uint8Array, to: AccountId | string | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      verifyIdentity: AugmentedSubmittable<(poolId: Compact<LiquidityPoolId> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      withdrawLiquidity: AugmentedSubmittable<(poolId: Compact<LiquidityPoolId> | AnyNumber | Uint8Array, amount: Compact<Balance> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>>;
    };
    baseLiquidityPoolsForSynthetic: {
      [index: string]: SubmittableExtrinsicFunction<ApiType>;
      clearIdentity: AugmentedSubmittable<(poolId: Compact<LiquidityPoolId> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      createPool: AugmentedSubmittable<() => SubmittableExtrinsic<ApiType>>;
      depositLiquidity: AugmentedSubmittable<(poolId: Compact<LiquidityPoolId> | AnyNumber | Uint8Array, amount: Compact<Balance> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      disablePool: AugmentedSubmittable<(poolId: Compact<LiquidityPoolId> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      removePool: AugmentedSubmittable<(poolId: Compact<LiquidityPoolId> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      setIdentity: AugmentedSubmittable<(poolId: Compact<LiquidityPoolId> | AnyNumber | Uint8Array, identityInfo: IdentityInfo | { additional?: any; display?: any; legal?: any; web?: any; riot?: any; email?: any; pgpFingerprint?: any; image?: any; twitter?: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      transferLiquidityPool: AugmentedSubmittable<(poolId: Compact<LiquidityPoolId> | AnyNumber | Uint8Array, to: AccountId | string | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      verifyIdentity: AugmentedSubmittable<(poolId: Compact<LiquidityPoolId> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      withdrawLiquidity: AugmentedSubmittable<(poolId: Compact<LiquidityPoolId> | AnyNumber | Uint8Array, amount: Compact<Balance> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>>;
    };
    currencies: {
      [index: string]: SubmittableExtrinsicFunction<ApiType>;
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
       * - Db reads: 2 * `Accounts`
       * - Db writes: 2 * `Accounts`
       * -------------------
       * Base Weight:
       * - non-native currency: 26.72 µs
       * - native currency in worst case: 29.9 µs
       * # </weight>
       **/
      transfer: AugmentedSubmittable<(dest: LookupSource | Address | AccountId | AccountIndex | string | Uint8Array, currencyId: CurrencyIdOf | 'LAMI'|'AUSD'|'FEUR'|'FJPY'|'FBTC'|'FETH'|'FAUD'|'FCAD'|'FCHF'|'FXAU'|'FOIL'|'FGBP' | number | Uint8Array, amount: Compact<BalanceOf> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>>;
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
       * Base Weight: 29.53 µs
       * # </weight>
       **/
      transferNativeCurrency: AugmentedSubmittable<(dest: LookupSource | Address | AccountId | AccountIndex | string | Uint8Array, amount: Compact<BalanceOf> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>>;
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
       * - Db reads: `Accounts`
       * - Db writes: `Accounts`
       * -------------------
       * Base Weight:
       * - non-native currency: 25.36 µs
       * - native currency and killing account: 26.33 µs
       * - native currency and create account: 27.39 µs
       * # </weight>
       **/
      updateBalance: AugmentedSubmittable<(who: LookupSource | Address | AccountId | AccountIndex | string | Uint8Array, currencyId: CurrencyIdOf | 'LAMI'|'AUSD'|'FEUR'|'FJPY'|'FBTC'|'FETH'|'FAUD'|'FCAD'|'FCHF'|'FXAU'|'FOIL'|'FGBP' | number | Uint8Array, amount: AmountOf | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>>;
    };
    marginLiquidityPools: {
      [index: string]: SubmittableExtrinsicFunction<ApiType>;
      disableTradingPair: AugmentedSubmittable<(pair: TradingPair | { base?: any; quote?: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      enableTradingPair: AugmentedSubmittable<(pair: TradingPair | { base?: any; quote?: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      liquidityPoolDisableTradingPair: AugmentedSubmittable<(poolId: Compact<LiquidityPoolId> | AnyNumber | Uint8Array, pair: TradingPair | { base?: any; quote?: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      liquidityPoolEnableTradingPair: AugmentedSubmittable<(poolId: Compact<LiquidityPoolId> | AnyNumber | Uint8Array, pair: TradingPair | { base?: any; quote?: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      setAccumulate: AugmentedSubmittable<(pair: TradingPair | { base?: any; quote?: any } | string | Uint8Array, frequency: Moment | AnyNumber | Uint8Array, offset: Moment | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      setAdditionalSwap: AugmentedSubmittable<(poolId: Compact<LiquidityPoolId> | AnyNumber | Uint8Array, rate: FixedI128 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      setDefaultMinLeveragedAmount: AugmentedSubmittable<(amount: Compact<Balance> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      setEnabledTrades: AugmentedSubmittable<(poolId: Compact<LiquidityPoolId> | AnyNumber | Uint8Array, pair: TradingPair | { base?: any; quote?: any } | string | Uint8Array, enabled: Leverages) => SubmittableExtrinsic<ApiType>>;
      setMaxSpread: AugmentedSubmittable<(pair: TradingPair | { base?: any; quote?: any } | string | Uint8Array, maxSpread: Compact<Balance> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      setMinLeveragedAmount: AugmentedSubmittable<(poolId: Compact<LiquidityPoolId> | AnyNumber | Uint8Array, amount: Compact<Balance> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      setSpread: AugmentedSubmittable<(poolId: Compact<LiquidityPoolId> | AnyNumber | Uint8Array, pair: TradingPair | { base?: any; quote?: any } | string | Uint8Array, bid: Compact<Balance> | AnyNumber | Uint8Array, ask: Compact<Balance> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      setSwapRate: AugmentedSubmittable<(pair: TradingPair | { base?: any; quote?: any } | string | Uint8Array, rate: SwapRate | { long?: any; short?: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>>;
    };
    marginProtocol: {
      [index: string]: SubmittableExtrinsicFunction<ApiType>;
      closePosition: AugmentedSubmittable<(positionId: Compact<PositionId> | AnyNumber | Uint8Array, price: Price | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      deposit: AugmentedSubmittable<(poolId: Compact<LiquidityPoolId> | AnyNumber | Uint8Array, amount: Compact<Balance> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      liquidityPoolBecomeSafe: AugmentedSubmittable<(pool: Compact<LiquidityPoolId> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      liquidityPoolForceClose: AugmentedSubmittable<(pool: Compact<LiquidityPoolId> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      liquidityPoolMarginCall: AugmentedSubmittable<(pool: Compact<LiquidityPoolId> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      openPosition: AugmentedSubmittable<(poolId: Compact<LiquidityPoolId> | AnyNumber | Uint8Array, pair: TradingPair | { base?: any; quote?: any } | string | Uint8Array, leverage: Leverage | 'LongTwo'|'LongThree'|'LongFive'|'LongTen'|'LongTwenty'|'LongThirty'|'LongFifty'|'LongReserved'|'ShortTwo'|'ShortThree'|'ShortFive'|'ShortTen'|'ShortTwenty'|'ShortThirty'|'ShortFifty'|'ShortReserved' | number | Uint8Array, leveragedAmount: Compact<Balance> | AnyNumber | Uint8Array, price: Price | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      setTradingPairRiskThreshold: AugmentedSubmittable<(pair: TradingPair | { base?: any; quote?: any } | string | Uint8Array, trader: Option<RiskThreshold> | null | object | string | Uint8Array, enp: Option<RiskThreshold> | null | object | string | Uint8Array, ell: Option<RiskThreshold> | null | object | string | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      traderBecomeSafe: AugmentedSubmittable<(who: LookupSource | Address | AccountId | AccountIndex | string | Uint8Array, poolId: Compact<LiquidityPoolId> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      traderMarginCall: AugmentedSubmittable<(who: LookupSource | Address | AccountId | AccountIndex | string | Uint8Array, poolId: Compact<LiquidityPoolId> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      traderStopOut: AugmentedSubmittable<(who: LookupSource | Address | AccountId | AccountIndex | string | Uint8Array, poolId: Compact<LiquidityPoolId> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      withdraw: AugmentedSubmittable<(poolId: Compact<LiquidityPoolId> | AnyNumber | Uint8Array, amount: Compact<Balance> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>>;
    };
    oracle: {
      [index: string]: SubmittableExtrinsicFunction<ApiType>;
      feedValues: AugmentedSubmittable<(values: Vec<ITuple<[OracleKey, OracleValue]>> | ([OracleKey | 'LAMI' | 'AUSD' | 'FEUR' | 'FJPY' | 'FBTC' | 'FETH' | 'FAUD' | 'FCAD' | 'FCHF' | 'FXAU' | 'FOIL' | 'FGBP' | number | Uint8Array, OracleValue | AnyNumber | Uint8Array])[], index: Compact<u32> | AnyNumber | Uint8Array, signature: Signature | string | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      setSessionKey: AugmentedSubmittable<(key: AuthorityId | string | Uint8Array) => SubmittableExtrinsic<ApiType>>;
    };
    syntheticLiquidityPools: {
      [index: string]: SubmittableExtrinsicFunction<ApiType>;
      setAdditionalCollateralRatio: AugmentedSubmittable<(poolId: Compact<LiquidityPoolId> | AnyNumber | Uint8Array, currencyId: CurrencyId | 'LAMI'|'AUSD'|'FEUR'|'FJPY'|'FBTC'|'FETH'|'FAUD'|'FCAD'|'FCHF'|'FXAU'|'FOIL'|'FGBP' | number | Uint8Array, ratio: Option<Permill> | null | object | string | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      setMaxSpread: AugmentedSubmittable<(currencyId: CurrencyId | 'LAMI'|'AUSD'|'FEUR'|'FJPY'|'FBTC'|'FETH'|'FAUD'|'FCAD'|'FCHF'|'FXAU'|'FOIL'|'FGBP' | number | Uint8Array, maxSpread: Compact<Balance> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      setMinAdditionalCollateralRatio: AugmentedSubmittable<(ratio: Compact<Permill> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      setSpread: AugmentedSubmittable<(poolId: Compact<LiquidityPoolId> | AnyNumber | Uint8Array, currencyId: CurrencyId | 'LAMI'|'AUSD'|'FEUR'|'FJPY'|'FBTC'|'FETH'|'FAUD'|'FCAD'|'FCHF'|'FXAU'|'FOIL'|'FGBP' | number | Uint8Array, bid: Compact<Balance> | AnyNumber | Uint8Array, ask: Compact<Balance> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      setSyntheticEnabled: AugmentedSubmittable<(poolId: Compact<LiquidityPoolId> | AnyNumber | Uint8Array, currencyId: CurrencyId | 'LAMI'|'AUSD'|'FEUR'|'FJPY'|'FBTC'|'FETH'|'FAUD'|'FCAD'|'FCHF'|'FXAU'|'FOIL'|'FGBP' | number | Uint8Array, enabled: bool | boolean | Uint8Array) => SubmittableExtrinsic<ApiType>>;
    };
    syntheticProtocol: {
      [index: string]: SubmittableExtrinsicFunction<ApiType>;
      addCollateral: AugmentedSubmittable<(poolId: Compact<LiquidityPoolId> | AnyNumber | Uint8Array, currencyId: CurrencyId | 'LAMI'|'AUSD'|'FEUR'|'FJPY'|'FBTC'|'FETH'|'FAUD'|'FCAD'|'FCHF'|'FXAU'|'FOIL'|'FGBP' | number | Uint8Array, collateralAmount: Compact<Balance> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      liquidate: AugmentedSubmittable<(poolId: Compact<LiquidityPoolId> | AnyNumber | Uint8Array, currencyId: CurrencyId | 'LAMI'|'AUSD'|'FEUR'|'FJPY'|'FBTC'|'FETH'|'FAUD'|'FCAD'|'FCHF'|'FXAU'|'FOIL'|'FGBP' | number | Uint8Array, syntheticAmount: Compact<Balance> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      mint: AugmentedSubmittable<(poolId: Compact<LiquidityPoolId> | AnyNumber | Uint8Array, currencyId: CurrencyId | 'LAMI'|'AUSD'|'FEUR'|'FJPY'|'FBTC'|'FETH'|'FAUD'|'FCAD'|'FCHF'|'FXAU'|'FOIL'|'FGBP' | number | Uint8Array, collateralAmount: Compact<Balance> | AnyNumber | Uint8Array, maxPrice: Price | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      redeem: AugmentedSubmittable<(poolId: Compact<LiquidityPoolId> | AnyNumber | Uint8Array, currencyId: CurrencyId | 'LAMI'|'AUSD'|'FEUR'|'FJPY'|'FBTC'|'FETH'|'FAUD'|'FCAD'|'FCHF'|'FXAU'|'FOIL'|'FGBP' | number | Uint8Array, syntheticAmount: Compact<Balance> | AnyNumber | Uint8Array, minPrice: Price | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      withdrawCollateral: AugmentedSubmittable<(poolId: Compact<LiquidityPoolId> | AnyNumber | Uint8Array, currencyId: CurrencyId | 'LAMI'|'AUSD'|'FEUR'|'FJPY'|'FBTC'|'FETH'|'FAUD'|'FCAD'|'FCHF'|'FXAU'|'FOIL'|'FGBP' | number | Uint8Array) => SubmittableExtrinsic<ApiType>>;
    };
    syntheticTokens: {
      [index: string]: SubmittableExtrinsicFunction<ApiType>;
      setCollateralRatio: AugmentedSubmittable<(currencyId: CurrencyId | 'LAMI'|'AUSD'|'FEUR'|'FJPY'|'FBTC'|'FETH'|'FAUD'|'FCAD'|'FCHF'|'FXAU'|'FOIL'|'FGBP' | number | Uint8Array, ratio: Compact<Permill> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      setExtremeRatio: AugmentedSubmittable<(currencyId: CurrencyId | 'LAMI'|'AUSD'|'FEUR'|'FJPY'|'FBTC'|'FETH'|'FAUD'|'FCAD'|'FCHF'|'FXAU'|'FOIL'|'FGBP' | number | Uint8Array, ratio: Compact<Permill> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      setLiquidationRatio: AugmentedSubmittable<(currencyId: CurrencyId | 'LAMI'|'AUSD'|'FEUR'|'FJPY'|'FBTC'|'FETH'|'FAUD'|'FCAD'|'FCHF'|'FXAU'|'FOIL'|'FGBP' | number | Uint8Array, ratio: Compact<Permill> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>>;
    };
    tokens: {
      [index: string]: SubmittableExtrinsicFunction<ApiType>;
      /**
       * Transfer some balance to another account.
       * 
       * The dispatch origin for this call must be `Signed` by the transactor.
       * 
       * # <weight>
       * - Complexity: `O(1)`
       * - Db reads: 2 * `Accounts`
       * - Db writes: 2 * `Accounts`
       * -------------------
       * Base Weight: 26.65 µs
       * # </weight>
       **/
      transfer: AugmentedSubmittable<(dest: LookupSource | Address | AccountId | AccountIndex | string | Uint8Array, currencyId: CurrencyId | 'LAMI'|'AUSD'|'FEUR'|'FJPY'|'FBTC'|'FETH'|'FAUD'|'FCAD'|'FCHF'|'FXAU'|'FOIL'|'FGBP' | number | Uint8Array, amount: Compact<Balance> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      /**
       * Transfer all remaining balance to the given account.
       * 
       * The dispatch origin for this call must be `Signed` by the transactor.
       * 
       * # <weight>
       * - Complexity: `O(1)`
       * - Db reads: 2 * `Accounts`
       * - Db writes: 2 * `Accounts`
       * -------------------
       * Base Weight: 26.99 µs
       * # </weight>
       **/
      transferAll: AugmentedSubmittable<(dest: LookupSource | Address | AccountId | AccountIndex | string | Uint8Array, currencyId: CurrencyId | 'LAMI'|'AUSD'|'FEUR'|'FJPY'|'FBTC'|'FETH'|'FAUD'|'FCAD'|'FCHF'|'FXAU'|'FOIL'|'FGBP' | number | Uint8Array) => SubmittableExtrinsic<ApiType>>;
    };
  }

  export interface SubmittableExtrinsics<ApiType extends ApiTypes> extends AugmentedSubmittables<ApiType> {
    (extrinsic: Call | Extrinsic | Uint8Array | string): SubmittableExtrinsic<ApiType>;
    [index: string]: SubmittableModuleExtrinsics<ApiType>;
  }
}
