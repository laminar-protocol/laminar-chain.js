// Auto-generated via `yarn polkadot-types-from-defs`, do not edit
/* eslint-disable */

import type { Bytes, Compact, DoNotConstruct, Enum, GenericAccountId, GenericAccountIndex, GenericBlock, GenericCall, GenericConsensusEngineId, GenericLookupSource, GenericMultiAddress, Int, Null, Option, Set, StorageKey, Struct, U8aFixed, UInt, Vec, bool, u16, u32, u64, u8 } from '@polkadot/types';
import type { ITuple } from '@polkadot/types/types';
import type { Price } from '@open-web3/orml-types/interfaces/traits';
import type { AuthorityId } from '@polkadot/types/interfaces/consensus';
import type { Signature } from '@polkadot/types/interfaces/extrinsics';
import type { SystemOrigin } from '@polkadot/types/interfaces/system';

/** @name AccountId */
export interface AccountId extends GenericAccountId {}

/** @name AccountIdOf */
export interface AccountIdOf extends AccountId {}

/** @name AccountIndex */
export interface AccountIndex extends GenericAccountIndex {}

/** @name AccumulateConfig */
export interface AccumulateConfig extends Struct {
  readonly frequency: Moment;
  readonly offset: Moment;
}

/** @name Address */
export interface Address extends MultiAddress {}

/** @name Amount */
export interface Amount extends FixedI128 {}

/** @name AmountOf */
export interface AmountOf extends Amount {}

/** @name AssetId */
export interface AssetId extends u32 {}

/** @name Balance */
export interface Balance extends UInt {}

/** @name BalanceOf */
export interface BalanceOf extends Balance {}

/** @name Block */
export interface Block extends GenericBlock {}

/** @name BlockNumber */
export interface BlockNumber extends u32 {}

/** @name Call */
export interface Call extends GenericCall {}

/** @name CallHash */
export interface CallHash extends Hash {}

/** @name CallHashOf */
export interface CallHashOf extends CallHash {}

/** @name ChangesTrieConfiguration */
export interface ChangesTrieConfiguration extends Struct {
  readonly digestInterval: u32;
  readonly digestLevels: u32;
}

/** @name CodecHash */
export interface CodecHash extends Hash {}

/** @name Consensus */
export interface Consensus extends ITuple<[ConsensusEngineId, Bytes]> {}

/** @name ConsensusEngineId */
export interface ConsensusEngineId extends GenericConsensusEngineId {}

