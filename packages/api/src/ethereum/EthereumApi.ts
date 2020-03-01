import BN from 'bn.js';
import { fromWei } from 'web3-utils';

import LaminarContract from './LaminarContract';

import { PoolInfo, TokenInfo, FlowApi, TokenName, TradingPairSymbol, PoolOptions } from '../types';

class EthereumApi extends LaminarContract implements FlowApi {
  public isReady = async () => {};

  public getBaseTokenAllowance = async (account: string): Promise<string> => {
    return this.tokenContracts.DAI.methods
      .allowance(account, this.baseContracts.flowMarginProtocol.options.address)
      .call();
  };

  public getTokenAllowance = async (account: string, tokenName: TokenName, address?: string): Promise<string> => {
    const grantAddress = address || this.baseContracts.flowProtocol.options.address;
    const contract = this.getTokenContract(tokenName);
    return contract.methods.allowance(account, grantAddress).call();
  };

  public getBalance = async (address: string, tokenName: TokenName): Promise<string> => {
    return this.getTokenContract(tokenName)
      .methods.balanceOf(address)
      .call();
  };

  public getSpread = async (
    poolAddr: string,
    tokenName: TokenName
  ): Promise<{
    askSpread: number;
    bidSpread: number;
  }> => {
    const tokenAddr = this.getTokenContract(tokenName).options.address;

    const contract = this.createLiquidityPoolContract(poolAddr);

    const [askSpread, bidSpread] = await Promise.all<string, string>([
      contract.methods.getAskSpread(tokenAddr).call(),
      contract.methods.getBidSpread(tokenAddr).call()
    ]);

    return { askSpread: Number(fromWei(askSpread)), bidSpread: Number(fromWei(bidSpread)) };
  };

  public getPoolOptions = async (poolAddr: string, tokenName: TokenName): Promise<PoolOptions> => {
    const tokenAddr = this.getTokenContract(tokenName).options.address;

    const [{ askSpread, bidSpread }, additionalCollateralRatio] = await Promise.all([
      this.getSpread(poolAddr, tokenName),
      this.createLiquidityPoolContract(poolAddr)
        .methods.getAdditionalCollateralRatio(tokenAddr)
        .call() as Promise<string>
    ]);

    return {
      additionalCollateralRatio: Number(additionalCollateralRatio),
      askSpread,
      bidSpread
    };
  };

  public getTokenLiquidity = async (poolId: string, tokenName: TokenName): Promise<string> => {
    const tokenAddr = this.getTokenContract(tokenName).options.address;
    const contract = this.createLiquidityPoolContract(poolId);

    const [ratio, amount] = await Promise.all<number, string>([
      contract.methods.getAdditionalCollateralRatio(tokenAddr).call(),
      this.tokenContracts.iUSD.methods.balanceOf(poolId).call()
    ]);

    return new BN(amount).mul(new BN(ratio + 1)).toString();
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

  public redeem = async (account: string, poolId: string, fromTokenName: TokenName, fromAmount: string | number) => {
    const from = this.getTokenContract(fromTokenName);
    return this.baseContracts.flowProtocol.methods
      .redeem(from.options.address, poolId, fromAmount)
      .send({ from: account });
  };

  public mint = async (account: string, poolId: string, toTokenName: TokenName, fromAmount: string | number) => {
    const to = this.getTokenContract(toTokenName);
    return this.baseContracts.flowProtocol.methods.mint(to.options.address, poolId, fromAmount).send({ from: account });
  };

  public grant = async (account: string, tokenName: TokenName, balance: string | number) => {
    await this.getTokenContract(tokenName)
      .methods.approve(this.baseContracts.flowProtocol.options.address, balance)
      .send({ from: account });
  };

  public getOraclePrice = () => {
    throw new Error('not support');
  };

  public getPools = async (): Promise<PoolInfo[]> => {
    return [
      {
        id: this.protocol.addresses.pool,
        name: 'Laminar',
        address: this.protocol.addresses.pool
      },
      {
        id: this.protocol.addresses.pool2,
        name: 'ACME',
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
}

export default EthereumApi;
