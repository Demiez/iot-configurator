import { keys, pick } from 'lodash';
import { DataSourceTypesEnum } from '../../enums';
import { IDefaultRmqSettings, IMqttSettings } from '../../interfaces';
import { DataSourceGenericDataModel } from '../data-source';
import { IndicatorModuleTypesBaseModel } from './abstract/indicator-module-types.bm';

export class IndicatorModuleDataModel extends IndicatorModuleTypesBaseModel {
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

  constructor(module: IndicatorModuleDataModel) {
    super();

    const pickedModule = pick(module, keys(this));

    if (module.dataSourceType === DataSourceTypesEnum.RMQ) {
      pickedModule.exchangeName = module.exchangeName;
      pickedModule.exchangeType = module.exchangeType;
      pickedModule.exchangeDurable = module.exchangeDurable;
      pickedModule.routingKey = module.routingKey;
    }

    if (module.dataSourceType === DataSourceTypesEnum.MQTT) {
      pickedModule.mqttTopic = module.mqttTopic;
    }

    if (module.dataSourceType === DataSourceTypesEnum.MODBUS) {
      pickedModule.modbusData = module.modbusData;

      if (module.modbusSampleRate) {
        pickedModule.modbusSampleRate = module.modbusSampleRate;
      }
    }

    if (module.dataSourceType === DataSourceTypesEnum.OPCUA) {
      if (module.subscriptionMode) {
        pickedModule.subscriptionMode = module.subscriptionMode;
      }
    }

    Object.assign(this, pickedModule);
  }

  public static _initializeDefault(
    module: IndicatorModuleDataModel,
    defaultDataSource: DataSourceGenericDataModel,
    dataSourceType: DataSourceTypesEnum,
    defaultSettings: IDefaultRmqSettings & IMqttSettings
  ): IndicatorModuleDataModel {
    const { sourceName, mqttServerAddress } = defaultDataSource;

    const dataSourceId = defaultDataSource.dataSourceId;
    const variableName = undefined;
    const uom = 'UOM_unitless';
    const uoc = module.uoc;

    const mqttTopic = (defaultSettings as IMqttSettings).mqttTopic;

    switch (dataSourceType) {
      case DataSourceTypesEnum.MQTT: {
        return new this({
          sourceName,
          dataSourceId,
          dataSourceType,
          mqttServerAddress,
          variableName,
          uom,
          uoc,
          mqttTopic,
          isDefault: true,
        });
      }
      case DataSourceTypesEnum.RMQ: {
        const { exchangeName, exchangeType, exchangeDurable, routingKey } =
          defaultSettings as IDefaultRmqSettings;

        return new this({
          sourceName,
          dataSourceId,
          dataSourceType,
          exchangeName,
          exchangeType,
          exchangeDurable,
          routingKey,
          variableName,
          uom,
          uoc,
          isDefault: true,
        });
      }
    }
  }

  // TODO: _initializeFromPublisher
}
