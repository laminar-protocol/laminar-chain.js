import { fixed18toString, toFixed18 } from '../utils/precision';

describe('precision', () => {
  it('fixed18toString', () => {
    expect(fixed18toString('1')).toEqual('0.000000000000000001');
    expect(fixed18toString('10111112131231111')).toEqual('0.010111112131231111');
    expect(() => fixed18toString('1011111213123111.1')).toThrowError();
    expect(fixed18toString('1011132131200')).toEqual('0.0000010111321312');
    expect(fixed18toString('3786123861283612368136812638172638126381263812638')).toEqual(
      '3786123861283612368136812638172.638126381263812638'
    );
    expect(fixed18toString('3786123861283612368136812638172638126381263812638')).toEqual(
      '3786123861283612368136812638172.638126381263812638'
    );
    expect(() => fixed18toString('3786123861283612368,136812638172638126381263812638')).toThrowError();
  });
  it('toPrecision', () => {
    expect(toFixed18('10').toString()).toEqual('10000000000000000000');
    expect(toFixed18('0.000000000000000000').toString()).toEqual('0');
    expect(toFixed18('0.000000000000000001').toString()).toEqual('1');
    expect(toFixed18('10000000000000000000000000000000').toString()).toEqual(
      '10000000000000000000000000000000000000000000000000'
    );
    expect(() => toFixed18('0.0000000000000000000000000001').toString()).toThrowError();
  });
});
