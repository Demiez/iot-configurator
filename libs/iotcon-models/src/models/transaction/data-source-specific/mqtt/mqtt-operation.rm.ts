import { v4 } from 'uuid';
import { USE_DEFAULT_ENV } from '../../../../constants';
import { ModuleTypesEnum, OperationModesEnum } from '../../../../enums';
import { IDataSourceSchema } from '../../../../interfaces';
import { OperationBaseModel } from '../../abstract';
import { MqttTransactionConfigDataModel } from './mqtt-transaction-config.dm';

export class MqttOperationRequestModel extends OperationBaseModel {
  public config: MqttTransactionConfigDataModel =
    {} as MqttTransactionConfigDataModel;

  constructor(
    mode: OperationModesEnum,
    moduleType: ModuleTypesEnum,
    configData: MqttTransactionConfigDataModel,
    connectorSchema: IDataSourceSchema,
    generatedDatabusKey: string
  ) {
    super(mode);

    const {
      sourceName,
      moduleId,
      moduleName,
      outputs,
      inputs,
      groupId,
      description,
      isPrimary,
    } = configData;

    // Generated operationId for completion check
    this.operationId = v4();

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
    this.config.databusKey = generatedDatabusKey;
    this.config.useDefaultEnv = USE_DEFAULT_ENV;

    // Secondary optional fields
    if (groupId) {
      this.config.groupId = groupId;
    }

    if (description) {
      this.config.description = description;
    }
  }
}
