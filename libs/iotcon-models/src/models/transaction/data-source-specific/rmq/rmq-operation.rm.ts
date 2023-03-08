import { v4 } from 'uuid';
import { ModuleTypesEnum, OperationModesEnum } from '../../../../enums';
import { IDataSourceSchema } from '../../../../interfaces';
import { OperationBaseModel } from '../../abstract';
import { RmqTransactionConfigDataModel } from './rmq-transaction-config.dm';

export class RmqOperationRequestModel extends OperationBaseModel {
  public config: RmqTransactionConfigDataModel =
    {} as RmqTransactionConfigDataModel;

  constructor(
    mode: OperationModesEnum,
    moduleType: ModuleTypesEnum,
    configData: RmqTransactionConfigDataModel,
    connectorSchema: IDataSourceSchema,
    generatedDatabusKey: string
  ) {
    super(mode);

    const {
      sourceName,
      moduleId,
      moduleName,
      rmqSettings,
      outputs,
      inputs,
      groupId,
      description,
      isPrimary,
    } = configData;

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
    if (moduleType === ModuleTypesEnum.IOTCON_COLLECTOR) {
      this.config.inputs = inputs;
    } else {
      this.config.outputs = outputs;
    }

    // Connection settings
    this.config.rmqSettings = rmqSettings;
    this.config.databusKey = generatedDatabusKey;

    // Secondary optional fields
    if (groupId) {
      this.config.groupId = groupId;
    }

    if (description) {
      this.config.description = description;
    }
  }
}
