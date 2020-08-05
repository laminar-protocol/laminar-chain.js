import BN from 'bn.js';

export const permillToFixedU128 = (permill: BN) => {
  return permill.mul(new BN(10 ** (18 - 6)));
};
