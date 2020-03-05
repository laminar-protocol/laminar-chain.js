import { fromWei } from 'web3-utils';

import LaminarContract from './LaminarContract';

import {
  PoolInfo,
  TokenInfo,
  FlowApi,
  TokenId,
  TradingPairSymbol,
  PoolOptions,
  TradingPair,
  ChainType,
  ActionStatus
} from '../types';

class EthereumApi extends LaminarContract implements FlowApi {
  public chainType: ChainType = 'ethereum';

  private extrinsicHelper = (
    extrinsic: any,
    signOption: any,
    { action }: { action?: string } = {}
  ): Promise<ActionStatus> => {
    const actionStatus = {
      account: signOption.from,
      action
    } as Partial<ActionStatus>;

    return extrinsic
      .send(signOption)
      .then((result: any) => {
        actionStatus.data = result;
        actionStatus.status = 'success';
      })
      .catch((error: any) => {
        actionStatus.data = error;
        actionStatus.status = 'error';
        actionStatus.message = error && error.message ? error.message : '';
        Promise.reject(actionStatus);
      });
  };

  public isReady = async () => {
    console.log('EthereumApi isReady');
  };

  public getBaseTokenAllowance = async (account: string): Promise<string> => {
    return this.tokenContracts.DAI.methods
      .allowance(account, this.baseContracts.flowMarginProtocol.options.address)
      .call();
  };

  public getTokenAllowance = async (account: string, tokenId: TokenId, address?: string): Promise<string> => {
    const grantAddress = address || this.baseContracts.flowProtocol.options.address;
    const contract = this.getTokenContract(tokenId);
    return contract.methods.allowance(account, grantAddress).call();
  };

  public getBalance = async (address: string, tokenId: TokenId): Promise<string> => {
    return this.getTokenContract(tokenId)
      .methods.balanceOf(address)
      .call();
  };

  public getSpread = async (
    poolId: string,
    tokenId: TokenId
  ): Promise<{
    askSpread: number;
    bidSpread: number;
  }> => {
    const tokenAddr = this.getTokenContract(tokenId).options.address;

    const contract = this.createLiquidityPoolContract(poolId);

    const [askSpread, bidSpread] = await Promise.all<string, string>([
      contract.methods.getAskSpread(tokenAddr).call(),
      contract.methods.getBidSpread(tokenAddr).call()
    ]);

    return { askSpread: Number(fromWei(askSpread)), bidSpread: Number(fromWei(bidSpread)) };
  };

  public getPoolOptions = async (poolId: string, tokenId: TokenId): Promise<PoolOptions> => {
    const tokenAddr = this.getTokenContract(tokenId).options.address;
    const [{ askSpread, bidSpread }, additionalCollateralRatio] = await Promise.all([
      this.getSpread(poolId, tokenId),
      this.createLiquidityPoolContract(poolId)
        .methods.getAdditionalCollateralRatio(tokenAddr)
        .call() as Promise<string>
    ]);

    return {
      poolId,
      tokenId,
      additionalCollateralRatio: Number(additionalCollateralRatio),
      askSpread,
      bidSpread,
      syntheticEnabled: true
    };
  };

  public getLiquidity = async (poolId: string): Promise<string> => {
    return this.tokenContracts.iUSD.methods.balanceOf(poolId).call();
  };

  public openPosition = async (account: string, name: TradingPairSymbol, poolId: string, amount: string | number) => {
    const pairAddress = this.getTradingPairInfo(name).address;
    const extrinsic = this.baseContracts.flowMarginProtocol.methods.openPosition(pairAddress, poolId, amount);
    return this.extrinsicHelper(extrinsic, { from: account }, { action: 'OpenPosition' });
  };

  public closePosition = async (account: string, name: TradingPairSymbol, positionId: number) => {
    const pairAddress = this.getTradingPairInfo(name).address;
    const extrinsic = this.baseContracts.flowMarginProtocol.methods.closePosition(pairAddress, positionId);
    return this.extrinsicHelper(extrinsic, { from: account }, { action: 'ClosePosition' });
  };

  public daiFaucet = async (account: string, amount: number | string) => {
    const extrinsic = this.baseContracts.daiFaucet.methods.allocateTo(account, amount);
    return this.extrinsicHelper(extrinsic, { from: account }, { action: 'Faucet' });
  };

  public redeem = async (account: string, poolId: string, fromTokenId: TokenId, fromAmount: string | number) => {
    const from = this.getTokenContract(fromTokenId);
    const extrinsic = this.baseContracts.flowProtocol.methods.redeem(from.options.address, poolId, fromAmount);
    return this.extrinsicHelper(extrinsic, { from: account }, { action: 'Swap' });
  };

  public mint = async (account: string, poolId: string, toTokenId: TokenId, fromAmount: string | number) => {
    const to = this.getTokenContract(toTokenId);
    const extrinsic = this.baseContracts.flowProtocol.methods.mint(to.options.address, poolId, fromAmount);
    return this.extrinsicHelper(extrinsic, { from: account }, { action: 'Swap' });
  };

  public grant = async (account: string, tokenId: TokenId, balance: string | number) => {
    const extrinsic = this.getTokenContract(tokenId).methods.approve(
      this.baseContracts.flowProtocol.options.address,
      balance
    );
    return this.extrinsicHelper(extrinsic, { from: account }, { action: 'Grant' });
  };

  public getOraclePrice = () => {
    throw new Error('not support');
  };

  public getDefaultPools = async (): Promise<PoolInfo[]> => {
    return [
      {
        id: this.protocol.addresses.pool,
        name: 'Laminar',
        isDefault: true,
        address: this.protocol.addresses.pool
      },
      {
        id: this.protocol.addresses.pool2,
        name: 'ACME',
        isDefault: true,
        address: this.protocol.addresses.pool2
      }
    ];
  };

  public getTokens = async (): Promise<TokenInfo[]> => {
    return [
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
    ];
  };

  public getTradingPairs = async (): Promise<TradingPair[]> => {
    return Object.values(this.protocol.tradingPairs);
  };
}

export default EthereumApi;
