import { type Logger } from 'pino';
import { type DockerComposeEnvironment } from 'testcontainers';
import { type Config } from './config';
import 'dotenv/config';
export declare const run: (config: Config, _logger: Logger, dockerEnv?: DockerComposeEnvironment) => Promise<void>;
