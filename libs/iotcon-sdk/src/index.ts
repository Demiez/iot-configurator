/**
 * This is the entrypoint for the IoT Configurator SDK.
 */

import { IotConSdk } from './iotconSDK';
import * as enums from './enums';

const SDK = new IotConSdk();

export { SDK, enums };
