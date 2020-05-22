// Auto-generated via `yarn polkadot-types-from-chain`, do not edit
/* eslint-disable */

import { AnyNumber, ITuple } from '@polkadot/types/types';
import { Compact, Option, Vec } from '@polkadot/types/codec';
import { bool } from '@polkadot/types/primitive';
import { AccountId, AccountIndex, Address, AmountOf, Balance, BalanceOf, BlockNumber, Call, CurrencyId, CurrencyIdOf, Fixed128, Leverage, Leverages, LiquidityPoolId, LookupSource, OracleKey, OracleValue, Permill, PositionId, RiskThreshold, SwapRate, TradingPair } from '@laminar/types/interfaces/runtime';
import { Price } from '@open-web3/orml-types/interfaces/prices';
import { Extrinsic } from '@polkadot/types/interfaces/extrinsics';
import { ApiTypes, SubmittableExtrinsic } from '@polkadot/api/types';

declare module '@polkadot/api/types/submittable' {
  export interface AugmentedSubmittables<ApiType> {
    baseLiquidityPoolsForMargin: {
      [index: string]: SubmittableExtrinsicFunction<ApiType>;
      createPool: AugmentedSubmittable<() => SubmittableExtrinsic<ApiType>>;
      depositLiquidity: AugmentedSubmittable<(poolId: Compact<LiquidityPoolId> | AnyNumber | Uint8Array, amount: Compact<Balance> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      disablePool: AugmentedSubmittable<(poolId: Compact<LiquidityPoolId> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      removePool: AugmentedSubmittable<(poolId: Compact<LiquidityPoolId> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      withdrawLiquidity: AugmentedSubmittable<(poolId: Compact<LiquidityPoolId> | AnyNumber | Uint8Array, amount: Compact<Balance> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>>;
    };
    baseLiquidityPoolsForSynthetic: {
      [index: string]: SubmittableExtrinsicFunction<ApiType>;
      createPool: AugmentedSubmittable<() => SubmittableExtrinsic<ApiType>>;
      depositLiquidity: AugmentedSubmittable<(poolId: Compact<LiquidityPoolId> | AnyNumber | Uint8Array, amount: Compact<Balance> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      disablePool: AugmentedSubmittable<(poolId: Compact<LiquidityPoolId> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      removePool: AugmentedSubmittable<(poolId: Compact<LiquidityPoolId> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      withdrawLiquidity: AugmentedSubmittable<(poolId: Compact<LiquidityPoolId> | AnyNumber | Uint8Array, amount: Compact<Balance> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>>;
    };
    currencies: {
      [index: string]: SubmittableExtrinsicFunction<ApiType>;
      /**
       * Transfer some balance to another account.
       **/
      transfer: AugmentedSubmittable<(dest: LookupSource | Address | AccountId | AccountIndex | string | Uint8Array, currencyId: CurrencyIdOf | 'LAMI'|'AUSD'|'FEUR'|'FJPY'|'FBTC'|'FETH'|'FAUD'|'FCAD'|'FCHF'|'FXAU'|'FOIL' | number | Uint8Array, amount: Compact<BalanceOf> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      /**
       * Transfer native currency balance from one account to another.
       **/
      transferNativeCurrency: AugmentedSubmittable<(dest: LookupSource | Address | AccountId | AccountIndex | string | Uint8Array, amount: Compact<BalanceOf> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      /**
       * Update balance of an account. This is a root call.
       **/
      updateBalance: AugmentedSubmittable<(who: LookupSource | Address | AccountId | AccountIndex | string | Uint8Array, currencyId: CurrencyIdOf | 'LAMI'|'AUSD'|'FEUR'|'FJPY'|'FBTC'|'FETH'|'FAUD'|'FCAD'|'FCHF'|'FXAU'|'FOIL' | number | Uint8Array, amount: AmountOf | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>>;
    };
    marginLiquidityPools: {
      [index: string]: SubmittableExtrinsicFunction<ApiType>;
      disableTradingPair: AugmentedSubmittable<(pair: TradingPair | { base?: any; quote?: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      enableTradingPair: AugmentedSubmittable<(pair: TradingPair | { base?: any; quote?: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      liquidityPoolDisableTradingPair: AugmentedSubmittable<(poolId: Compact<LiquidityPoolId> | AnyNumber | Uint8Array, pair: TradingPair | { base?: any; quote?: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      liquidityPoolEnableTradingPair: AugmentedSubmittable<(poolId: Compact<LiquidityPoolId> | AnyNumber | Uint8Array, pair: TradingPair | { base?: any; quote?: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      setAccumulate: AugmentedSubmittable<(pair: TradingPair | { base?: any; quote?: any } | string | Uint8Array, frequency: BlockNumber | AnyNumber | Uint8Array, offset: BlockNumber | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      setAdditionalSwap: AugmentedSubmittable<(poolId: Compact<LiquidityPoolId> | AnyNumber | Uint8Array, rate: Fixed128 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      setDefaultMinLeveragedAmount: AugmentedSubmittable<(amount: Compact<Balance> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      setEnabledTrades: AugmentedSubmittable<(poolId: Compact<LiquidityPoolId> | AnyNumber | Uint8Array, pair: TradingPair | { base?: any; quote?: any } | string | Uint8Array, enabled: Leverages) => SubmittableExtrinsic<ApiType>>;
      setMaxSpread: AugmentedSubmittable<(pair: TradingPair | { base?: any; quote?: any } | string | Uint8Array, maxSpread: Compact<Balance> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      setMinLeveragedAmount: AugmentedSubmittable<(poolId: Compact<LiquidityPoolId> | AnyNumber | Uint8Array, amount: Compact<Balance> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      setSpread: AugmentedSubmittable<(poolId: Compact<LiquidityPoolId> | AnyNumber | Uint8Array, pair: TradingPair | { base?: any; quote?: any } | string | Uint8Array, bid: Compact<Balance> | AnyNumber | Uint8Array, ask: Compact<Balance> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      setSwapRate: AugmentedSubmittable<(pair: TradingPair | { base?: any; quote?: any } | string | Uint8Array, rate: SwapRate | { long?: any; short?: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>>;
    };
    marginProtocol: {
      [index: string]: SubmittableExtrinsicFunction<ApiType>;
      closePosition: AugmentedSubmittable<(positionId: Compact<PositionId> | AnyNumber | Uint8Array, price: Compact<Price> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      deposit: AugmentedSubmittable<(poolId: Compact<LiquidityPoolId> | AnyNumber | Uint8Array, amount: Compact<Balance> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      liquidityPoolBecomeSafe: AugmentedSubmittable<(pool: Compact<LiquidityPoolId> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      liquidityPoolForceClose: AugmentedSubmittable<(pool: Compact<LiquidityPoolId> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      liquidityPoolMarginCall: AugmentedSubmittable<(pool: Compact<LiquidityPoolId> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      openPosition: AugmentedSubmittable<(poolId: Compact<LiquidityPoolId> | AnyNumber | Uint8Array, pair: TradingPair | { base?: any; quote?: any } | string | Uint8Array, leverage: Leverage | 'LongTwo'|'LongThree'|'LongFive'|'LongTen'|'LongTwenty'|'LongThirty'|'LongFifty'|'LongReserved'|'ShortTwo'|'ShortThree'|'ShortFive'|'ShortTen'|'ShortTwenty'|'ShortThirty'|'ShortFifty'|'ShortReserved' | number | Uint8Array, leveragedAmount: Compact<Balance> | AnyNumber | Uint8Array, price: Compact<Price> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      setTradingPairRiskThreshold: AugmentedSubmittable<(pair: TradingPair | { base?: any; quote?: any } | string | Uint8Array, trader: Option<RiskThreshold> | null | object | string | Uint8Array, enp: Option<RiskThreshold> | null | object | string | Uint8Array, ell: Option<RiskThreshold> | null | object | string | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      traderBecomeSafe: AugmentedSubmittable<(who: LookupSource | Address | AccountId | AccountIndex | string | Uint8Array, poolId: Compact<LiquidityPoolId> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      traderMarginCall: AugmentedSubmittable<(who: LookupSource | Address | AccountId | AccountIndex | string | Uint8Array, poolId: Compact<LiquidityPoolId> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      traderStopOut: AugmentedSubmittable<(who: LookupSource | Address | AccountId | AccountIndex | string | Uint8Array, poolId: Compact<LiquidityPoolId> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      withdraw: AugmentedSubmittable<(poolId: Compact<LiquidityPoolId> | AnyNumber | Uint8Array, amount: Compact<Balance> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>>;
    };
    oracle: {
      [index: string]: SubmittableExtrinsicFunction<ApiType>;
      feedValue: AugmentedSubmittable<(key: OracleKey | 'LAMI'|'AUSD'|'FEUR'|'FJPY'|'FBTC'|'FETH'|'FAUD'|'FCAD'|'FCHF'|'FXAU'|'FOIL' | number | Uint8Array, value: OracleValue | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      feedValues: AugmentedSubmittable<(values: Vec<ITuple<[OracleKey, OracleValue]>> | ([OracleKey | 'LAMI' | 'AUSD' | 'FEUR' | 'FJPY' | 'FBTC' | 'FETH' | 'FAUD' | 'FCAD' | 'FCHF' | 'FXAU' | 'FOIL' | number | Uint8Array, OracleValue | AnyNumber | Uint8Array])[]) => SubmittableExtrinsic<ApiType>>;
    };
    syntheticLiquidityPools: {
      [index: string]: SubmittableExtrinsicFunction<ApiType>;
      setAdditionalCollateralRatio: AugmentedSubmittable<(poolId: Compact<LiquidityPoolId> | AnyNumber | Uint8Array, currencyId: CurrencyId | 'LAMI'|'AUSD'|'FEUR'|'FJPY'|'FBTC'|'FETH'|'FAUD'|'FCAD'|'FCHF'|'FXAU'|'FOIL' | number | Uint8Array, ratio: Option<Permill> | null | object | string | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      setMaxSpread: AugmentedSubmittable<(currencyId: CurrencyId | 'LAMI'|'AUSD'|'FEUR'|'FJPY'|'FBTC'|'FETH'|'FAUD'|'FCAD'|'FCHF'|'FXAU'|'FOIL' | number | Uint8Array, maxSpread: Compact<Balance> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      setMinAdditionalCollateralRatio: AugmentedSubmittable<(ratio: Compact<Permill> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      setSpread: AugmentedSubmittable<(poolId: Compact<LiquidityPoolId> | AnyNumber | Uint8Array, currencyId: CurrencyId | 'LAMI'|'AUSD'|'FEUR'|'FJPY'|'FBTC'|'FETH'|'FAUD'|'FCAD'|'FCHF'|'FXAU'|'FOIL' | number | Uint8Array, bid: Compact<Balance> | AnyNumber | Uint8Array, ask: Compact<Balance> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      setSyntheticEnabled: AugmentedSubmittable<(poolId: Compact<LiquidityPoolId> | AnyNumber | Uint8Array, currencyId: CurrencyId | 'LAMI'|'AUSD'|'FEUR'|'FJPY'|'FBTC'|'FETH'|'FAUD'|'FCAD'|'FCHF'|'FXAU'|'FOIL' | number | Uint8Array, enabled: bool | boolean | Uint8Array) => SubmittableExtrinsic<ApiType>>;
    };
    syntheticProtocol: {
      [index: string]: SubmittableExtrinsicFunction<ApiType>;
      addCollateral: AugmentedSubmittable<(poolId: Compact<LiquidityPoolId> | AnyNumber | Uint8Array, currencyId: CurrencyId | 'LAMI'|'AUSD'|'FEUR'|'FJPY'|'FBTC'|'FETH'|'FAUD'|'FCAD'|'FCHF'|'FXAU'|'FOIL' | number | Uint8Array, collateralAmount: Compact<Balance> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      liquidate: AugmentedSubmittable<(poolId: Compact<LiquidityPoolId> | AnyNumber | Uint8Array, currencyId: CurrencyId | 'LAMI'|'AUSD'|'FEUR'|'FJPY'|'FBTC'|'FETH'|'FAUD'|'FCAD'|'FCHF'|'FXAU'|'FOIL' | number | Uint8Array, syntheticAmount: Compact<Balance> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      mint: AugmentedSubmittable<(poolId: Compact<LiquidityPoolId> | AnyNumber | Uint8Array, currencyId: CurrencyId | 'LAMI'|'AUSD'|'FEUR'|'FJPY'|'FBTC'|'FETH'|'FAUD'|'FCAD'|'FCHF'|'FXAU'|'FOIL' | number | Uint8Array, collateralAmount: Compact<Balance> | AnyNumber | Uint8Array, maxPrice: Compact<Price> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      redeem: AugmentedSubmittable<(poolId: Compact<LiquidityPoolId> | AnyNumber | Uint8Array, currencyId: CurrencyId | 'LAMI'|'AUSD'|'FEUR'|'FJPY'|'FBTC'|'FETH'|'FAUD'|'FCAD'|'FCHF'|'FXAU'|'FOIL' | number | Uint8Array, syntheticAmount: Compact<Balance> | AnyNumber | Uint8Array, minPrice: Compact<Price> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      withdrawCollateral: AugmentedSubmittable<(poolId: Compact<LiquidityPoolId> | AnyNumber | Uint8Array, currencyId: CurrencyId | 'LAMI'|'AUSD'|'FEUR'|'FJPY'|'FBTC'|'FETH'|'FAUD'|'FCAD'|'FCHF'|'FXAU'|'FOIL' | number | Uint8Array) => SubmittableExtrinsic<ApiType>>;
    };
    syntheticTokens: {
      [index: string]: SubmittableExtrinsicFunction<ApiType>;
      setCollateralRatio: AugmentedSubmittable<(currencyId: CurrencyId | 'LAMI'|'AUSD'|'FEUR'|'FJPY'|'FBTC'|'FETH'|'FAUD'|'FCAD'|'FCHF'|'FXAU'|'FOIL' | number | Uint8Array, ratio: Compact<Permill> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      setExtremeRatio: AugmentedSubmittable<(currencyId: CurrencyId | 'LAMI'|'AUSD'|'FEUR'|'FJPY'|'FBTC'|'FETH'|'FAUD'|'FCAD'|'FCHF'|'FXAU'|'FOIL' | number | Uint8Array, ratio: Compact<Permill> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      setLiquidationRatio: AugmentedSubmittable<(currencyId: CurrencyId | 'LAMI'|'AUSD'|'FEUR'|'FJPY'|'FBTC'|'FETH'|'FAUD'|'FCAD'|'FCHF'|'FXAU'|'FOIL' | number | Uint8Array, ratio: Compact<Permill> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>>;
    };
    tokens: {
      [index: string]: SubmittableExtrinsicFunction<ApiType>;
      /**
       * Transfer some balance to another account.
       **/
      transfer: AugmentedSubmittable<(dest: LookupSource | Address | AccountId | AccountIndex | string | Uint8Array, currencyId: CurrencyId | 'LAMI'|'AUSD'|'FEUR'|'FJPY'|'FBTC'|'FETH'|'FAUD'|'FCAD'|'FCHF'|'FXAU'|'FOIL' | number | Uint8Array, amount: Compact<Balance> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      /**
       * Transfer all remaining balance to the given account.
       **/
      transferAll: AugmentedSubmittable<(dest: LookupSource | Address | AccountId | AccountIndex | string | Uint8Array, currencyId: CurrencyId | 'LAMI'|'AUSD'|'FEUR'|'FJPY'|'FBTC'|'FETH'|'FAUD'|'FCAD'|'FCHF'|'FXAU'|'FOIL' | number | Uint8Array) => SubmittableExtrinsic<ApiType>>;
    };
  }

  export interface SubmittableExtrinsics<ApiType extends ApiTypes> extends AugmentedSubmittables<ApiType> {
    (extrinsic: Call | Extrinsic | Uint8Array | string): SubmittableExtrinsic<ApiType>;
    [index: string]: SubmittableModuleExtrinsics<ApiType>;
  }
}
