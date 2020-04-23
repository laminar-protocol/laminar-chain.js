// import { Contract } from 'web3-eth-contract';
import { Observable, of, combineLatest } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { TokenBalance, TokenInfo } from '../types';
import EthereumApi from './EthereumApi';

class Currencies {
  private apiProvider: EthereumApi;
  // private protocol: EthereumApi['protocol'];

  constructor(provider: EthereumApi) {
    this.apiProvider = provider;
    // this.protocol = provider.protocol;
  }

  public oracleValues: undefined;

  public tokens = (): Observable<TokenInfo[]> => {
    return of([
      {
        name: 'DAI',
        displayName: 'DAI',
        precision: 18,
        isBaseToken: true,
        isNetworkToken: false,
        id: 'DAI'
      },
      {
        name: 'EUR',
        displayName: 'Euro',
        precision: 18,
        isBaseToken: false,
        isNetworkToken: false,
        id: 'fEUR'
      },
      {
        name: 'JPY',
        displayName: 'Yen',
        precision: 18,
        isBaseToken: false,
        isNetworkToken: false,
        id: 'fJPY'
      },
      {
        name: 'XAU',
        displayName: 'Gold',
        precision: 18,
        isBaseToken: false,
        isNetworkToken: false,
        id: 'fXAU'
      },
      {
        name: 'AAPL',
        displayName: 'Apple',
        precision: 18,
        isBaseToken: false,
        isNetworkToken: false,
        id: 'fAAPL'
      }
    ]);
  };

  public balances = (address: string): Observable<TokenBalance[]> => {
    return this.tokens().pipe(
      switchMap(tokens => {
        return combineLatest(
          ...tokens.map(({ id }) =>
            this.apiProvider
              .getTokenContract(id)
              .methods.balanceOf(address)
              .call()
              .then((result: any) => {
                return {
                  tokenId: id,
                  free: result
                };
              })
          )
        );
      })
    );
  };
}

export default Currencies;
