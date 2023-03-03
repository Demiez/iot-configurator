import { SubscriptionModesEnum } from '../../../enums';
import { IBaseVariable } from '../variable.interfaces';

export interface IOpcuaSubscription {
  samplingInterval: number;
  variables: IBaseVariable[];
}

export interface IOpcuaUniqueFieldQuery {
  dataSourceId: string;
  subscriptionMode: SubscriptionModesEnum;
  databusKey?: string;
}

export interface IOpcuaConnector {
  subscriptionMode?: SubscriptionModesEnum;
}
