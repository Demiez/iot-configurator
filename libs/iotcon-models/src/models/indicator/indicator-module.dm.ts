import { keys, pick } from 'lodash';
import { DataSourceTypesEnum } from '../../enums';
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

  // TODO: _initializeDefault
  // TODO: _initializeFromPublisher
}
