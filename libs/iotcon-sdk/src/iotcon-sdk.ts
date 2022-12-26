import { MetaContextEnum } from './enums';
import { IotconLogger } from './logger/iotcon-logger';

/**
 * The entry point class for the IotCon SDK.
 * This class contains required functionality
 */
export class IotconSdk {
  public _initializeLogger(
    context: MetaContextEnum,
    contextPath?: string
  ): IotconLogger {
    return new IotconLogger(context, contextPath);
  }
}
