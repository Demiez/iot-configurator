import packageJson from '../../../package.json';

export const APP_ROOT = `/api/v${packageJson.version.split('.')[0]}`;
export const APP_ROOT_MESSAGE = 'IoT Configurator API root endpoint';
export const GRPC_SSL_CREDENTIALS_MESSAGE = 'Set grpc client ssl credentials';
export const TEN_MINUTES_TIMEOUT = 600000;
export const STARTUP_INIT_INTERVAL = 5000;
export const RMQ_CONNECTION_INTERVAL = 1000;
export const UUID_REGEX =
  '[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}';
