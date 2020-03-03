// Auto-generated via `yarn polkadot-types-from-chain`, do not edit
/* eslint-disable @typescript-eslint/no-empty-interface */

import { AnyNumber, ITuple } from '@polkadot/types/types';
import { Compact, Option, Vec } from '@polkadot/types/codec';
import { Bytes, bool, u32, u64 } from '@polkadot/types/primitive';
import { AccountId, AccountIndex, Address, AmountOf, Balance, BalanceOf, Call, ChangesTrieConfiguration, CurrencyId, CurrencyIdOf, Hash, KeyValue, Leverages, LiquidityPoolId, LookupSource, Moment, OracleKey, OracleValue, Permill } from '@laminar/types/interfaces/runtime';
import { MemberCount, ProposalIndex } from '@polkadot/types/interfaces/collective';
import { Proposal } from '@polkadot/types/interfaces/democracy';
import { Extrinsic } from '@polkadot/types/interfaces/extrinsics';
import { Keys } from '@polkadot/types/interfaces/session';
import { EraIndex, RewardDestination, ValidatorPrefs } from '@polkadot/types/interfaces/staking';
import { Key } from '@polkadot/types/interfaces/system';
import { ApiTypes, SubmittableExtrinsic } from '@polkadot/api/types';

declare module '@polkadot/api/types/submittable' {
  export interface AugmentedSubmittables<ApiType> {
    system: {
      [index: string]: SubmittableExtrinsicFunction<ApiType>;
      /**
       * A big dispatch that will disallow any other transaction to be included.
       **/
      fillBlock: AugmentedSubmittable<() => SubmittableExtrinsic<ApiType>>;
      /**
       * Make some on-chain remark.
       **/
      remark: AugmentedSubmittable<(remark: Bytes | string | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      /**
       * Set the number of pages in the WebAssembly environment's heap.
       **/
      setHeapPages: AugmentedSubmittable<(pages: u64 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      /**
       * Set the new runtime code.
       **/
      setCode: AugmentedSubmittable<(code: Bytes | string | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      /**
       * Set the new runtime code without doing any checks of the given `code`.
       **/
      setCodeWithoutChecks: AugmentedSubmittable<(code: Bytes | string | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      /**
       * Set the new changes trie configuration.
       **/
      setChangesTrieConfig: AugmentedSubmittable<(changesTrieConfig: Option<ChangesTrieConfiguration> | null | object | string | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      /**
       * Set some items of storage.
       **/
      setStorage: AugmentedSubmittable<(items: Vec<KeyValue> | (KeyValue)[]) => SubmittableExtrinsic<ApiType>>;
      /**
       * Kill some items from storage.
       **/
      killStorage: AugmentedSubmittable<(keys: Vec<Key> | (Key | string | Uint8Array)[]) => SubmittableExtrinsic<ApiType>>;
      /**
       * Kill all storage items with a key that starts with the given prefix.
       **/
      killPrefix: AugmentedSubmittable<(prefix: Key | string | Uint8Array) => SubmittableExtrinsic<ApiType>>;
    };
    timestamp: {
      [index: string]: SubmittableExtrinsicFunction<ApiType>;
      /**
       * Set the current time.
       * This call should be invoked exactly once per block. It will panic at the finalization
       * phase, if this call hasn't been invoked by that time.
       * The timestamp should be greater than the previous one by the amount specified by
       * `MinimumPeriod`.
       * The dispatch origin for this call must be `Inherent`.
       **/
      set: AugmentedSubmittable<(now: Compact<Moment> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>>;
    };
    grandpa: {
      [index: string]: SubmittableExtrinsicFunction<ApiType>;
      /**
       * Report some misbehavior.
       **/
      reportMisbehavior: AugmentedSubmittable<(report: Bytes | string | Uint8Array) => SubmittableExtrinsic<ApiType>>;
    };
    indices: {
      [index: string]: SubmittableExtrinsicFunction<ApiType>;
      /**
       * Assign an previously unassigned index.
       * Payment: `Deposit` is reserved from the sender account.
       * The dispatch origin for this call must be _Signed_.
       * - `index`: the index to be claimed. This must not be in use.
       * Emits `IndexAssigned` if successful.
       * # <weight>
       * - `O(1)`.
       * - One storage mutation (codec `O(1)`).
       * - One reserve operation.
       * - One event.
       * # </weight>
       **/
      claim: AugmentedSubmittable<(index: AccountIndex | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      /**
       * Assign an index already owned by the sender to another account. The balance reservation
       * is effectively transfered to the new account.
       * The dispatch origin for this call must be _Signed_.
       * - `index`: the index to be re-assigned. This must be owned by the sender.
       * - `new`: the new owner of the index. This function is a no-op if it is equal to sender.
       * Emits `IndexAssigned` if successful.
       * # <weight>
       * - `O(1)`.
       * - One storage mutation (codec `O(1)`).
       * - One transfer operation.
       * - One event.
       * # </weight>
       **/
      transfer: AugmentedSubmittable<(updated: AccountId | string | Uint8Array, index: AccountIndex | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      /**
       * Free up an index owned by the sender.
       * Payment: Any previous deposit placed for the index is unreserved in the sender account.
       * The dispatch origin for this call must be _Signed_ and the sender must own the index.
       * - `index`: the index to be freed. This must be owned by the sender.
       * Emits `IndexFreed` if successful.
       * # <weight>
       * - `O(1)`.
       * - One storage mutation (codec `O(1)`).
       * - One reserve operation.
       * - One event.
       * # </weight>
       **/
      free: AugmentedSubmittable<(index: AccountIndex | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      /**
       * Force an index to an account. This doesn't require a deposit. If the index is already
       * held, then any deposit is reimbursed to its current owner.
       * The dispatch origin for this call must be _Root_.
       * - `index`: the index to be (re-)assigned.
       * - `new`: the new owner of the index. This function is a no-op if it is equal to sender.
       * Emits `IndexAssigned` if successful.
       * # <weight>
       * - `O(1)`.
       * - One storage mutation (codec `O(1)`).
       * - Up to one reserve operation.
       * - One event.
       * # </weight>
       **/
      forceTransfer: AugmentedSubmittable<(updated: AccountId | string | Uint8Array, index: AccountIndex | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>>;
    };
    balances: {
      [index: string]: SubmittableExtrinsicFunction<ApiType>;
      /**
       * Transfer some liquid free balance to another account.
       * `transfer` will set the `FreeBalance` of the sender and receiver.
       * It will decrease the total issuance of the system by the `TransferFee`.
       * If the sender's account is below the existential deposit as a result
       * of the transfer, the account will be reaped.
       * The dispatch origin for this call must be `Signed` by the transactor.
       * # <weight>
       * - Dependent on arguments but not critical, given proper implementations for
       * input config types. See related functions below.
       * - It contains a limited number of reads and writes internally and no complex computation.
       * Related functions:
       * - `ensure_can_withdraw` is always called internally but has a bounded complexity.
       * - Transferring balances to accounts that did not exist before will cause
       * `T::OnNewAccount::on_new_account` to be called.
       * - Removing enough funds from an account will trigger `T::DustRemoval::on_unbalanced`.
       * - `transfer_keep_alive` works the same way as `transfer`, but has an additional
       * check that the transfer will not kill the origin account.
       * # </weight>
       **/
      transfer: AugmentedSubmittable<(dest: LookupSource | Address | AccountId | AccountIndex | string | Uint8Array, value: Compact<Balance> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      /**
       * Set the balances of a given account.
       * This will alter `FreeBalance` and `ReservedBalance` in storage. it will
       * also decrease the total issuance of the system (`TotalIssuance`).
       * If the new free or reserved balance is below the existential deposit,
       * it will reset the account nonce (`frame_system::AccountNonce`).
       * The dispatch origin for this call is `root`.
       * # <weight>
       * - Independent of the arguments.
       * - Contains a limited number of reads and writes.
       * # </weight>
       **/
      setBalance: AugmentedSubmittable<(who: LookupSource | Address | AccountId | AccountIndex | string | Uint8Array, newFree: Compact<Balance> | AnyNumber | Uint8Array, newReserved: Compact<Balance> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      /**
       * Exactly as `transfer`, except the origin must be root and the source account may be
       * specified.
       **/
      forceTransfer: AugmentedSubmittable<(source: LookupSource | Address | AccountId | AccountIndex | string | Uint8Array, dest: LookupSource | Address | AccountId | AccountIndex | string | Uint8Array, value: Compact<Balance> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      /**
       * Same as the [`transfer`] call, but with a check that the transfer will not kill the
       * origin account.
       * 99% of the time you want [`transfer`] instead.
       * [`transfer`]: struct.Module.html#method.transfer
       **/
      transferKeepAlive: AugmentedSubmittable<(dest: LookupSource | Address | AccountId | AccountIndex | string | Uint8Array, value: Compact<Balance> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>>;
    };
    sudo: {
      [index: string]: SubmittableExtrinsicFunction<ApiType>;
      /**
       * Authenticates the sudo key and dispatches a function call with `Root` origin.
       * The dispatch origin for this call must be _Signed_.
       * # <weight>
       * - O(1).
       * - Limited storage reads.
       * - One DB write (event).
       * - Unknown weight of derivative `proposal` execution.
       * # </weight>
       **/
      sudo: AugmentedSubmittable<(proposal: Proposal | { callIndex?: any; args?: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      /**
       * Authenticates the current sudo key and sets the given AccountId (`new`) as the new sudo key.
       * The dispatch origin for this call must be _Signed_.
       * # <weight>
       * - O(1).
       * - Limited storage reads.
       * - One DB change.
       * # </weight>
       **/
      setKey: AugmentedSubmittable<(updated: LookupSource | Address | AccountId | AccountIndex | string | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      /**
       * Authenticates the sudo key and dispatches a function call with `Signed` origin from
       * a given account.
       * The dispatch origin for this call must be _Signed_.
       * # <weight>
       * - O(1).
       * - Limited storage reads.
       * - One DB write (event).
       * - Unknown weight of derivative `proposal` execution.
       * # </weight>
       **/
      sudoAs: AugmentedSubmittable<(who: LookupSource | Address | AccountId | AccountIndex | string | Uint8Array, proposal: Proposal | { callIndex?: any; args?: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>>;
    };
    generalCouncil: {
      [index: string]: SubmittableExtrinsicFunction<ApiType>;
      /**
       * Set the collective's membership manually to `new_members`. Be nice to the chain and
       * provide it pre-sorted.
       * Requires root origin.
       **/
      setMembers: AugmentedSubmittable<(newMembers: Vec<AccountId> | (AccountId | string | Uint8Array)[]) => SubmittableExtrinsic<ApiType>>;
      /**
       * Dispatch a proposal from a member using the `Member` origin.
       * Origin must be a member of the collective.
       **/
      execute: AugmentedSubmittable<(proposal: Proposal | { callIndex?: any; args?: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      /**
       * # <weight>
       * - Bounded storage reads and writes.
       * - Argument `threshold` has bearing on weight.
       * # </weight>
       **/
      propose: AugmentedSubmittable<(threshold: Compact<MemberCount> | AnyNumber | Uint8Array, proposal: Proposal | { callIndex?: any; args?: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      /**
       * # <weight>
       * - Bounded storage read and writes.
       * - Will be slightly heavier if the proposal is approved / disapproved after the vote.
       * # </weight>
       **/
      vote: AugmentedSubmittable<(proposal: Hash | string | Uint8Array, index: Compact<ProposalIndex> | AnyNumber | Uint8Array, approve: bool | boolean | Uint8Array) => SubmittableExtrinsic<ApiType>>;
    };
    generalCouncilMembership: {
      [index: string]: SubmittableExtrinsicFunction<ApiType>;
      /**
       * Add a member `who` to the set.
       * May only be called from `AddOrigin` or root.
       **/
      addMember: AugmentedSubmittable<(who: AccountId | string | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      /**
       * Remove a member `who` from the set.
       * May only be called from `RemoveOrigin` or root.
       **/
      removeMember: AugmentedSubmittable<(who: AccountId | string | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      /**
       * Swap out one member `remove` for another `add`.
       * May only be called from `SwapOrigin` or root.
       **/
      swapMember: AugmentedSubmittable<(remove: AccountId | string | Uint8Array, add: AccountId | string | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      /**
       * Change the membership to a new set, disregarding the existing membership. Be nice and
       * pass `members` pre-sorted.
       * May only be called from `ResetOrigin` or root.
       **/
      resetMembers: AugmentedSubmittable<(members: Vec<AccountId> | (AccountId | string | Uint8Array)[]) => SubmittableExtrinsic<ApiType>>;
      /**
       * Swap out the sending member for some other key `new`.
       * May only be called from `Signed` origin of a current member.
       **/
      changeKey: AugmentedSubmittable<(updated: AccountId | string | Uint8Array) => SubmittableExtrinsic<ApiType>>;
    };
    financialCouncil: {
      [index: string]: SubmittableExtrinsicFunction<ApiType>;
      /**
       * Set the collective's membership manually to `new_members`. Be nice to the chain and
       * provide it pre-sorted.
       * Requires root origin.
       **/
      setMembers: AugmentedSubmittable<(newMembers: Vec<AccountId> | (AccountId | string | Uint8Array)[]) => SubmittableExtrinsic<ApiType>>;
      /**
       * Dispatch a proposal from a member using the `Member` origin.
       * Origin must be a member of the collective.
       **/
      execute: AugmentedSubmittable<(proposal: Proposal | { callIndex?: any; args?: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      /**
       * # <weight>
       * - Bounded storage reads and writes.
       * - Argument `threshold` has bearing on weight.
       * # </weight>
       **/
      propose: AugmentedSubmittable<(threshold: Compact<MemberCount> | AnyNumber | Uint8Array, proposal: Proposal | { callIndex?: any; args?: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      /**
       * # <weight>
       * - Bounded storage read and writes.
       * - Will be slightly heavier if the proposal is approved / disapproved after the vote.
       * # </weight>
       **/
      vote: AugmentedSubmittable<(proposal: Hash | string | Uint8Array, index: Compact<ProposalIndex> | AnyNumber | Uint8Array, approve: bool | boolean | Uint8Array) => SubmittableExtrinsic<ApiType>>;
    };
    financialCouncilMembership: {
      [index: string]: SubmittableExtrinsicFunction<ApiType>;
      /**
       * Add a member `who` to the set.
       * May only be called from `AddOrigin` or root.
       **/
      addMember: AugmentedSubmittable<(who: AccountId | string | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      /**
       * Remove a member `who` from the set.
       * May only be called from `RemoveOrigin` or root.
       **/
      removeMember: AugmentedSubmittable<(who: AccountId | string | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      /**
       * Swap out one member `remove` for another `add`.
       * May only be called from `SwapOrigin` or root.
       **/
      swapMember: AugmentedSubmittable<(remove: AccountId | string | Uint8Array, add: AccountId | string | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      /**
       * Change the membership to a new set, disregarding the existing membership. Be nice and
       * pass `members` pre-sorted.
       * May only be called from `ResetOrigin` or root.
       **/
      resetMembers: AugmentedSubmittable<(members: Vec<AccountId> | (AccountId | string | Uint8Array)[]) => SubmittableExtrinsic<ApiType>>;
      /**
       * Swap out the sending member for some other key `new`.
       * May only be called from `Signed` origin of a current member.
       **/
      changeKey: AugmentedSubmittable<(updated: AccountId | string | Uint8Array) => SubmittableExtrinsic<ApiType>>;
    };
    operatorCollective: {
      [index: string]: SubmittableExtrinsicFunction<ApiType>;
      /**
       * Set the collective's membership manually to `new_members`. Be nice to the chain and
       * provide it pre-sorted.
       * Requires root origin.
       **/
      setMembers: AugmentedSubmittable<(newMembers: Vec<AccountId> | (AccountId | string | Uint8Array)[]) => SubmittableExtrinsic<ApiType>>;
      /**
       * Dispatch a proposal from a member using the `Member` origin.
       * Origin must be a member of the collective.
       **/
      execute: AugmentedSubmittable<(proposal: Proposal | { callIndex?: any; args?: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      /**
       * # <weight>
       * - Bounded storage reads and writes.
       * - Argument `threshold` has bearing on weight.
       * # </weight>
       **/
      propose: AugmentedSubmittable<(threshold: Compact<MemberCount> | AnyNumber | Uint8Array, proposal: Proposal | { callIndex?: any; args?: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      /**
       * # <weight>
       * - Bounded storage read and writes.
       * - Will be slightly heavier if the proposal is approved / disapproved after the vote.
       * # </weight>
       **/
      vote: AugmentedSubmittable<(proposal: Hash | string | Uint8Array, index: Compact<ProposalIndex> | AnyNumber | Uint8Array, approve: bool | boolean | Uint8Array) => SubmittableExtrinsic<ApiType>>;
    };
    operatorMembership: {
      [index: string]: SubmittableExtrinsicFunction<ApiType>;
      /**
       * Add a member `who` to the set.
       * May only be called from `AddOrigin` or root.
       **/
      addMember: AugmentedSubmittable<(who: AccountId | string | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      /**
       * Remove a member `who` from the set.
       * May only be called from `RemoveOrigin` or root.
       **/
      removeMember: AugmentedSubmittable<(who: AccountId | string | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      /**
       * Swap out one member `remove` for another `add`.
       * May only be called from `SwapOrigin` or root.
       **/
      swapMember: AugmentedSubmittable<(remove: AccountId | string | Uint8Array, add: AccountId | string | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      /**
       * Change the membership to a new set, disregarding the existing membership. Be nice and
       * pass `members` pre-sorted.
       * May only be called from `ResetOrigin` or root.
       **/
      resetMembers: AugmentedSubmittable<(members: Vec<AccountId> | (AccountId | string | Uint8Array)[]) => SubmittableExtrinsic<ApiType>>;
      /**
       * Swap out the sending member for some other key `new`.
       * May only be called from `Signed` origin of a current member.
       **/
      changeKey: AugmentedSubmittable<(updated: AccountId | string | Uint8Array) => SubmittableExtrinsic<ApiType>>;
    };
    oracle: {
      [index: string]: SubmittableExtrinsicFunction<ApiType>;
      feedValue: AugmentedSubmittable<(key: OracleKey | ('LAMI' | 'AUSD' | 'FEUR' | 'FJPY' | 'FBTC' | 'FETH') | number | Uint8Array, value: OracleValue | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      feedValues: AugmentedSubmittable<(values: Vec<ITuple<[OracleKey, OracleValue]>> | ([OracleKey | ('LAMI' | 'AUSD' | 'FEUR' | 'FJPY' | 'FBTC' | 'FETH') | number | Uint8Array, OracleValue | AnyNumber | Uint8Array])[]) => SubmittableExtrinsic<ApiType>>;
    };
    palletTreasury: {
      [index: string]: SubmittableExtrinsicFunction<ApiType>;
      /**
       * Put forward a suggestion for spending. A deposit proportional to the value
       * is reserved and slashed if the proposal is rejected. It is returned once the
       * proposal is awarded.
       * # <weight>
       * - O(1).
       * - Limited storage reads.
       * - One DB change, one extra DB entry.
       * # </weight>
       **/
      proposeSpend: AugmentedSubmittable<(value: Compact<BalanceOf> | AnyNumber | Uint8Array, beneficiary: LookupSource | Address | AccountId | AccountIndex | string | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      /**
       * Reject a proposed spend. The original deposit will be slashed.
       * # <weight>
       * - O(1).
       * - Limited storage reads.
       * - One DB clear.
       * # </weight>
       **/
      rejectProposal: AugmentedSubmittable<(proposalId: Compact<ProposalIndex> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      /**
       * Approve a proposal. At a later time, the proposal will be allocated to the beneficiary
       * and the original deposit will be returned.
       * # <weight>
       * - O(1).
       * - Limited storage reads.
       * - One DB change.
       * # </weight>
       **/
      approveProposal: AugmentedSubmittable<(proposalId: Compact<ProposalIndex> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      /**
       * Report something `reason` that deserves a tip and claim any eventual the finder's fee.
       * The dispatch origin for this call must be _Signed_.
       * Payment: `TipReportDepositBase` will be reserved from the origin account, as well as
       * `TipReportDepositPerByte` for each byte in `reason`.
       * - `reason`: The reason for, or the thing that deserves, the tip; generally this will be
       * a UTF-8-encoded URL.
       * - `who`: The account which should be credited for the tip.
       * Emits `NewTip` if successful.
       * # <weight>
       * - `O(R)` where `R` length of `reason`.
       * - One balance operation.
       * - One storage mutation (codec `O(R)`).
       * - One event.
       * # </weight>
       **/
      reportAwesome: AugmentedSubmittable<(reason: Bytes | string | Uint8Array, who: AccountId | string | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      /**
       * Retract a prior tip-report from `report_awesome`, and cancel the process of tipping.
       * If successful, the original deposit will be unreserved.
       * The dispatch origin for this call must be _Signed_ and the tip identified by `hash`
       * must have been reported by the signing account through `report_awesome` (and not
       * through `tip_new`).
       * - `hash`: The identity of the open tip for which a tip value is declared. This is formed
       * as the hash of the tuple of the original tip `reason` and the beneficiary account ID.
       * Emits `TipRetracted` if successful.
       * # <weight>
       * - `O(T)`
       * - One balance operation.
       * - Two storage removals (one read, codec `O(T)`).
       * - One event.
       * # </weight>
       **/
      retractTip: AugmentedSubmittable<(hash: Hash | string | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      /**
       * Give a tip for something new; no finder's fee will be taken.
       * The dispatch origin for this call must be _Signed_ and the signing account must be a
       * member of the `Tippers` set.
       * - `reason`: The reason for, or the thing that deserves, the tip; generally this will be
       * a UTF-8-encoded URL.
       * - `who`: The account which should be credited for the tip.
       * - `tip_value`: The amount of tip that the sender would like to give. The median tip
       * value of active tippers will be given to the `who`.
       * Emits `NewTip` if successful.
       * # <weight>
       * - `O(R + T)` where `R` length of `reason`, `T` is the number of tippers. `T` is
       * naturally capped as a membership set, `R` is limited through transaction-size.
       * - Two storage insertions (codecs `O(R)`, `O(T)`), one read `O(1)`.
       * - One event.
       * # </weight>
       **/
      tipNew: AugmentedSubmittable<(reason: Bytes | string | Uint8Array, who: AccountId | string | Uint8Array, tipValue: BalanceOf | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      /**
       * Declare a tip value for an already-open tip.
       * The dispatch origin for this call must be _Signed_ and the signing account must be a
       * member of the `Tippers` set.
       * - `hash`: The identity of the open tip for which a tip value is declared. This is formed
       * as the hash of the tuple of the hash of the original tip `reason` and the beneficiary
       * account ID.
       * - `tip_value`: The amount of tip that the sender would like to give. The median tip
       * value of active tippers will be given to the `who`.
       * Emits `TipClosing` if the threshold of tippers has been reached and the countdown period
       * has started.
       * # <weight>
       * - `O(T)`
       * - One storage mutation (codec `O(T)`), one storage read `O(1)`.
       * - Up to one event.
       * # </weight>
       **/
      tip: AugmentedSubmittable<(hash: Hash | string | Uint8Array, tipValue: BalanceOf | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      /**
       * Close and payout a tip.
       * The dispatch origin for this call must be _Signed_.
       * The tip identified by `hash` must have finished its countdown period.
       * - `hash`: The identity of the open tip for which a tip value is declared. This is formed
       * as the hash of the tuple of the original tip `reason` and the beneficiary account ID.
       * # <weight>
       * - `O(T)`
       * - One storage retrieval (codec `O(T)`) and two removals.
       * - Up to three balance operations.
       * # </weight>
       **/
      closeTip: AugmentedSubmittable<(hash: Hash | string | Uint8Array) => SubmittableExtrinsic<ApiType>>;
    };
    staking: {
      [index: string]: SubmittableExtrinsicFunction<ApiType>;
      /**
       * Take the origin account as a stash and lock up `value` of its balance. `controller` will
       * be the account that controls it.
       * `value` must be more than the `minimum_balance` specified by `T::Currency`.
       * The dispatch origin for this call must be _Signed_ by the stash account.
       * # <weight>
       * - Independent of the arguments. Moderate complexity.
       * - O(1).
       * - Three extra DB entries.
       * NOTE: Two of the storage writes (`Self::bonded`, `Self::payee`) are _never_ cleaned unless
       * the `origin` falls below _existential deposit_ and gets removed as dust.
       * # </weight>
       **/
      bond: AugmentedSubmittable<(controller: LookupSource | Address | AccountId | AccountIndex | string | Uint8Array, value: Compact<BalanceOf> | AnyNumber | Uint8Array, payee: RewardDestination | ('Staked' | 'Stash' | 'Controller') | number | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      /**
       * Add some extra amount that have appeared in the stash `free_balance` into the balance up
       * for staking.
       * Use this if there are additional funds in your stash account that you wish to bond.
       * Unlike [`bond`] or [`unbond`] this function does not impose any limitation on the amount
       * that can be added.
       * The dispatch origin for this call must be _Signed_ by the stash, not the controller.
       * # <weight>
       * - Independent of the arguments. Insignificant complexity.
       * - O(1).
       * - One DB entry.
       * # </weight>
       **/
      bondExtra: AugmentedSubmittable<(maxAdditional: Compact<BalanceOf> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      /**
       * Schedule a portion of the stash to be unlocked ready for transfer out after the bond
       * period ends. If this leaves an amount actively bonded less than
       * T::Currency::minimum_balance(), then it is increased to the full amount.
       * Once the unlock period is done, you can call `withdraw_unbonded` to actually move
       * the funds out of management ready for transfer.
       * No more than a limited number of unlocking chunks (see `MAX_UNLOCKING_CHUNKS`)
       * can co-exists at the same time. In that case, [`Call::withdraw_unbonded`] need
       * to be called first to remove some of the chunks (if possible).
       * The dispatch origin for this call must be _Signed_ by the controller, not the stash.
       * See also [`Call::withdraw_unbonded`].
       * # <weight>
       * - Independent of the arguments. Limited but potentially exploitable complexity.
       * - Contains a limited number of reads.
       * - Each call (requires the remainder of the bonded balance to be above `minimum_balance`)
       * will cause a new entry to be inserted into a vector (`Ledger.unlocking`) kept in storage.
       * The only way to clean the aforementioned storage item is also user-controlled via `withdraw_unbonded`.
       * - One DB entry.
       * </weight>
       **/
      unbond: AugmentedSubmittable<(value: Compact<BalanceOf> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      /**
       * Remove any unlocked chunks from the `unlocking` queue from our management.
       * This essentially frees up that balance to be used by the stash account to do
       * whatever it wants.
       * The dispatch origin for this call must be _Signed_ by the controller, not the stash.
       * See also [`Call::unbond`].
       * # <weight>
       * - Could be dependent on the `origin` argument and how much `unlocking` chunks exist.
       * It implies `consolidate_unlocked` which loops over `Ledger.unlocking`, which is
       * indirectly user-controlled. See [`unbond`] for more detail.
       * - Contains a limited number of reads, yet the size of which could be large based on `ledger`.
       * - Writes are limited to the `origin` account key.
       * # </weight>
       **/
      withdrawUnbonded: AugmentedSubmittable<() => SubmittableExtrinsic<ApiType>>;
      /**
       * Declare the desire to validate for the origin controller.
       * Effects will be felt at the beginning of the next era.
       * The dispatch origin for this call must be _Signed_ by the controller, not the stash.
       * # <weight>
       * - Independent of the arguments. Insignificant complexity.
       * - Contains a limited number of reads.
       * - Writes are limited to the `origin` account key.
       * # </weight>
       **/
      validate: AugmentedSubmittable<(prefs: ValidatorPrefs | { commission?: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      /**
       * Declare the desire to nominate `targets` for the origin controller.
       * Effects will be felt at the beginning of the next era.
       * The dispatch origin for this call must be _Signed_ by the controller, not the stash.
       * # <weight>
       * - The transaction's complexity is proportional to the size of `targets`,
       * which is capped at `MAX_NOMINATIONS`.
       * - Both the reads and writes follow a similar pattern.
       * # </weight>
       **/
      nominate: AugmentedSubmittable<(targets: Vec<LookupSource> | (LookupSource | Address | AccountId | AccountIndex | string | Uint8Array)[]) => SubmittableExtrinsic<ApiType>>;
      /**
       * Declare no desire to either validate or nominate.
       * Effects will be felt at the beginning of the next era.
       * The dispatch origin for this call must be _Signed_ by the controller, not the stash.
       * # <weight>
       * - Independent of the arguments. Insignificant complexity.
       * - Contains one read.
       * - Writes are limited to the `origin` account key.
       * # </weight>
       **/
      chill: AugmentedSubmittable<() => SubmittableExtrinsic<ApiType>>;
      /**
       * (Re-)set the payment target for a controller.
       * Effects will be felt at the beginning of the next era.
       * The dispatch origin for this call must be _Signed_ by the controller, not the stash.
       * # <weight>
       * - Independent of the arguments. Insignificant complexity.
       * - Contains a limited number of reads.
       * - Writes are limited to the `origin` account key.
       * # </weight>
       **/
      setPayee: AugmentedSubmittable<(payee: RewardDestination | ('Staked' | 'Stash' | 'Controller') | number | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      /**
       * (Re-)set the controller of a stash.
       * Effects will be felt at the beginning of the next era.
       * The dispatch origin for this call must be _Signed_ by the stash, not the controller.
       * # <weight>
       * - Independent of the arguments. Insignificant complexity.
       * - Contains a limited number of reads.
       * - Writes are limited to the `origin` account key.
       * # </weight>
       **/
      setController: AugmentedSubmittable<(controller: LookupSource | Address | AccountId | AccountIndex | string | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      /**
       * The ideal number of validators.
       **/
      setValidatorCount: AugmentedSubmittable<(updated: Compact<u32> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      /**
       * Force there to be no new eras indefinitely.
       * # <weight>
       * - No arguments.
       * # </weight>
       **/
      forceNoEras: AugmentedSubmittable<() => SubmittableExtrinsic<ApiType>>;
      /**
       * Force there to be a new era at the end of the next session. After this, it will be
       * reset to normal (non-forced) behaviour.
       * # <weight>
       * - No arguments.
       * # </weight>
       **/
      forceNewEra: AugmentedSubmittable<() => SubmittableExtrinsic<ApiType>>;
      /**
       * Set the validators who cannot be slashed (if any).
       **/
      setInvulnerables: AugmentedSubmittable<(validators: Vec<AccountId> | (AccountId | string | Uint8Array)[]) => SubmittableExtrinsic<ApiType>>;
      /**
       * Force a current staker to become completely unstaked, immediately.
       **/
      forceUnstake: AugmentedSubmittable<(stash: AccountId | string | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      /**
       * Force there to be a new era at the end of sessions indefinitely.
       * # <weight>
       * - One storage write
       * # </weight>
       **/
      forceNewEraAlways: AugmentedSubmittable<() => SubmittableExtrinsic<ApiType>>;
      /**
       * Cancel enactment of a deferred slash. Can be called by either the root origin or
       * the `T::SlashCancelOrigin`.
       * passing the era and indices of the slashes for that era to kill.
       * # <weight>
       * - One storage write.
       * # </weight>
       **/
      cancelDeferredSlash: AugmentedSubmittable<(era: EraIndex | AnyNumber | Uint8Array, slashIndices: Vec<u32> | (u32 | AnyNumber | Uint8Array)[]) => SubmittableExtrinsic<ApiType>>;
      /**
       * Rebond a portion of the stash scheduled to be unlocked.
       * # <weight>
       * - Time complexity: O(1). Bounded by `MAX_UNLOCKING_CHUNKS`.
       * - Storage changes: Can't increase storage, only decrease it.
       * # </weight>
       **/
      rebond: AugmentedSubmittable<(value: Compact<BalanceOf> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>>;
    };
    session: {
      [index: string]: SubmittableExtrinsicFunction<ApiType>;
      /**
       * Sets the session key(s) of the function caller to `keys`.
       * Allows an account to set its session key prior to becoming a validator.
       * This doesn't take effect until the next session.
       * The dispatch origin of this function must be signed.
       * # <weight>
       * - O(log n) in number of accounts.
       * - One extra DB entry.
       * # </weight>
       **/
      setKeys: AugmentedSubmittable<(keys: Keys, proof: Bytes | string | Uint8Array) => SubmittableExtrinsic<ApiType>>;
    };
    tokens: {
      [index: string]: SubmittableExtrinsicFunction<ApiType>;
      /**
       * Transfer some balance to another account.
       **/
      transfer: AugmentedSubmittable<(dest: LookupSource | Address | AccountId | AccountIndex | string | Uint8Array, currencyId: CurrencyId | ('LAMI' | 'AUSD' | 'FEUR' | 'FJPY' | 'FBTC' | 'FETH') | number | Uint8Array, amount: Compact<Balance> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      /**
       * Transfer all remaining balance to the given account.
       **/
      transferAll: AugmentedSubmittable<(dest: LookupSource | Address | AccountId | AccountIndex | string | Uint8Array, currencyId: CurrencyId | ('LAMI' | 'AUSD' | 'FEUR' | 'FJPY' | 'FBTC' | 'FETH') | number | Uint8Array) => SubmittableExtrinsic<ApiType>>;
    };
    currencies: {
      [index: string]: SubmittableExtrinsicFunction<ApiType>;
      /**
       * Transfer some balance to another account.
       **/
      transfer: AugmentedSubmittable<(dest: LookupSource | Address | AccountId | AccountIndex | string | Uint8Array, currencyId: CurrencyIdOf | ('LAMI' | 'AUSD' | 'FEUR' | 'FJPY' | 'FBTC' | 'FETH') | number | Uint8Array, amount: Compact<BalanceOf> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      /**
       * Transfer native currency balance from one account to another.
       **/
      transferNativeCurrency: AugmentedSubmittable<(dest: LookupSource | Address | AccountId | AccountIndex | string | Uint8Array, amount: Compact<BalanceOf> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      /**
       * Update balance of an account. This is a root call.
       **/
      updateBalance: AugmentedSubmittable<(who: LookupSource | Address | AccountId | AccountIndex | string | Uint8Array, currencyId: CurrencyIdOf | ('LAMI' | 'AUSD' | 'FEUR' | 'FJPY' | 'FBTC' | 'FETH') | number | Uint8Array, amount: AmountOf | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>>;
    };
    syntheticTokens: {
      [index: string]: SubmittableExtrinsicFunction<ApiType>;
      setExtremeRatio: AugmentedSubmittable<(currencyId: CurrencyId | ('LAMI' | 'AUSD' | 'FEUR' | 'FJPY' | 'FBTC' | 'FETH') | number | Uint8Array, ratio: Permill | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      setLiquidationRatio: AugmentedSubmittable<(currencyId: CurrencyId | ('LAMI' | 'AUSD' | 'FEUR' | 'FJPY' | 'FBTC' | 'FETH') | number | Uint8Array, ratio: Permill | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      setCollateralRatio: AugmentedSubmittable<(currencyId: CurrencyId | ('LAMI' | 'AUSD' | 'FEUR' | 'FJPY' | 'FBTC' | 'FETH') | number | Uint8Array, ratio: Permill | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>>;
    };
    syntheticProtocol: {
      [index: string]: SubmittableExtrinsicFunction<ApiType>;
      mint: AugmentedSubmittable<(poolId: LiquidityPoolId | AnyNumber | Uint8Array, currencyId: CurrencyId | ('LAMI' | 'AUSD' | 'FEUR' | 'FJPY' | 'FBTC' | 'FETH') | number | Uint8Array, collateralAmount: Balance | AnyNumber | Uint8Array, maxSlippage: Permill | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      redeem: AugmentedSubmittable<(poolId: LiquidityPoolId | AnyNumber | Uint8Array, currencyId: CurrencyId | ('LAMI' | 'AUSD' | 'FEUR' | 'FJPY' | 'FBTC' | 'FETH') | number | Uint8Array, syntheticAmount: Balance | AnyNumber | Uint8Array, maxSlippage: Permill | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      liquidate: AugmentedSubmittable<(poolId: LiquidityPoolId | AnyNumber | Uint8Array, currencyId: CurrencyId | ('LAMI' | 'AUSD' | 'FEUR' | 'FJPY' | 'FBTC' | 'FETH') | number | Uint8Array, syntheticAmount: Balance | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      addCollateral: AugmentedSubmittable<(poolId: LiquidityPoolId | AnyNumber | Uint8Array, currencyId: CurrencyId | ('LAMI' | 'AUSD' | 'FEUR' | 'FJPY' | 'FBTC' | 'FETH') | number | Uint8Array, collateralAmount: Balance | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      withdrawCollateral: AugmentedSubmittable<(poolId: LiquidityPoolId | AnyNumber | Uint8Array, currencyId: CurrencyId | ('LAMI' | 'AUSD' | 'FEUR' | 'FJPY' | 'FBTC' | 'FETH') | number | Uint8Array) => SubmittableExtrinsic<ApiType>>;
    };
    liquidityPools: {
      [index: string]: SubmittableExtrinsicFunction<ApiType>;
      createPool: AugmentedSubmittable<() => SubmittableExtrinsic<ApiType>>;
      disablePool: AugmentedSubmittable<(poolId: LiquidityPoolId | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      removePool: AugmentedSubmittable<(poolId: LiquidityPoolId | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      depositLiquidity: AugmentedSubmittable<(poolId: LiquidityPoolId | AnyNumber | Uint8Array, amount: Balance | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      withdrawLiquidity: AugmentedSubmittable<(poolId: LiquidityPoolId | AnyNumber | Uint8Array, amount: Balance | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      setSpread: AugmentedSubmittable<(poolId: LiquidityPoolId | AnyNumber | Uint8Array, currencyId: CurrencyId | ('LAMI' | 'AUSD' | 'FEUR' | 'FJPY' | 'FBTC' | 'FETH') | number | Uint8Array, ask: Permill | AnyNumber | Uint8Array, bid: Permill | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      setAdditionalCollateralRatio: AugmentedSubmittable<(poolId: LiquidityPoolId | AnyNumber | Uint8Array, currencyId: CurrencyId | ('LAMI' | 'AUSD' | 'FEUR' | 'FJPY' | 'FBTC' | 'FETH') | number | Uint8Array, ratio: Option<Permill> | null | object | string | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      setEnabledTrades: AugmentedSubmittable<(poolId: LiquidityPoolId | AnyNumber | Uint8Array, currencyId: CurrencyId | ('LAMI' | 'AUSD' | 'FEUR' | 'FJPY' | 'FBTC' | 'FETH') | number | Uint8Array, enabled: Leverages | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      setMinAdditionalCollateralRatio: AugmentedSubmittable<(ratio: Permill | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      setSyntheticEnabled: AugmentedSubmittable<(poolId: LiquidityPoolId | AnyNumber | Uint8Array, currencyId: CurrencyId | ('LAMI' | 'AUSD' | 'FEUR' | 'FJPY' | 'FBTC' | 'FETH') | number | Uint8Array, enabled: bool | boolean | Uint8Array) => SubmittableExtrinsic<ApiType>>;
    };
  }

  export interface SubmittableExtrinsics<ApiType extends ApiTypes> extends AugmentedSubmittables<ApiType> {
    (extrinsic: Call | Extrinsic | Uint8Array | string): SubmittableExtrinsic<ApiType>;
    [index: string]: SubmittableModuleExtrinsics<ApiType>;
  }
}
