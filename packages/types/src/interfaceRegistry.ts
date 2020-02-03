import { Compact, Option, Vec } from '@polkadot/types/codec';
import {
  CurrencyId,
  CurrencyIdOf,
  Amount,
  AmountOf,
  OracleKey,
  OracleValue,
  LiquidityPoolId,
  Leverages,
  LiquidityPoolOption,
  Position
} from '@laminar/types/interfaces/runtime';

export interface InterfaceRegistry {
  CurrencyId: CurrencyId;
  'Option<CurrencyId>': Option<CurrencyId>;
  'Vec<CurrencyId>': Vec<CurrencyId>;
  CurrencyIdOf: CurrencyIdOf;
  'Option<CurrencyIdOf>': Option<CurrencyIdOf>;
  'Vec<CurrencyIdOf>': Vec<CurrencyIdOf>;
  Amount: Amount;
  'Option<Amount>': Option<Amount>;
  'Vec<Amount>': Vec<Amount>;
  AmountOf: AmountOf;
  'Option<AmountOf>': Option<AmountOf>;
  'Vec<AmountOf>': Vec<AmountOf>;
  OracleKey: OracleKey;
  'Option<OracleKey>': Option<OracleKey>;
  'Vec<OracleKey>': Vec<OracleKey>;
  OracleValue: OracleValue;
  'Option<OracleValue>': Option<OracleValue>;
  'Vec<OracleValue>': Vec<OracleValue>;
  LiquidityPoolId: LiquidityPoolId;
  'Compact<LiquidityPoolId>': Compact<LiquidityPoolId>;
  'Option<LiquidityPoolId>': Option<LiquidityPoolId>;
  'Vec<LiquidityPoolId>': Vec<LiquidityPoolId>;
  Leverages: Leverages;
  'Compact<Leverages>': Compact<Leverages>;
  'Option<Leverages>': Option<Leverages>;
  'Vec<Leverages>': Vec<Leverages>;
  LiquidityPoolOption: LiquidityPoolOption;
  'Option<LiquidityPoolOption>': Option<LiquidityPoolOption>;
  'Vec<LiquidityPoolOption>': Vec<LiquidityPoolOption>;
  Position: Position;
  'Option<Position>': Option<Position>;
  'Vec<Position>': Vec<Position>;
}
