import { Logger } from '@nestjs/common';
import {
  DataSourceTypesEnum,
  IBaseVariable,
  ModuleTypesEnum,
  OperationBaseModel,
  OperationModesEnum,
  OperationTypesEnum,
  TransactionConfigBaseModel,
} from '~iotcon-models';
import { DataSourceSchemaDataModel } from '../../../module.data-source/models';

export abstract class BaseTransactionService {
  // Abstract methods
  protected abstract createOperation(
    operationMode: OperationModesEnum,
    moduleType: ModuleTypesEnum,
    dataSourceId: string,
    config: TransactionConfigBaseModel,
    connectorSchema: DataSourceSchemaDataModel,
    generatedDatabusKey: string,
    operations: OperationBaseModel[],
    operationType: OperationTypesEnum,
    generatedSignalKey?: string,
    connectedSensorId?: string,
    newVariable?: IBaseVariable,
  ): void;

  // Shared methods
  protected logOperationData(
    logger: Logger,
    type: DataSourceTypesEnum,
    operation: OperationBaseModel,
  ): void {
    logger.log(
      process.env.DISABLE_OPERATION_LOG === 'true'
        ? `Created ${type} operation`
        : `Created ${type} operation : ${JSON.stringify(operation, null, 4)}`,
    );
  }
}
