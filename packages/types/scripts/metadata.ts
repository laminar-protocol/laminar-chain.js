/* eslint-disable @typescript-eslint/no-explicit-any */

import fs from 'fs';
import { w3cwebsocket as WebSocket } from 'websocket';
import Metadata from '@polkadot/metadata/Metadata';
import { TypeRegistry } from '@polkadot/types';

import { types, typesModules } from '../src';
import metadataStatic from '../src/metadata/static-latest';

const generateMetadataJson = () => {
  const registry = new TypeRegistry();
  registry.register(types);
  registry.setKnownTypes({
    typesAlias: typesModules
  });
  const metadata = new Metadata(registry, metadataStatic);
  try {
    metadata.getUniqTypes(true);
  } catch (err) {
    console.log(`🤦‍♀️🤦 metadata.json generation failed: ${err}`);
  }

  const formatted = JSON.stringify(metadata, null, 2);
  fs.writeFileSync('packages/types/src/metadata/metadata.json', formatted);

  console.log('✅ metadata.json generated.');
};

const main = (): void => {
  const endpoint = 'ws://localhost:9944';
  console.log(`*** Connecting to ${endpoint}\n`);
  const ws = new WebSocket(endpoint);

  ws.onopen = (): void => {
    ws.send('{"id":"1","jsonrpc":"2.0","method":"state_getMetadata","params":[]}');
  };

  ws.onmessage = (msg: any): void => {
    const metadata = JSON.parse(msg.data).result;

    fs.writeFileSync('packages/types/src/metadata/static-latest.ts', `export default '${metadata}'`);
    console.log('✅ static-latest.ts generated.');

    generateMetadataJson();

    console.log('\n*** Build completed');
    process.exit(0);
  };

  ws.onerror = (): void => {
    console.log('🤦‍♀️🤦 Getting metadata from RPC failed.');
  };
};

main();
