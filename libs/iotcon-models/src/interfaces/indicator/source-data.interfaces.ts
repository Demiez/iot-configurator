import { DataSourceTypesEnum, RmqExchangeTypesEnum } from '../../enums';

export interface ISourceData {
  dataSourceId?: string;
  dataSourceType?: DataSourceTypesEnum;
  mqttTopic?: string;
  exchangeName?: string;
  exchangeType?: RmqExchangeTypesEnum;
  exchangeDurable?: boolean;
  routingKey?: string;
  variableName?: string;
  uom?: string;
  uoc?: string;
}
