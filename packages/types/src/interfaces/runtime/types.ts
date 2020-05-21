// Auto-generated via `yarn polkadot-types-from-defs`, do not edit
/* eslint-disable */

import { ITuple } from '@polkadot/types/types';
import { Compact, Enum, Int, Option, Set, Struct, U8aFixed, Vec } from '@polkadot/types/codec';
import {
  GenericAccountId,
  GenericAccountIndex,
  GenericAddress,
  GenericBlock,
  GenericCall,
  GenericConsensusEngineId
} from '@polkadot/types/generic';
import { Bytes, DoNotConstruct, Null, StorageKey, bool, i128, u128, u32, u64, u8 } from '@polkadot/types/primitive';
import { Price } from '@open-web3/orml-types/interfaces/prices';
import { AuthorityId } from '@polkadot/types/interfaces/consensus';
import { Signature } from '@polkadot/types/interfaces/extrinsics';

/** @name AccountId */
export interface AccountId extends GenericAccountId {}

/** @name AccountIdOf */
export interface AccountIdOf extends AccountId {}

/** @name AccountIndex */
export interface AccountIndex extends GenericAccountIndex {}

/** @name AccumulateConfig */
export interface AccumulateConfig extends Struct {
  readonly frequency: BlockNumber;
  readonly offset: BlockNumber;
}

/** @name Address */
export interface Address extends GenericAddress {}

/** @name Amount */
export interface Amount extends i128 {}

/** @name AmountOf */
export interface AmountOf extends Amount {}

/** @name AssetId */
export interface AssetId extends u32 {}

/** @name Balance */
export interface Balance extends u128 {}

/** @name BalanceOf */
export interface BalanceOf extends Balance {}

/** @name Block */
export interface Block extends GenericBlock {}

/** @name BlockNumber */
export interface BlockNumber extends u32 {}

/** @name Call */
export interface Call extends GenericCall {}

/** @name ChangesTrieConfiguration */
export interface ChangesTrieConfiguration extends Struct {
  readonly digestInterval: u32;
  readonly digestLevels: u32;
}

/** @name Consensus */
export interface Consensus extends ITuple<[ConsensusEngineId, Bytes]> {}

/** @name ConsensusEngineId */
export interface ConsensusEngineId extends GenericConsensusEngineId {}

/** @name CurrencyId */
export interface CurrencyId extends Enum {
  readonly isLami: boolean;
  readonly isAusd: boolean;
  readonly isFeur: boolean;
  readonly isFjpy: boolean;
  readonly isFbtc: boolean;
  readonly isFeth: boolean;
}

/** @name CurrencyIdOf */
export interface CurrencyIdOf extends CurrencyId {}

/** @name Digest */
export interface Digest extends Struct {
  readonly logs: Vec<DigestItem>;
}

/** @name DigestItem */
export interface DigestItem extends Enum {
  readonly isOther: boolean;
  readonly asOther: Bytes;
  readonly isAuthoritiesChange: boolean;
  readonly asAuthoritiesChange: Vec<AuthorityId>;
  readonly isChangesTrieRoot: boolean;
  readonly asChangesTrieRoot: Hash;
  readonly isSealV0: boolean;
  readonly asSealV0: SealV0;
  readonly isConsensus: boolean;
  readonly asConsensus: Consensus;
  readonly isSeal: boolean;
  readonly asSeal: Seal;
  readonly isPreRuntime: boolean;
  readonly asPreRuntime: PreRuntime;
}

/** @name DispatchClass */
export interface DispatchClass extends Enum {
  readonly isNormal: boolean;
  readonly isOperational: boolean;
  readonly isMandatory: boolean;
}

/** @name DispatchInfo */
export interface DispatchInfo extends Struct {
  readonly weight: Weight;
  readonly class: DispatchClass;
  readonly paysFee: Pays;
}

/** @name DispatchInfoTo190 */
export interface DispatchInfoTo190 extends Struct {
  readonly weight: Weight;
  readonly class: DispatchClass;
}

/** @name DispatchInfoTo244 */
export interface DispatchInfoTo244 extends Struct {
  readonly weight: Weight;
  readonly class: DispatchClass;
  readonly paysFee: bool;
}

/** @name ExtrinsicsWeight */
export interface ExtrinsicsWeight extends Struct {
  readonly normal: Weight;
  readonly operational: Weight;
}

/** @name Fixed128 */
export interface Fixed128 extends i128 {}

/** @name Fixed64 */
export interface Fixed64 extends Int {}

/** @name H160 */
export interface H160 extends U8aFixed {}

/** @name H256 */
export interface H256 extends U8aFixed {}

/** @name H512 */
export interface H512 extends U8aFixed {}

/** @name Hash */
export interface Hash extends H256 {}

/** @name Header */
export interface Header extends Struct {
  readonly parentHash: Hash;
  readonly number: Compact<BlockNumber>;
  readonly stateRoot: Hash;
  readonly extrinsicsRoot: Hash;
  readonly digest: Digest;
}

/** @name Index */
export interface Index extends u32 {}

/** @name Justification */
export interface Justification extends Bytes {}

/** @name KeyTypeId */
export interface KeyTypeId extends u32 {}

/** @name KeyValue */
export interface KeyValue extends ITuple<[StorageKey, StorageData]> {}

