import { USE_WITS0_ENV, WITS0_ADDRESS } from '../../../../constants';
import { IBaseVariable, IWits0Subscription } from '../../../../interfaces';
import { IndicatorModuleDataModel } from '../../../indicator';
import { TransactionConfigBaseModel } from '../../abstract';
import { Wits0SubscriptionDataModel } from './wits0-subscription.dm';
import { Wits0VariableDataModel } from './wits0-variable.dm';

export class Wits0TransactionConfigDataModel extends TransactionConfigBaseModel {
  public wits0Address: string;
  public useWits0Env: boolean;
  public subscription: IWits0Subscription;
  public gatewayId?: string;

  constructor(
    indicatorModule: IndicatorModuleDataModel,
    indicatorKey: string,
    moduleId?: string
  ) {
    super();

    const { sourceName, mqttServerAddress, isPrimary } = indicatorModule;

    this.sourceName = sourceName;
    this.mqttServerAddress = mqttServerAddress;
    this.wits0Address = WITS0_ADDRESS;
    this.useWits0Env = USE_WITS0_ENV;
    this.isPrimary = !!isPrimary;

    if (moduleId) {
      this.moduleId = moduleId;
    }

    const variable = new Wits0VariableDataModel({
      indicatorKey,
      variableId: indicatorModule.variableId,
      uom: indicatorModule.uom,
      uoc: indicatorModule.uoc,
    } as IBaseVariable);

    this.subscription = new Wits0SubscriptionDataModel(indicatorModule, [
      variable,
    ]);
  }
}
