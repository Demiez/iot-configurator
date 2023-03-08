import {
  OPCUA_ADDRESS,
  OPCUA_DEFAULT_SAMPLING_INTERVAL,
  USE_OPCUA_ENV,
} from '../../../../constants';
import { SubscriptionModesEnum } from '../../../../enums';
import { IBaseVariable, IOpcuaSubscription } from '../../../../interfaces';
import { IndicatorModuleDataModel } from '../../../indicator';
import { TransactionConfigBaseModel } from '../../abstract';

export class OpcuaTransactionConfigDataModel extends TransactionConfigBaseModel {
  public opcuaAddress: string;
  public useOpcuaEnv: boolean;

  public subscriptionMode?: SubscriptionModesEnum;
  public subscriptions?: IOpcuaSubscription[];
  public variables?: IBaseVariable[];

  constructor(
    indicatorModule: IndicatorModuleDataModel,
    indicatorKey: string,
    moduleId?: string,
    isSensor?: boolean
  ) {
    super();

    const { sourceName, mqttServerAddress, subscriptionMode, isPrimary } =
      indicatorModule;

    this.sourceName = sourceName;
    this.mqttServerAddress = mqttServerAddress;
    this.opcuaAddress = OPCUA_ADDRESS;
    this.useOpcuaEnv = USE_OPCUA_ENV;
    this.isPrimary = !!isPrimary;

    if (moduleId) {
      this.moduleId = moduleId;
    }

    const variable = {
      indicatorKey,
      variableName: indicatorModule.variableName,
      uom: indicatorModule.uom,
      uoc: indicatorModule.uoc,
    } as IBaseVariable;

    if (isSensor) {
      this.subscriptionMode = subscriptionMode
        ? subscriptionMode
        : SubscriptionModesEnum.POLLING;
      this.subscriptions = [
        {
          samplingInterval: OPCUA_DEFAULT_SAMPLING_INTERVAL,
          variables: [variable],
        } as IOpcuaSubscription,
      ];
    } else {
      this.subscriptionMode = undefined;
      this.variables = [variable];
    }
  }
}
