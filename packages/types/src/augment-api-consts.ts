// Auto-generated via `yarn polkadot-types-from-chain`, do not edit
/* eslint-disable @typescript-eslint/no-empty-interface */

import { Codec } from '@polkadot/types/types';
import { Vec } from '@polkadot/types/codec';
import { Bytes, u64 } from '@polkadot/types/primitive';
import { Balance, BalanceOf, BlockNumber, CurrencyId, CurrencyIdOf, Moment, Percent, Permill } from '@laminar/types/interfaces/runtime';
import { SessionIndex } from '@polkadot/types/interfaces/session';
import { EraIndex } from '@polkadot/types/interfaces/staking';

declare module '@polkadot/metadata/Decorated/consts/types' {
  export interface Constants {
    [index: string]: ModuleConstants;
    timestamp: {
      [index: string]: AugmentedConst<object & Codec>;
      /**
       * The minimum period between blocks. Beware that this is different to the *expected* period
       * that the block production apparatus provides. Your chosen consensus system will generally
       * work with this to determine a sensible block time. e.g. For Aura, it will be double this
       * period on default settings.
       **/
      minimumPeriod: AugmentedConst<Moment>;
    };
    babe: {
      [index: string]: AugmentedConst<object & Codec>;
      /**
       * The number of **slots** that an epoch takes. We couple sessions to
       * epochs, i.e. we start a new session once the new epoch begins.
       **/
      epochDuration: AugmentedConst<u64>;
      /**
       * The expected average block time at which BABE should be creating
       * blocks. Since BABE is probabilistic it is not trivial to figure out
       * what the expected average block time should be based on the slot
       * duration and the security parameter `c` (where `1 - c` represents
       * the probability of a slot being empty).
       **/
      expectedBlockTime: AugmentedConst<Moment>;
    };
    balances: {
      [index: string]: AugmentedConst<object & Codec>;
      /**
       * The minimum amount required to keep an account open.
       **/
      existentialDeposit: AugmentedConst<Balance>;
    };
    transactionPayment: {
      [index: string]: AugmentedConst<object & Codec>;
      /**
       * The fee to be paid for making a transaction; the base.
       **/
      transactionBaseFee: AugmentedConst<BalanceOf>;
      /**
       * The fee to be paid for making a transaction; the per-byte portion.
       **/
      transactionByteFee: AugmentedConst<BalanceOf>;
    };
    palletTreasury: {
      [index: string]: AugmentedConst<object & Codec>;
      /**
       * Fraction of a proposal's value that should be bonded in order to place the proposal.
       * An accepted proposal gets these back. A rejected proposal does not.
       **/
      proposalBond: AugmentedConst<Permill>;
      /**
       * Minimum amount of funds that should be placed in a deposit for making a proposal.
       **/
      proposalBondMinimum: AugmentedConst<BalanceOf>;
      /**
       * Period between successive spends.
       **/
      spendPeriod: AugmentedConst<BlockNumber>;
      /**
       * Percentage of spare funds (if any) that are burnt per spend period.
       **/
      burn: AugmentedConst<Permill>;
      /**
       * The period for which a tip remains open after is has achieved threshold tippers.
       **/
      tipCountdown: AugmentedConst<BlockNumber>;
      /**
       * The amount of the final tip which goes to the original reporter of the tip.
       **/
      tipFindersFee: AugmentedConst<Percent>;
      /**
       * The amount held on deposit for placing a tip report.
       **/
      tipReportDepositBase: AugmentedConst<BalanceOf>;
      /**
       * The amount held on deposit per byte within the tip report reason.
       **/
      tipReportDepositPerByte: AugmentedConst<BalanceOf>;
    };
    staking: {
      [index: string]: AugmentedConst<object & Codec>;
      /**
       * Number of sessions per era.
       **/
      sessionsPerEra: AugmentedConst<SessionIndex>;
      /**
       * Number of eras that staked funds must remain bonded for.
       **/
      bondingDuration: AugmentedConst<EraIndex>;
    };
    session: {
      [index: string]: AugmentedConst<object & Codec>;
      /**
       * Used as first key for `NextKeys` and `KeyOwner` to put all the data into the same branch
       * of the trie.
       **/
      dedupKeyPrefix: AugmentedConst<Bytes>;
    };
    currencies: {
      [index: string]: AugmentedConst<object & Codec>;
      nativeCurrencyId: AugmentedConst<CurrencyIdOf>;
    };
    syntheticTokens: {
      [index: string]: AugmentedConst<object & Codec>;
      defaultExtremeRatio: AugmentedConst<Permill>;
      defaultLiquidationRatio: AugmentedConst<Permill>;
      defaultCollateralRatio: AugmentedConst<Permill>;
      syntheticCurrencyIds: AugmentedConst<Vec<CurrencyId>>;
    };
    syntheticProtocol: {
      [index: string]: AugmentedConst<object & Codec>;
      getCollateralCurrencyId: AugmentedConst<CurrencyId>;
    };
    liquidityPools: {
      [index: string]: AugmentedConst<object & Codec>;
      existentialDeposit: AugmentedConst<Balance>;
    };
  }
}
