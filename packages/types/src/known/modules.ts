import { OverrideModuleType } from '@polkadot/types/types';

// type overrides for modules (where duplication between modules exist)
const typesModules: Record<string, OverrideModuleType> = {
  syntheticTokens: {
    Position: 'SyntheticPosition'
  },
  marginProtocol: {
    Position: 'MarginPosition'
  },
  baseLiquidityPoolsForMargin: {
    IdentityInfo: 'LiquidityPoolIdentityInfo'
  },
  baseLiquidityPoolsForSynthetic: {
    IdentityInfo: 'LiquidityPoolIdentityInfo'
  }
};

export default typesModules;
