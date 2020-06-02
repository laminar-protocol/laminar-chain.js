import BN from 'bn.js';
import { from, Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { SyntheticPoolInfo, TokenId, TokenInfo } from '../types';
import EthereumApi, { UINT256_MAX } from './EthereumApi';

class Synthetic {
  private apiProvider: EthereumApi;
  private protocol: EthereumApi['protocol'];
  private baseContracts: EthereumApi['baseContracts'];

  constructor(provider: EthereumApi) {
    this.apiProvider = provider;
    this.protocol = provider.protocol;
    this.baseContracts = provider.baseContracts;
  }

  public allowance = (account: string, token: TokenId): Observable<string> => {
    const grantAddress = this.baseContracts.syntheticFlowProtocol.options.address;
    const contract = this.apiProvider.getTokenContract(token);
    return from(contract.methods.allowance(account, grantAddress).call() as Promise<string>);
  };

  public grant = async (account: string, token: TokenId, balance: string | BN = UINT256_MAX) => {
    const grantAddress = this.baseContracts.syntheticFlowProtocol.options.address;
    const contract = this.apiProvider.getTokenContract(token);
    const extrinsic = contract.methods.approve(grantAddress, balance);
    return this.apiProvider.extrinsicHelper(extrinsic, { from: account }, { action: 'Grant' });
  };

  depositLiquidity(account: string, poolId: string, amount: string | BN) {
    const protocol = this.baseContracts.syntheticFlowProtocol;
    const extrinsic = protocol.methods.deposit(amount);
    return this.apiProvider.extrinsicHelper(extrinsic, { from: account }, { action: 'Deposit' });
  }

  withdrawLiquidity(account: string, poolId: string, amount: string | BN) {
    const protocol = this.baseContracts.syntheticFlowProtocol;
    const extrinsic = protocol.methods.withdraw(amount);
    return this.apiProvider.extrinsicHelper(extrinsic, { from: account }, { action: 'Withdraw' });
  }

  poolInfo(poolId: string): Observable<SyntheticPoolInfo | null> {
    const poolInterface = this.apiProvider.getSyntheticPoolInterfaceContract(poolId);
    return this.apiProvider.currencies.tokens().pipe(
      switchMap(async tokens => {
        const owner = await poolInterface.methods.owner().call();
        const getBalance = this.apiProvider.baseTokenContracts.methods.balanceOf(owner).call();
        const enabledTokens = await Promise.all(
          tokens.map(token =>
            poolInterface.methods
              .allowedTokens(token.id)
              .call()
              .then((enabled: boolean) => [token, enabled])
          )
        ).then((results: [TokenInfo, boolean][]) => results.filter(([, enabled]) => enabled).map(([token]) => token));

        const options = await Promise.all(
          enabledTokens.map(token =>
            Promise.all([
              poolInterface.methods.getAdditionalCollateralRatio(token.id).call(),
              poolInterface.methods.getAskSpread(token.id).call(),
              poolInterface.methods.getBidSpread(token.id).call()
            ]).then(([additionalCollateralRatio, askSpread, bidSpread]) => ({
              tokenId: token.id,
              additionalCollateralRatio,
              askSpread,
              bidSpread
            }))
          )
        );

        return {
          poolId: poolInterface.options.address.toLowerCase(),
          owner: owner,
          balance: await getBalance,
          options
        };
      })
    );
  }

  public allPoolIds = () => {
    return of([
      this.protocol.addresses.syntheticPoolGeneral.toLowerCase(),
      this.protocol.addresses.syntheticPoolXYZ.toLowerCase()
    ]);
  };

  public redeem = async (account: string, poolId: string, fromToken: TokenId, amount: string | BN) => {
    const extrinsic = this.baseContracts.syntheticFlowProtocol.methods.redeem(fromToken, poolId, amount);
    return this.apiProvider.extrinsicHelper(extrinsic, { from: account }, { action: 'Swap' });
  };

  public mint = async (account: string, poolId: string, toToken: TokenId, amount: string | BN) => {
    const extrinsic = this.baseContracts.syntheticFlowProtocol.methods.mint(toToken, poolId, amount);
    return this.apiProvider.extrinsicHelper(extrinsic, { from: account }, { action: 'Swap' });
  };
}

export default Synthetic;
