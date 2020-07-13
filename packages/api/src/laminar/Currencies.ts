import BN from 'bn.js';
import { combineLatest, Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { OracleValue, TokenBalance, TokenId, TokenInfo } from '../types';
import LaminarApi from './LaminarApi';

class Currencies {
  private apiProvider: LaminarApi;
  private api: LaminarApi['api'];

  constructor(provider: LaminarApi) {
    this.apiProvider = provider;
    this.api = provider.api;
  }

  public transfer = async (account: string, dest: string, tokenId: TokenId, amount: string | BN) => {
    const extrinsic = this.api.tx.currencies.transfer(dest, tokenId as any, amount);
    return this.apiProvider.extrinsicHelper(extrinsic, account, { action: 'Transfer' });
  };

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
        symbol: 'AUSD',
        precision: 18,
        isBaseToken: true,
        isNetworkToken: false,
        id: 'AUSD'
      },
      {
        name: 'EUR',
        symbol: 'FEUR',
        precision: 18,
        isBaseToken: false,
        isNetworkToken: false,
        id: 'FEUR'
      },
      {
        name: 'JPY',
        symbol: 'FJPY',
        precision: 18,
        isBaseToken: false,
        isNetworkToken: false,
        id: 'FJPY'
      },
      {
        name: 'BTC',
        symbol: 'FBTC',
        precision: 18,
        isBaseToken: false,
        isNetworkToken: false,
        id: 'FBTC'
      },
      {
        name: 'ETH',
        symbol: 'FETH',
        precision: 18,
        isBaseToken: false,
        isNetworkToken: false,
        id: 'FETH'
      },
      {
        name: 'AUD',
        symbol: 'FAUD',
        precision: 18,
        isBaseToken: false,
        isNetworkToken: false,
        id: 'FAUD'
      },
      {
        name: 'CAD',
        symbol: 'FCAD',
        precision: 18,
        isBaseToken: false,
        isNetworkToken: false,
        id: 'FCAD'
      },
      {
        name: 'CHF',
        symbol: 'FCHF',
        precision: 18,
        isBaseToken: false,
        isNetworkToken: false,
        id: 'FCHF'
      },
      {
        name: 'XAU',
        symbol: 'FXAU',
        precision: 18,
        isBaseToken: false,
        isNetworkToken: false,
        id: 'FXAU'
      },
      {
        name: 'OIL',
        symbol: 'FOIL',
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
