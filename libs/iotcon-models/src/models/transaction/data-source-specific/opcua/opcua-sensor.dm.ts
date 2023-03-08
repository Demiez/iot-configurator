import { SubscriptionModesEnum } from '../../../../enums';
import { ISensor } from '../../../../interfaces';
import { ConnectorBaseModel } from '../../abstract';
import { OpcuaTransactionConfigDataModel } from './opcua-transaction-config.dm';

export class OpcuaSensorDataModel
  extends ConnectorBaseModel
  implements ISensor
{
  public subscriptionMode: SubscriptionModesEnum;

  constructor(
    moduleId: string,
    dataSourceId: string,
    config: Partial<OpcuaTransactionConfigDataModel>
  ) {
    super(moduleId, dataSourceId);

    this.subscriptionMode = config.subscriptionMode;
  }

  public static _initialize(
    moduleId: string,
    dataSourceId: string,
    subscriptionMode: SubscriptionModesEnum
  ): OpcuaSensorDataModel {
    return new this(moduleId, dataSourceId, {
      subscriptionMode,
    } as OpcuaTransactionConfigDataModel);
  }
}
