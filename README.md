![license](https://img.shields.io/badge/License-Apache%202.0-blue?logo=apache&style=flat-square)
[![npm](https://img.shields.io/npm/v/@alamianr/api?logo=npm&style=flat-square)](https://www.npmjs.com/package/@alamianr/api)

# Laminar Chain JS SDK

This library provides SDK to access Laminar Ethereum and Lamianr Chain.

# Getting Started

- Install dependencies

```bash
yarn add @polkadot/api @lamianr/api@beta
```

- Laminar Chain

  - Create API instance for Laminar Chain

```ts
import { ApiPromise } from '@polkadot/api';
import { WsProvider } from '@polkadot/rpc-provider';
import { options } from '@lamianr/api';

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

TODO

# Packages

- [api](./packages/api)
  - SDK to access Laminar Ethereum and Laminar Chain
- [types](./packages/types)
  - Polkadot.js type definations for Laminar Chain
