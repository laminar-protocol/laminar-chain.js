import { combineLatest, Observable, of, from, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { OracleValue, TokenBalance, TokenInfo } from '../types';
import EthereumApi from './EthereumApi';
import { toNumber } from '@laminar/types/utils/precision';

class Currencies {
  private apiProvider: EthereumApi;

  constructor(provider: EthereumApi) {
    this.apiProvider = provider;
  }

  public tokens = (): Observable<TokenInfo[]> => {
    return of([
      {
        name: 'DAI',
        symbol: 'DAI',
        precision: 18,
        isBaseToken: true,
        isNetworkToken: false,
        id: this.apiProvider.tokenContracts.DAI.options.address.toLowerCase()
      },
      {
        name: 'fEUR',
        symbol: 'FEUR',
        precision: 18,
        isBaseToken: false,
        isNetworkToken: false,
        id: this.apiProvider.tokenContracts.FEUR.options.address.toLowerCase()
      },
      {
        name: 'fJPY',
        symbol: 'FJPY',
        precision: 18,
        isBaseToken: false,
        isNetworkToken: false,
        id: this.apiProvider.tokenContracts.FJPY.options.address.toLowerCase()
      },
      {
        name: 'fBTC',
        symbol: 'FBTC',
        precision: 18,
        isBaseToken: false,
        isNetworkToken: false,
        id: this.apiProvider.tokenContracts.FBTC.options.address.toLowerCase()
      },
      {
        name: 'fETH',
        symbol: 'FETH',
        precision: 18,
        isBaseToken: false,
        isNetworkToken: false,
        id: this.apiProvider.tokenContracts.FETH.options.address.toLowerCase()
      },
      {
        name: 'fAUD',
        symbol: 'FAUD',
        precision: 18,
        isBaseToken: false,
        isNetworkToken: false,
        id: this.apiProvider.tokenContracts.FAUD.options.address.toLowerCase()
      },
      {
        name: 'fCAD',
        symbol: 'FCAD',
        precision: 18,
        isBaseToken: false,
        isNetworkToken: false,
        id: this.apiProvider.tokenContracts.FCAD.options.address.toLowerCase()
      },
      {
        name: 'fCHF',
        symbol: 'FCHF',
        precision: 18,
        isBaseToken: false,
        isNetworkToken: false,
        id: this.apiProvider.tokenContracts.FCHF.options.address.toLowerCase()
      },
      {
        name: 'fXAU',
        symbol: 'FXAU',
        precision: 18,
        isBaseToken: false,
        isNetworkToken: false,
        id: this.apiProvider.tokenContracts.FXAU.options.address.toLowerCase()
      },
      {
        name: 'fUSOIL',
        symbol: 'FOIL',
        precision: 18,
        isBaseToken: false,
        isNetworkToken: false,
        id: this.apiProvider.tokenContracts.FOIL.options.address.toLowerCase()
      },
      {
        name: 'fGBP',
        symbol: 'FGBP',
        precision: 18,
        isBaseToken: false,
        isNetworkToken: false,
        id: this.apiProvider.tokenContracts.FGBP.options.address.toLowerCase()
      }
    ]);
  };

  public convertAmountToBase = (amount: string): Observable<string> => {
    return from(
      this.apiProvider.baseContracts.moneyMarket.methods.convertAmountToBase(amount).call() as Promise<string>
    );
  };

  public convertAmountFromBase = (amount: string): Observable<string> => {
    return from(
      this.apiProvider.baseContracts.moneyMarket.methods
        .convertAmountFromBase(amount)
        .call()
        .then() as Promise<string>
    );
  };

  public exchangeRate = (): Observable<number> => {
    return from(
      this.apiProvider.baseContracts.moneyMarket.methods
        .exchangeRate()
        .call()
        .then((result: string) => toNumber(result)) as Promise<number>
    );
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

  public oracleValues = (): Observable<OracleValue[]> => {
    return timer(0, 120000).pipe(
      switchMap(() => this.tokens()),
      switchMap(tokens => {
        const timestamp = +new Date();
        return Promise.all(
          tokens
            .filter(token => !token.isNetworkToken && !token.isBaseToken)
            .map(async ({ id }) => {
              const value = await this.apiProvider.baseContracts.priceOracleInterface.methods.getPrice(id).call();
              return {
                tokenId: id,
                timestamp,
                value: value
              };
            })
        );
      })
    );
  };
}

export default Currencies;
