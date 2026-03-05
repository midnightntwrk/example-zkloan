import { type Config, StandaloneConfig } from '../config';
import { type StartedDockerComposeEnvironment, type StartedTestContainer } from 'testcontainers';
import type { WalletContext } from '../api';
import type { Logger } from 'pino';
export interface TestConfiguration {
    seed: string;
    mnemonic: string;
    entrypoint: string;
    dappConfig: Config;
    psMode: string;
    cacheFileName: string;
}
export declare class LocalTestConfig implements TestConfiguration {
    seed: string;
    mnemonic: string;
    entrypoint: string;
    psMode: string;
    cacheFileName: string;
    dappConfig: StandaloneConfig;
}
export declare function parseArgs(required: string[]): TestConfiguration;
export declare class TestEnvironment {
    private readonly logger;
    private env;
    private dockerEnv;
    private container;
    private walletContext;
    private testConfig;
    constructor(logger: Logger);
    start: () => Promise<TestConfiguration>;
    static mapContainerPort: (env: StartedDockerComposeEnvironment, url: string, containerName: string) => string;
    static getProofServerContainer: (env: string) => Promise<StartedTestContainer>;
    shutdown: () => Promise<void>;
    getWallet: () => Promise<WalletContext>;
}
