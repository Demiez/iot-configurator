import { RmqExchangeTypesEnum } from '../../enums';

export interface IIndicatorProcessingSettings {
  channelName: string;
  exchangeName: string;
  exchangeType: RmqExchangeTypesEnum;
  exchangeDurable: boolean;
  routingKey: string;
  mqttTopic: string;
}
