import { FieldIsBadModel } from '~iotcon-errors';
import {
  DataSourceGenericDataModel,
  DataSourceTypesEnum,
  IndicatorModuleDataModel,
} from '~iotcon-models';
import { INDICATOR_MODULE_DATA_SOURCE_TYPE_NOT_ACCEPTED } from '../constants';
import { BaseValidator } from './abstract/base.validator';
import {
  InsiteValidator,
  ModbusValidator,
  MqttValidator,
  OpcuaValidator,
  RmqValidator,
  Wits0Validator,
} from './source-specific';

export class DataSourceToSensorValidator extends BaseValidator {
  public static validate(
    dataSources: DataSourceGenericDataModel[],
    sensor: IndicatorModuleDataModel,
    isExternal: boolean,
    disableModbusDataValidation?: boolean,
  ): FieldIsBadModel[] {
    this.errors = [];

    const dataSource = dataSources.find(
      (dataSourceData) => sensor.dataSourceId === dataSourceData.dataSourceId,
    );

    switch (dataSource.dataSourceType) {
      case DataSourceTypesEnum.INSITE: {
        InsiteValidator.validateInsiteFields(sensor, this.errors);
        break;
      }
      case DataSourceTypesEnum.MQTT: {
        MqttValidator.validateMqttFields(sensor, this.errors, isExternal);

        break;
      }
      case DataSourceTypesEnum.OPCUA: {
        OpcuaValidator.validateOpcuaFields(sensor, this.errors);

        break;
      }
      case DataSourceTypesEnum.RMQ: {
        RmqValidator.validateRmqFields(sensor, this.errors, isExternal);

        break;
      }
      case DataSourceTypesEnum.MODBUS: {
        ModbusValidator.validateModbusFields(
          sensor,
          this.errors,
          true,
          disableModbusDataValidation,
        );

        break;
      }
      case DataSourceTypesEnum.WITS0: {
        Wits0Validator.validateWits0Fields(sensor, this.errors);

        break;
      }
      default: {
        this.errors.push(
          new FieldIsBadModel(
            'dataSourceType',
            INDICATOR_MODULE_DATA_SOURCE_TYPE_NOT_ACCEPTED,
          ),
        );
      }
    }

    return this.errors;
  }
}
