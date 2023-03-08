import { v4 } from 'uuid';
import { USE_DEFAULT_ENV } from '../../../../constants';
import { ModuleTypesEnum, OperationModesEnum } from '../../../../enums';
import { IDataSourceSchema } from '../../../../interfaces';
import { OperationBaseModel } from '../../abstract';
import { ModbusTransactionConfigDataModel } from './modbus-transaction-config.dm';

export class ModbusOperationRequestModel extends OperationBaseModel {
  public config: ModbusTransactionConfigDataModel =
    {} as ModbusTransactionConfigDataModel;

  constructor(
    mode: OperationModesEnum,
    moduleType: ModuleTypesEnum,
    configData: ModbusTransactionConfigDataModel,
    connectorSchema: IDataSourceSchema,
    generatedDatabusKey: string
  ) {
    super(mode);

    const {
      modbusSampleRate,
      readBlocksData,
      sourceName,
      moduleId,
      moduleName,
      variables,
      mqttServerAddress,
      groupId,
      description,
      isPrimary,
    } = configData;

    // Generated operationId for completion check
    this.operationId = v4();

    // Sensor unique fields
    if (moduleType === ModuleTypesEnum.IOT_SENSOR) {
      this.config.modbusSampleRate = modbusSampleRate;
      this.config.readBlocksData = readBlocksData;
    }

    // Base module configuration
    this.config.sourceName = sourceName;
    this.config.moduleType = moduleType;
    this.config.moduleClass = connectorSchema.moduleClass;
    this.config.moduleConfig = connectorSchema.moduleConfig;
    this.config.version = connectorSchema.version;
    this.config.moduleId = moduleId ? moduleId : v4();
    this.config.moduleName = moduleName ? moduleName : this.config.moduleId;
    this.config.isPrimary = isPrimary;

    // Signals data
    this.config.variables = variables;

    // Connection settings
    this.config.databusKey = generatedDatabusKey;
    this.config.useDefaultEnv = USE_DEFAULT_ENV;
    this.config.mqttServerAddress = mqttServerAddress;

    // Secondary optional fields
    if (groupId) {
      this.config.groupId = groupId;
    }

    if (description) {
      this.config.description = description;
    }
  }
}
