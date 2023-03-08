import { v4 } from 'uuid';
import { ModuleTypesEnum, OperationModesEnum } from '../../../../enums';
import { IDataSourceSchema } from '../../../../interfaces';
import { OperationBaseModel } from '../../abstract';
import { OpcuaTransactionConfigDataModel } from './opcua-transaction-config.dm';

export class OpcuaOperationRequestModel extends OperationBaseModel {
  public config: OpcuaTransactionConfigDataModel =
    {} as OpcuaTransactionConfigDataModel;

  constructor(
    mode: OperationModesEnum,
    moduleType: ModuleTypesEnum,
    configData: OpcuaTransactionConfigDataModel,
    connectorSchema: IDataSourceSchema,
    generatedDatabusKey: string
  ) {
    super(mode);

    const {
      opcuaAddress,
      useOpcuaEnv,
      sourceName,
      moduleId,
      moduleName,
      subscriptionMode,
      subscriptions,
      variables,
      mqttServerAddress,
      groupId,
      description,
      isPrimary,
    } = configData;

    // Generated operationId for completion check
    this.operationId = v4();

    // Opcua unique fields
    this.config.opcuaAddress = opcuaAddress;
    this.config.useOpcuaEnv = useOpcuaEnv;

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
    if (moduleType === ModuleTypesEnum.IOT_SENSOR) {
      this.config.subscriptionMode = subscriptionMode;
      this.config.subscriptions = subscriptions;
    } else {
      this.config.variables = variables;
    }

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