/** @name CurrencyId */
export interface CurrencyId extends Enum {
  readonly isLami: boolean;
  readonly isAusd: boolean;
  readonly isDot: boolean;
  readonly isFeur: boolean;
  readonly isFjpy: boolean;
  readonly isFbtc: boolean;
  readonly isFeth: boolean;
  readonly isFaud: boolean;
  readonly isFcad: boolean;
  readonly isFchf: boolean;
  readonly isFxau: boolean;
  readonly isFoil: boolean;
  readonly isFgbp: boolean;
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

/** @name EncodedJustification */
export interface EncodedJustification extends Bytes {}

/** @name ExtrinsicsWeight */
export interface ExtrinsicsWeight extends Struct {
  readonly normal: Weight;
  readonly operational: Weight;
}

/** @name Fixed128 */
export interface Fixed128 extends Int {}

/** @name Fixed64 */
export interface Fixed64 extends Int {}

/** @name FixedI128 */
export interface FixedI128 extends Int {}

/** @name FixedI64 */
export interface FixedI64 extends Int {}

/** @name FixedU128 */
export interface FixedU128 extends UInt {}

/** @name FixedU64 */
export interface FixedU64 extends UInt {}

/** @name H1024 */
export interface H1024 extends U8aFixed {}

/** @name H128 */
export interface H128 extends U8aFixed {}

/** @name H160 */
export interface H160 extends U8aFixed {}

/** @name H2048 */
export interface H2048 extends U8aFixed {}

/** @name H256 */
export interface H256 extends U8aFixed {}

/** @name H512 */
export interface H512 extends U8aFixed {}

/** @name H64 */
export interface H64 extends U8aFixed {}

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

/** @name I32F32 */
export interface I32F32 extends Int {}

/** @name IdentityDepositBalanceOf */
export interface IdentityDepositBalanceOf extends Balance {}

/** @name Index */
export interface Index extends u32 {}

/** @name IndicesLookupSource */
export interface IndicesLookupSource extends GenericLookupSource {}

/** @name Justification */
export interface Justification extends ITuple<[ConsensusEngineId, EncodedJustification]> {}

/** @name Justifications */
export interface Justifications extends Vec<Justification> {}

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

/** @name LeveragedAmounts */
export interface LeveragedAmounts extends Struct {
  readonly held: FixedI128;
  readonly debits: FixedI128;
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

/** @name LiquidityPoolIdentityInfo */
export interface LiquidityPoolIdentityInfo extends Struct {
  readonly legalName: Bytes;
  readonly displayName: Bytes;
  readonly web: Bytes;
  readonly email: Bytes;
  readonly image_url: Bytes;
}

/** @name LockIdentifier */
export interface LockIdentifier extends U8aFixed {}

/** @name LookupSource */
export interface LookupSource extends MultiAddress {}

/** @name LookupTarget */
export interface LookupTarget extends AccountId {}

/** @name MarginPoolOption */
export interface MarginPoolOption extends Struct {
  readonly additionalSwapRate: FixedI128;
  readonly minLeveragedAmount: FixedU128;
}

/** @name MarginPoolTradingPairOption */
export interface MarginPoolTradingPairOption extends Struct {
  readonly enabled: bool;
  readonly bidSpread: Option<FixedU128>;
  readonly askSpread: Option<FixedU128>;
  readonly enabledTrades: Leverages;
}

/** @name MarginPosition */
export interface MarginPosition extends Struct {
  readonly owner: AccountId;
  readonly poolId: LiquidityPoolId;
  readonly pair: TradingPair;
  readonly leverage: Leverage;
  readonly leveragedHeld: FixedI128;
  readonly leveragedDebits: FixedI128;
  readonly openAccumulatedSwapRate: Rate;
  readonly marginHeld: FixedI128;
}

/** @name MarginTradingPairOption */
export interface MarginTradingPairOption extends Struct {
  readonly enabled: bool;
  readonly maxSpread: Option<FixedU128>;
  readonly swapRate: SwapRate;
  readonly accumulateConfig: Option<AccumulateConfig>;
}

/** @name ModuleId */
export interface ModuleId extends LockIdentifier {}

/** @name Moment */
export interface Moment extends UInt {}

/** @name MultiAddress */
export interface MultiAddress extends GenericMultiAddress {}

/** @name MultiSigner */
export interface MultiSigner extends Enum {
  readonly isEd25519: boolean;
  readonly asEd25519: U8aFixed;
  readonly isSr25519: boolean;
  readonly asSr25519: U8aFixed;
  readonly isEcdsa: boolean;
  readonly asEcdsa: U8aFixed;
}

/** @name OpaqueCall */
export interface OpaqueCall extends Bytes {}

/** @name OracleKey */
export interface OracleKey extends CurrencyId {}

/** @name OracleValue */
export interface OracleValue extends Price {}

/** @name Origin */
export interface Origin extends DoNotConstruct {}

/** @name OriginCaller */
export interface OriginCaller extends Enum {
  readonly isSystem: boolean;
  readonly asSystem: SystemOrigin;
}

/** @name PairInfo */
export interface PairInfo extends Struct {
  readonly baseAmount: FixedI128;
  readonly quoteAmount: FixedI128;
}

/** @name PalletId */
export interface PalletId extends LockIdentifier {}

/** @name PalletsOrigin */
export interface PalletsOrigin extends OriginCaller {}

/** @name PalletVersion */
export interface PalletVersion extends Struct {
  readonly major: u16;
  readonly minor: u8;
  readonly patch: u8;
}

/** @name Pays */
export interface Pays extends Enum {
  readonly isYes: boolean;
  readonly isNo: boolean;
}

/** @name Perbill */
export interface Perbill extends UInt {}

/** @name Percent */
export interface Percent extends UInt {}

/** @name Permill */
export interface Permill extends UInt {}

/** @name Perquintill */
export interface Perquintill extends UInt {}

/** @name PerU16 */
export interface PerU16 extends UInt {}

/** @name Phantom */
export interface Phantom extends Null {}

/** @name PhantomData */
export interface PhantomData extends Null {}

/** @name Pool */
export interface Pool extends Struct {
  readonly owner: AccountId;
  readonly balance: Balance;
}

/** @name PoolTraderInfo */
export interface PoolTraderInfo extends Struct {
  readonly positionNum: PositionId;
  readonly long: PairInfo;
  readonly short: PairInfo;
}

/** @name PositionId */
export interface PositionId extends u64 {}

/** @name PositionsSnapshot */
export interface PositionsSnapshot extends Struct {
  readonly positionsCount: PositionId;
  readonly long: LeveragedAmounts;
  readonly short: LeveragedAmounts;
}

/** @name PreRuntime */
export interface PreRuntime extends ITuple<[ConsensusEngineId, Bytes]> {}

/** @name Rate */
export interface Rate extends FixedI128 {}

/** @name Releases */
export interface Releases extends Enum {
  readonly isV1: boolean;
  readonly isV2: boolean;
  readonly isV3: boolean;
  readonly isV4: boolean;
  readonly isV5: boolean;
  readonly isV6: boolean;
  readonly isV7: boolean;
  readonly isV8: boolean;
  readonly isV9: boolean;
  readonly isV10: boolean;
}

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
export interface SignedBlock extends SignedBlockWithJustifications {}

/** @name SignedBlockWithJustification */
export interface SignedBlockWithJustification extends Struct {
  readonly block: Block;
  readonly justification: Option<EncodedJustification>;
}

/** @name SignedBlockWithJustifications */
export interface SignedBlockWithJustifications extends Struct {
  readonly block: Block;
  readonly justifications: Option<Justifications>;
}

/** @name Slot */
export interface Slot extends u64 {}

/** @name StorageData */
export interface StorageData extends Bytes {}

/** @name StorageProof */
export interface StorageProof extends Struct {
  readonly trieNodes: Vec<Bytes>;
}

/** @name SwapRate */
export interface SwapRate extends Struct {
  readonly long: Rate;
  readonly short: Rate;
}

/** @name SyntheticPoolCurrencyOption */
export interface SyntheticPoolCurrencyOption extends Struct {
  readonly bidSpread: Option<FixedU128>;
  readonly askSpread: Option<FixedU128>;
  readonly additionalCollateralRatio: Option<Permill>;
  readonly syntheticEnabled: bool;
}

/** @name SyntheticPosition */
export interface SyntheticPosition extends Struct {
  readonly collateral: FixedU128;
  readonly synthetic: FixedU128;
}

/** @name SyntheticTokensRatio */
export interface SyntheticTokensRatio extends Struct {
  readonly extreme: Option<Permill>;
  readonly liquidation: Option<Permill>;
  readonly collateral: Option<Permill>;
}

/** @name TradingPair */
export interface TradingPair extends Struct {
  readonly base: CurrencyId;
  readonly quote: CurrencyId;
}

/** @name TradingPairRiskThreshold */
export interface TradingPairRiskThreshold extends Struct {
  readonly trader: Option<RiskThreshold>;
  readonly enp: Option<RiskThreshold>;
  readonly ell: Option<RiskThreshold>;
}

/** @name TransactionPriority */
export interface TransactionPriority extends u64 {}

/** @name U32F32 */
export interface U32F32 extends UInt {}

/** @name ValidatorId */
export interface ValidatorId extends AccountId {}

/** @name ValidatorIdOf */
export interface ValidatorIdOf extends ValidatorId {}

/** @name Weight */
export interface Weight extends u64 {}

/** @name WeightMultiplier */
export interface WeightMultiplier extends Fixed64 {}

export type PHANTOM_RUNTIME = 'runtime';
