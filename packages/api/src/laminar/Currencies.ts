import { combineLatest, Observable, of, timer } from 'rxjs';
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
        displayName: 'LAMI',
        precision: 18,
        isBaseToken: false,
        isNetworkToken: true,
        id: 'LAMI'
      },
      {
        name: 'AUSD',
        displayName: 'AUSD',
        precision: 18,
        isBaseToken: true,
        isNetworkToken: false,
        id: 'AUSD'
      },
      {
        name: 'EUR',
        displayName: 'Euro',
        precision: 18,
        isBaseToken: false,
        isNetworkToken: false,
        id: 'FEUR'
      },
      {
        name: 'JPY',
        displayName: 'Yen',
        precision: 18,
        isBaseToken: false,
        isNetworkToken: false,
        id: 'FJPY'
      },
      {
        name: 'BTC',
        displayName: 'BTC',
        precision: 18,
        isBaseToken: false,
        isNetworkToken: false,
        id: 'FBTC'
      },
      {
        name: 'ETH',
        displayName: 'ETH',
        precision: 18,
        isBaseToken: false,
        isNetworkToken: false,
        id: 'FETH'
      }
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
    return timer(0, 30000).pipe(
      switchMap(() => this.tokens()),
      switchMap(tokens => {
        return combineLatest(
          tokens
            .filter(token => !token.isNetworkToken)
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
