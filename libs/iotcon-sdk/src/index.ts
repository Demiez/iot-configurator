/**
 * This is the entrypoint for the IoT Configurator SDK.
 */
import 'reflect-metadata';

import { IotconLogger } from './logger/iotcon-logger';
import { IotconUtils } from './utils/iotcon-utils';

const utils = new IotconUtils();

export { utils, IotconLogger };
