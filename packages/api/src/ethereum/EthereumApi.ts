import { fromWei } from 'web3-utils';

import LaminarContract from './LaminarContract';

import { PoolInfo, TokenInfo, FlowApi, TokenId, TradingPairSymbol, PoolOptions, TradingPair } from '../types';

class EthereumApi extends LaminarContract implements FlowApi {
  public isReady = async () => true;

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
    return this.baseContracts.flowMarginProtocol.methods
      .openPosition(pairAddress, poolId, amount)
      .send({ from: account });
  };

  public closePosition = async (account: string, name: TradingPairSymbol, positionId: number) => {
    const pairAddress = this.getTradingPairInfo(name).address;
    return this.baseContracts.flowMarginProtocol.methods.closePosition(pairAddress, positionId).send({ from: account });
  };

  public daiFaucet = async (account: string, amount: number | string) => {
    return this.baseContracts.daiFaucet.methods.allocateTo(account, amount).send({ from: account });
  };

  public redeem = async (account: string, poolId: string, fromTokenId: TokenId, fromAmount: string | number) => {
    const from = this.getTokenContract(fromTokenId);
    return this.baseContracts.flowProtocol.methods
      .redeem(from.options.address, poolId, fromAmount)
      .send({ from: account });
  };

  public mint = async (account: string, poolId: string, toTokenId: TokenId, fromAmount: string | number) => {
    const to = this.getTokenContract(toTokenId);
    return this.baseContracts.flowProtocol.methods.mint(to.options.address, poolId, fromAmount).send({ from: account });
  };

  public grant = async (account: string, tokenId: TokenId, balance: string | number) => {
    await this.getTokenContract(tokenId)
      .methods.approve(this.baseContracts.flowProtocol.options.address, balance)
      .send({ from: account });
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
