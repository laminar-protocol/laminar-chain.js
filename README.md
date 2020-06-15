![license](https://img.shields.io/badge/License-Apache%202.0-blue?logo=apache&style=flat-square)
[![npm](https://img.shields.io/npm/v/@laminar/api?logo=npm&style=flat-square)](https://www.npmjs.com/package/@laminar/api)

# Laminar Chain JS SDK

This library provides SDK to access Laminar Ethereum and Laminar Chain.

# Getting Started

- Install dependencies

```bash
yarn add @polkadot/api @laminar/api@beta
```

- Laminar Chain

  - Create API instance for Laminar Chain

    ```ts
    import { ApiPromise } from '@polkadot/api';
    import { WsProvider } from '@polkadot/rpc-provider';
    import { options } from '@laminar/api';

    async function main() {
      const provider = new WsProvider('ws://localhost:9944');
      const api = new ApiPromise(options({ provider }));
      await api.isReady;

      // use api
    }

    main();
    ```

  - Use api to interact with node

    ```ts
    // query and display account data
    const data = await api.query.system.account('5F98oWfz2r5rcRVnP9VCndg33DAAsky3iuoBSpaPUbgN9AJn');
    console.log(data.toHuman());
    ```

- Laminar Ethereum

  - Create API instance for Laminar Ethereum

    ```ts
    import { EthereumApi } from '@laminar/api';
    import Web3 from 'web3';

    const api = new EthereumApi({
      provider: new Web3.providers.HttpProvider(<network_endpoint>)
    })
    ```

  - Create API instance from metamask

    ```ts
    import { EthereumApi } from '@laminar/api';

    const api = new EthereumApi({
      provider: window.web3.currentProvider.
    })
    ```

  - Call the contract

    ```ts
    import { EthereumApi } from '@laminar/api';

    const api = new EthereumApi({
      provider: window.web3.currentProvider.
    })

    const run = async () => {
      // call marginFlowProtocol
      await api.marginFlowProtocol.methods.balances(<poolId>, <account>).call() // balance

      // call syntheticFlowProtocol
      api.baseContracts.syntheticFlowProtocol.methods.redeem(<fromToken>, <poolId>, <amount>).send(<sendOption>) // redeem

      // call MarginPoolInterfaceContract
      const contract = api.getMarginPoolInterfaceContract(<poolId>)

      // call SyntheticPoolInterfaceContract
      const contract = api.getSyntheticPoolInterfaceContract(<poolId>)

      await contract.methods.getAskSpread(<tokenId>).call() // getAskSpread

      // get margin allowance
      await api.margin.allowance(<account>, <contractAddress>)

      // margin contract grant
      await api.margin.grant(<account>, <contractAddress>)

    }

    run()
    ```

# Packages

- [api](./packages/api)
  - SDK to access Laminar Ethereum and Laminar Chain
- [types](./packages/types)
  - Polkadot.js type definations for Laminar Chain
