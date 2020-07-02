import { combineLatest, Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { OracleValue, TokenBalance, TokenInfo } from '../types';
import LaminarApi from './LaminarApi';

class Currencies {
  private api: LaminarApi['api'];

  constructor(provider: LaminarApi) {
    this.api = provider.api;
  }

  public tokens = (): Observable<TokenInfo[]> => {
    return of([
      {
        name: 'LAMI',
        symbol: 'LAMI',
        precision: 18,
        isBaseToken: false,
        isNetworkToken: true,
        id: 'LAMI'
      },
      {
        name: 'USD',
        symbol: 'USD',
        precision: 18,
        isBaseToken: true,
        isNetworkToken: false,
        id: 'AUSD'
      },
      {
        name: 'EUR',
        symbol: 'EUR',
        precision: 18,
        isBaseToken: false,
        isNetworkToken: false,
        id: 'FEUR'
      },
      {
        name: 'JPY',
        symbol: 'JPY',
        precision: 18,
        isBaseToken: false,
        isNetworkToken: false,
        id: 'FJPY'
      },
      {
        name: 'BTC',
        symbol: 'BTC',
        precision: 18,
        isBaseToken: false,
        isNetworkToken: false,
        id: 'FBTC'
      },
      {
        name: 'ETH',
        symbol: 'ETH',
        precision: 18,
        isBaseToken: false,
        isNetworkToken: false,
        id: 'FETH'
      },
      {
        name: 'AUD',
        symbol: 'AUD',
        precision: 18,
        isBaseToken: false,
        isNetworkToken: false,
        id: 'FAUD'
      },
      {
        name: 'CAD',
        symbol: 'CAD',
        precision: 18,
        isBaseToken: false,
        isNetworkToken: false,
        id: 'FCAD'
      },
      {
        name: 'CHF',
        symbol: 'CHF',
        precision: 18,
        isBaseToken: false,
        isNetworkToken: false,
        id: 'FCHF'
      },
      {
        name: 'XAU',
        symbol: 'XAU',
        precision: 18,
        isBaseToken: false,
        isNetworkToken: false,
        id: 'FXAU'
      },
      {
        name: 'OIL',
        symbol: 'OIL',
        precision: 18,
        isBaseToken: false,
        isNetworkToken: false,
        id: 'FOIL'
      }
      // {
      //   name: 'FGBP',
      //   symbol: 'GBP',
      //   precision: 18,
      //   isBaseToken: false,
      //   isNetworkToken: false,
      //   id: 'FGBP'
      // }
    ]);
  };

  public balances = (address: string): Observable<TokenBalance[]> => {
    return this.tokens().pipe(
      switchMap(tokens => {
        return combineLatest(
          ...tokens.map(({ id }) =>
            (this.api.derive as any).currencies.balance(address, id).pipe(
              map((result: any) => {
                return {
                  tokenId: id,
                  free: result.toString()
                };
              })
            )
          )
        );
      })
    );
  };

  public oracleValues = (): Observable<OracleValue[]> => {
    return this.api.rpc.chain.subscribeNewHeads().pipe(
      switchMap(() => this.tokens()),
      switchMap(tokens => {
        return combineLatest(
          tokens
            .filter(token => !token.isNetworkToken && !token.isBaseToken)
            .map(({ id }) =>
              (this.api.rpc as any).oracle.getValue(id).pipe(
                map(result => {
                  return [id, result];
                })
              )
            )
        );
      }),
      map((values: any) => {
        return values.map(([tokenId, curr]: any) => {
          const result: Partial<OracleValue> = {
            tokenId
          };

          if (!curr.isEmpty) {
            result.timestamp = curr.value.timestamp.toJSON();
            result.value = curr.value.value.toString();
          }

          return result;
        });
      })
    );
  };
}

export default Currencies;
