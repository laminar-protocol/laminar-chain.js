/* eslint-disable @typescript-eslint/no-explicit-any */

import fs from 'fs';
import { w3cwebsocket as WebSocket } from 'websocket';

const main = (): void => {
  const endpoint = 'ws://localhost:9944';
  console.log(`*** Connecting to ${endpoint}`);
  const ws = new WebSocket(endpoint);

  ws.onopen = (): void => {
    ws.send('{"id":"1","jsonrpc":"2.0","method":"state_getMetadata","params":[]}');
  };

  ws.onmessage = (msg: any): void => {
    const metadata = JSON.parse(msg.data).result;

    fs.writeFileSync('packages/types/src/metadata/static-latest.ts', `export default '${metadata}';\n`);
    console.log('✅ static-latest.ts generated.\n');

    process.exit(0);
  };

  ws.onerror = (): void => {
    console.log('🤦‍♀️🤦 Getting metadata from RPC failed.\n');
  };
};

main();
