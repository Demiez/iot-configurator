import { v4 } from 'uuid';
import { ModuleTypesEnum, OperationModesEnum } from '../../../../enums';
import { IDataSourceSchema } from '../../../../interfaces';
import { OperationBaseModel } from '../../abstract';
import { InsiteTransactionConfigDataModel } from './insite-transaction-config.dm';

export class InsiteOperationRequestModel extends OperationBaseModel {
  public config: InsiteTransactionConfigDataModel =
    {} as InsiteTransactionConfigDataModel;

  constructor(
    mode: OperationModesEnum,
    moduleType: ModuleTypesEnum,
    configData: InsiteTransactionConfigDataModel,
    connectorSchema: IDataSourceSchema,
    generatedDatabusKey: string
  ) {
    super(mode);

    const {
      record,
      descriptor,
      isWellBased,
      sourceName,
      moduleId,
      moduleName,
      variables,
      isPrimary,
      mqttServerAddress,
      groupId,
      description,
    } = configData;

    // Generated operationId for completion check
    this.operationId = v4();

    // Sensor unique fields
    this.config.record = record;
    this.config.descriptor = descriptor;
    this.config.isWellBased = isWellBased;

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
