// This file is part of the ZKLoan Credit Scorer example.
// Copyright (C) 2025 Midnight Foundation
// SPDX-License-Identifier: Apache-2.0
// Licensed under the Apache License, Version 2.0 (the "License");
// You may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import path from 'node:path';
import { setNetworkId } from '@midnight-ntwrk/midnight-js-network-id';

export const currentDir = path.resolve(new URL(import.meta.url).pathname, '..');

export const contractConfig = {
  privateStateStoreName: 'zkloan-credit-scorer-private-state',
  zkConfigPath: path.resolve(currentDir, '..', '..', 'contract', 'src', 'managed', 'zkloan-credit-scorer'),
};

export interface Config {
  readonly logDir: string;
  readonly indexer: string;
  readonly indexerWS: string;
  readonly node: string;
  readonly proofServer: string;
  readonly networkId: string;
}

export class StandaloneConfig implements Config {
  logDir = path.resolve(currentDir, '..', 'logs', 'standalone', `${new Date().toISOString()}.log`);
  indexer = 'http://127.0.0.1:8088/api/v4/graphql';
  indexerWS = 'ws://127.0.0.1:8088/api/v4/graphql/ws';
  node = 'http://127.0.0.1:9944';
  proofServer = 'http://127.0.0.1:6300';
  networkId = 'undeployed';
  constructor() {
    setNetworkId('undeployed');
  }
}

// Blockfrost serves the Preprod indexer and node RPC, and every request needs a
// Midnight Preprod project token from BLOCKFROST_PROJECT_ID.
const withBlockfrostKey = (url: string): string =>
  `${url}?project_id=${encodeURIComponent(process.env.BLOCKFROST_PROJECT_ID?.trim() ?? '')}`;

export class PreprodConfig implements Config {
  logDir = path.resolve(currentDir, '..', 'logs', 'preprod', `${new Date().toISOString()}.log`);
  indexer = withBlockfrostKey('https://midnight-preprod.blockfrost.io/api/v0');
  indexerWS = withBlockfrostKey('wss://midnight-preprod.blockfrost.io/api/v0/ws');
  node = withBlockfrostKey('wss://rpc.midnight-preprod.blockfrost.io');
  proofServer = 'http://127.0.0.1:6300';
  networkId = 'preprod';
}
