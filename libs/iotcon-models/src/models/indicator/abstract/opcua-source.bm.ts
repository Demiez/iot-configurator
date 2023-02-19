import { SubscriptionModesEnum } from '../../../enums';

export abstract class OpcuaSourceBaseModel {
  public subscriptionMode?: SubscriptionModesEnum = undefined;
}
