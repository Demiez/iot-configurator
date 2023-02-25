import { DataSourceTypesEnum, RmqExchangeTypesEnum } from '../../enums';
import {
  IDefaultRmqSettings,
  IDefaultSettings,
  IIndicatorProcessingSettings,
  IMqttSettings,
} from '../../interfaces';

export class DefaultSettingsDataModel implements IDefaultSettings {
  mqttSettings: IMqttSettings = undefined;
  rmqSettings: IDefaultRmqSettings = undefined;
  targetDestination: DataSourceTypesEnum.MQTT | DataSourceTypesEnum.RMQ =
    undefined;
  processingSettings: IIndicatorProcessingSettings;

  constructor() {
    this.mqttSettings = { mqttTopic: 'Iotcon/Indicators' } as IMqttSettings;
    // TODO: add model for DefaultRmqSettingsDataModel
    this.rmqSettings = {
      exchangeName: 'iotcon.indicators',
      exchangeType: RmqExchangeTypesEnum.DIRECT,
      exchangeDurable: true,
      routingKey: 'iotcon-default-rmq',
    } as IDefaultRmqSettings;
    this.targetDestination = DataSourceTypesEnum.MQTT;
    // TODO: add model for IndicatorProcessingSettingsDataModel
    this.processingSettings = {
      channelName: 'indicator-processing',
      exchangeName: 'indicator.processing',
      exchangeType: RmqExchangeTypesEnum.DIRECT,
      exchangeDurable: false,
      routingKey: 'indicator-processing-rmq',
      mqttTopic: 'Iotcon/Indicators/Processing',
    } as IIndicatorProcessingSettings;
  }
}
