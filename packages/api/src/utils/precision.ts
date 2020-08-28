import BN from 'bn.js';

const zero = new BN(0);
const negative1 = new BN(-1);
const baseLength = 18;
const base = new BN('1'.padEnd(baseLength + 1, '0'), 10);

export const stringToNumber = (arg: string | number) => {
  if (typeof arg === 'string') {
    if (!arg.match(/^-?[0-9.]+$/)) {
      throw new Error(
        `while converting string to number, invalid string value '${arg}', should be a number matching (^-?[0-9.]+).`
      );
    }
    return Number(arg);
  }

  return arg;
};

export const numberToString = (arg: string | number) => {
  if (typeof arg === 'string') {
    if (!arg.match(/^-?[0-9.]+$/)) {
      throw new Error(
        `while converting number to string, invalid number value '${arg}', should be a number matching (^-?[0-9.]+).`
      );
    }
    return arg;
  }

  if (typeof arg !== 'number') {
    throw new Error(`while converting number to string, invalid number value '${arg}' type ${typeof arg}.`);
  }

  return String(arg);
};

export const fixed18toString = (input: string) => {
  let wei: BN;

  if (typeof input === 'string' || typeof input === 'number') {
    if (new BN(input).toString() !== `${input}`) {
      throw new Error(`Expect Input ${input} is an integer`);
    }
    wei = new BN(input);
  } else {
    wei = input;
  }

  const negative = wei.lt(zero);

  if (negative) {
    wei = wei.mul(negative1);
  }

  let fraction = wei.mod(base).toString(10);

  while (fraction.length < baseLength) {
    fraction = `0${fraction}`;
  }

  [, fraction] = fraction.match(/^([0-9]*[1-9]|0)(0*)/) as RegExpMatchArray;

  if (fraction === '0') {
    fraction = '';
  }

  let whole = wei.div(base).toString(10);

  let value = `${whole}${fraction && `.${fraction}`}`;

  if (negative) {
    value = `-${value}`;
  }

  return value;
};

export const toFixed18 = (input: number | string): BN => {
  let ether = numberToString(input);

  // Is it negative?
  const negative = ether.startsWith('-');
  if (negative) {
    ether = ether.substring(1);
  }

  if (ether === '.') {
    throw new Error(`while converting number ${input} with precision ${baseLength}, invalid value`);
  }

  // Split it into a whole and fractional part
  const comps = ether.split('.');

  if (comps.length > 2) {
    throw new Error(`while converting number ${input} with precision ${baseLength},  too many decimal points`);
  }

  let whole = comps[0];
  let fraction = comps[1];

  if (!whole) {
    whole = '0';
  }
  if (!fraction) {
    fraction = '0';
  }
  if (fraction.length > baseLength) {
    throw new Error(`while converting number ${input} with precision ${baseLength}, too many decimal places`);
  }

  while (fraction.length < baseLength) {
    fraction += '0';
  }

  const wholeBN = new BN(whole);
  const fractionBN = new BN(fraction);

  let wei = wholeBN.mul(base).add(fractionBN);

  if (negative) {
    wei = wei.mul(negative1);
  }

  return new BN(wei.toString(10), 10);
};

export const fixed18toNumber = (input: string): number => {
  return Number(fixed18toString(input));
};
