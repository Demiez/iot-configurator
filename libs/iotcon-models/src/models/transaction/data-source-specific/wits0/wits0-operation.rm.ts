import { v4 } from 'uuid';
import { ModuleTypesEnum, OperationModesEnum } from '../../../../enums';
import { IDataSourceSchema } from '../../../../interfaces';
import { OperationBaseModel } from '../../abstract';
import { Wits0TransactionConfigDataModel } from './wits0-transaction-config.dm';

export class Wits0OperationRequestModel extends OperationBaseModel {
  public config: Wits0TransactionConfigDataModel =
    {} as Wits0TransactionConfigDataModel;

  constructor(
    mode: OperationModesEnum,
    moduleType: ModuleTypesEnum,
    configData: Wits0TransactionConfigDataModel,
    connectorSchema: IDataSourceSchema,
    generatedDatabusKey: string
  ) {
    super(mode);

    const {
      wits0Address,
      useWits0Env,
      sourceName,
      moduleId,
      moduleName,
      subscription,
      mqttServerAddress,
      groupId,
      description,
      isPrimary,
    } = configData;

    // Generated operationId for completion check
    this.operationId = v4();

    // Wits0 unique fields
    this.config.wits0Address = wits0Address;
    this.config.useWits0Env = useWits0Env;
    this.config.subscription = subscription;

    // Base module configuration
    this.config.sourceName = sourceName;
    this.config.moduleType = moduleType;
    this.config.moduleClass = connectorSchema.moduleClass;
    this.config.moduleConfig = connectorSchema.moduleConfig;
    this.config.version = connectorSchema.version;
    this.config.moduleId = moduleId ? moduleId : v4();
    this.config.moduleName = moduleName ? moduleName : this.config.moduleId;
    this.config.isPrimary = isPrimary;

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
