import { RmqExchangeTypesEnum } from '../../../enums';
import { Identifier } from '../../../models';
import { IBaseVariable } from '../variable.interfaces';

export interface IRmqSettings extends Identifier {
  exchangeName: string;
  exchangeType: RmqExchangeTypesEnum;
  exchangeDurable: boolean;
}

export interface IDefaultRmqSettings extends IRmqSettings {
  routingKey: string;
}

export interface IRmqConnector {
  rmqSettingsId?: string;
  rmqSettings?: IRmqSettings;
  routingKey?: string;
}

export interface IRmqUniqueFieldQuery {
  dataSourceId: string;
  rmqSettingsId: string;
  routingKey: string;
  databusKey?: string;
}

export interface IRmqInput {
  routingKey: string;
  variables: IBaseVariable[];
}

export interface IRmqOutput {
  routingKey: string;
  variables: IBaseVariable[];
}

export interface IRmqExchangeDetails {
  name: string;
  type: RmqExchangeTypesEnum;
  durable: boolean;
}
