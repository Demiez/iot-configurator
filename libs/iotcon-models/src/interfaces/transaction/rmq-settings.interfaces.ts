import { RmqExchangeTypesEnum } from '../../enums';
import { Identifier } from '../../models';

export interface IRmqSettings extends Identifier {
  exchangeName: string;
  exchangeType: RmqExchangeTypesEnum;
  exchangeDurable: boolean;
}

export interface IDefaultRmqSettings extends IRmqSettings {
  routingKey: string;
}
