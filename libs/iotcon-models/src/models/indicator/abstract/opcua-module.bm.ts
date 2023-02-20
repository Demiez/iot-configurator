import { SubscriptionModesEnum } from '../../../enums';

export abstract class OpcuaModuleBaseModel {
  public subscriptionMode?: SubscriptionModesEnum = undefined;
}
