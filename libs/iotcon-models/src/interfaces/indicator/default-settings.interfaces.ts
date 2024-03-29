import { DataSourceTypesEnum } from '../../enums';
import { IDefaultRmqSettings, IMqttSettings } from '../transaction';
import { IIndicatorProcessingSettings } from './indicator-processing.interfaces';

export interface IDefaultSettings {
  mqttSettings: IMqttSettings;
  rmqSettings: IDefaultRmqSettings;
  defaultPublisherType: DataSourceTypesEnum.MQTT | DataSourceTypesEnum.RMQ;
  processingSettings: IIndicatorProcessingSettings;
  _created?: Date;
}