/** @name Leverage */
export interface Leverage extends Enum {
  readonly isLongTwo: boolean;
  readonly isLongThree: boolean;
  readonly isLongFive: boolean;
  readonly isLongTen: boolean;
  readonly isLongTwenty: boolean;
  readonly isLongThirty: boolean;
  readonly isLongFifty: boolean;
  readonly isLongReserved: boolean;
  readonly isShortTwo: boolean;
  readonly isShortThree: boolean;
  readonly isShortFive: boolean;
  readonly isShortTen: boolean;
  readonly isShortTwenty: boolean;
  readonly isShortThirty: boolean;
  readonly isShortFifty: boolean;
  readonly isShortReserved: boolean;
}

/** @name Leverages */
export interface Leverages extends Set {
  readonly isLongTwo: boolean;
  readonly isLongThree: boolean;
  readonly isLongFive: boolean;
  readonly isLongTen: boolean;
  readonly isLongTwenty: boolean;
  readonly isLongThirty: boolean;
  readonly isLongFifty: boolean;
  readonly isLongReserved: boolean;
  readonly isShortTwo: boolean;
  readonly isShortThree: boolean;
  readonly isShortFive: boolean;
  readonly isShortTen: boolean;
  readonly isShortTwenty: boolean;
  readonly isShortThirty: boolean;
  readonly isShortFifty: boolean;
  readonly isShortReserved: boolean;
}

/** @name LiquidityPoolId */
export interface LiquidityPoolId extends u32 {}

/** @name LockIdentifier */
export interface LockIdentifier extends U8aFixed {}

/** @name LookupSource */
export interface LookupSource extends Address {}

/** @name LookupTarget */
export interface LookupTarget extends AccountId {}

/** @name MarginLiquidityPoolOption */
export interface MarginLiquidityPoolOption extends Struct {
  readonly bidSpread: Spread;
  readonly askSpread: Spread;
  readonly enabledTrades: Leverages;
}

/** @name MarginPosition */
export interface MarginPosition extends Struct {
  readonly owner: AccountId;
  readonly poolId: LiquidityPoolId;
  readonly pair: TradingPair;
  readonly leverage: Leverage;
  readonly leveragedHeld: Fixed128;
  readonly leveragedDebits: Fixed128;
  readonly leveragedDebitsInUsd: Fixed128;
  readonly openAccumulatedSwapRate: Rate;
  readonly marginHeld: Fixed128;
}

/** @name ModuleId */
export interface ModuleId extends LockIdentifier {}

/** @name Moment */
export interface Moment extends u64 {}

/** @name OracleKey */
export interface OracleKey extends CurrencyId {}

/** @name OracleValue */
export interface OracleValue extends Price {}

/** @name Origin */
export interface Origin extends DoNotConstruct {}

/** @name Pays */
export interface Pays extends Enum {
  readonly isYes: boolean;
  readonly isNo: boolean;
}

/** @name Perbill */
export interface Perbill extends u32 {}

/** @name Percent */
export interface Percent extends u8 {}

/** @name Permill */
export interface Permill extends u32 {}

/** @name Perquintill */
export interface Perquintill extends u64 {}

/** @name Phantom */
export interface Phantom extends Null {}

/** @name PhantomData */
export interface PhantomData extends Null {}

/** @name PositionId */
export interface PositionId extends u64 {}

/** @name PreRuntime */
export interface PreRuntime extends ITuple<[ConsensusEngineId, Bytes]> {}

/** @name Rate */
export interface Rate extends Fixed128 {}

/** @name RiskThreshold */
export interface RiskThreshold extends Struct {
  readonly marginCall: Permill;
  readonly stopOut: Permill;
}

/** @name RuntimeDbWeight */
export interface RuntimeDbWeight extends Struct {
  readonly read: Weight;
  readonly write: Weight;
}

/** @name Seal */
export interface Seal extends ITuple<[ConsensusEngineId, Bytes]> {}

/** @name SealV0 */
export interface SealV0 extends ITuple<[u64, Signature]> {}

/** @name SignedBlock */
export interface SignedBlock extends Struct {
  readonly block: Block;
  readonly justification: Justification;
}

/** @name Spread */
export interface Spread extends u128 {}

/** @name StorageData */
export interface StorageData extends Bytes {}

/** @name SwapRate */
export interface SwapRate extends Struct {
  readonly long: Rate;
  readonly short: Rate;
}

/** @name SyntheticLiquidityPoolOption */
export interface SyntheticLiquidityPoolOption extends Struct {
  readonly bidSpread: Spread;
  readonly askSpread: Spread;
  readonly additionalCollateralRatio: Option<Permill>;
  readonly syntheticEnabled: bool;
}

/** @name SyntheticPosition */
export interface SyntheticPosition extends Struct {
  readonly collateral: Balance;
  readonly synthetic: Balance;
}

/** @name TradingPair */
export interface TradingPair extends Struct {
  readonly base: CurrencyId;
  readonly quote: CurrencyId;
}

/** @name ValidatorId */
export interface ValidatorId extends AccountId {}

/** @name Weight */
export interface Weight extends u64 {}

/** @name WeightMultiplier */
export interface WeightMultiplier extends Fixed64 {}

export type PHANTOM_RUNTIME = 'runtime';
