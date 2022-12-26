/**
 * This is the entrypoint for the IoT Configurator SDK.
 */
import 'reflect-metadata';
import { IotconSdk } from './iotcon-sdk';
import { IotconLogger } from './logger/iotcon-logger';
import * as enums from './enums';

const SDK = new IotconSdk();

export { SDK, IotconLogger, enums };
