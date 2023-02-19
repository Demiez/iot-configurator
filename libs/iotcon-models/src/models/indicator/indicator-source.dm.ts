import { keys, pick } from 'lodash';
import { DataSourceTypesEnum } from '../../enums';
import { IndicatorSourceTypesBaseModel } from './abstract/indicator-source-types.bm';

export class IndicatorSourceDataModel extends IndicatorSourceTypesBaseModel {
  public id?: string = undefined;
  public dataSourceId: string = undefined;
  public variableName: string = undefined;
  public uom: string = undefined;
  public uoc: string = undefined;

  public dataSourceType?: DataSourceTypesEnum = undefined;
  public group?: string = undefined;
  public isExternal?: boolean = undefined;
  public isDefault?: boolean = undefined;
  public isPrimary?: boolean = undefined;

  constructor(source: IndicatorSourceDataModel) {
    super();

    const pickedSource = pick(source, keys(this));

    if (source.dataSourceType === DataSourceTypesEnum.RMQ) {
      pickedSource.exchangeName = source.exchangeName;
      pickedSource.exchangeType = source.exchangeType;
      pickedSource.exchangeDurable = source.exchangeDurable;
      pickedSource.routingKey = source.routingKey;
    }

    if (source.dataSourceType === DataSourceTypesEnum.MQTT) {
      pickedSource.mqttTopic = source.mqttTopic;
    }

    if (source.dataSourceType === DataSourceTypesEnum.MODBUS) {
      pickedSource.modbusData = source.modbusData;

      if (source.modbusSampleRate) {
        pickedSource.modbusSampleRate = source.modbusSampleRate;
      }
    }

    if (source.dataSourceType === DataSourceTypesEnum.OPCUA) {
      if (source.subscriptionMode) {
        pickedSource.subscriptionMode = source.subscriptionMode;
      }
    }

    Object.assign(this, pickedSource);
  }

  // TODO: _initializeDefault
  // TODO: _initializeFromPublisher
}
