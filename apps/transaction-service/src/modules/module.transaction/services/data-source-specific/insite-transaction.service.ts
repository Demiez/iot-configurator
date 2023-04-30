import { Injectable, Logger } from '@nestjs/common';
import {
  DataSourceTypesEnum,
  IBaseVariable,
  IndicatorModuleDataModel,
  InsiteOperationRequestModel,
  InsiteTransactionConfigDataModel,
  ModuleTypesEnum,
  OperationBaseModel,
  OperationModesEnum,
  OperationTypesEnum,
  ProcessedSensorDataModel,
} from '~iotcon-models';
import { CachedSchemasDataModel } from '../../../module.cache/models/cached-schemas.dm';
import { DataSourceService } from '../../../module.data-source/data-source.service';
import { v4 } from 'uuid';
import { TransactionRepository } from '../../repository/transaction.repository';
import {
  IPublisherDocument,
  ISensorDocument,
} from '../../../module.db/schemas';
import { DataSourceSchemaDataModel } from '../../../module.data-source/models';
import { BaseTransactionService } from '../abstract/base-transaction.service';

@Injectable()
export class InsiteTransactionService extends BaseTransactionService {
  private readonly dataSourceType = DataSourceTypesEnum.INSITE;

  constructor(
    private readonly logger: Logger,
    private readonly dataSourceService: DataSourceService,
    private readonly transactionRepository: TransactionRepository,
  ) {
    super();
  }

  public async createUpdateInsiteTransaction(
    module: IndicatorModuleDataModel,
    schemas: CachedSchemasDataModel,
    operations: OperationBaseModel[],
    sensorKey?: string,
    publisherKey?: string,
    processedData?: ProcessedSensorDataModel,
    persistedIndicatorKey?: string,
  ): Promise<void> {
    // TODO: virtuals are always false, add check when implemented
    const { databusKey } =
      await this.dataSourceService.retrieveDataSourceSnapshot(
        module.dataSourceId,
        {
          type: this.dataSourceType,
          isVirtual: false,
        },
      );

    if (sensorKey) {
      const sensorSchema = schemas[sensorKey];

      const sensor =
        await this.transactionRepository.getInsiteConnectorByUniqueFields<ISensorDocument>(
          module.dataSourceId,
          module.record,
          module.descriptor,
          module.isWellBased,
        );

      if (sensor) {
        // TODO: updateSensorOperationWithVariable
      }

      const indicatorKey: string = persistedIndicatorKey || v4();

      return this.createSensorOperation(
        module,
        sensorSchema,
        operations,
        databusKey,
        indicatorKey,
      );
    }

    const publisher =
      await this.transactionRepository.getInsiteConnectorByUniqueFields<IPublisherDocument>(
        module.dataSourceId,
        module.record,
        module.descriptor,
        module.isWellBased,
        false,
        processedData.databusKey,
      );

    if (publisher) {
      // TODO: updatePublisherOperationWithVariable
    }

    const publisherSchema = schemas[publisherKey];
    return this.createPublisherOperation(
      module,
      publisherSchema,
      processedData,
      operations,
    );
  }

  public createSensorOperation(
    module: IndicatorModuleDataModel,
    sensorSchema: DataSourceSchemaDataModel,
    operations: OperationBaseModel[],
    databusKey: string,
    indicatorKey: string,
    moduleId?: string,
  ): void {
    const config = new InsiteTransactionConfigDataModel(
      module,
      indicatorKey,
      moduleId,
    );

    this.createOperation(
      OperationModesEnum.MODULE_CREATE_AND_START,
      ModuleTypesEnum.IOT_SENSOR,
      module.dataSourceId,
      config,
      sensorSchema,
      databusKey,
      operations,
      OperationTypesEnum.INSITE_SENSOR_CREATED,
      indicatorKey,
    );
  }

  public createPublisherOperation(
    module: IndicatorModuleDataModel,
    publisherSchema: DataSourceSchemaDataModel,
    processedData: ProcessedSensorDataModel,
    operations: OperationBaseModel[],
    moduleId?: string,
  ): void {
    const config = new InsiteTransactionConfigDataModel(
      module,
      processedData.generatedIndicatorKey,
      moduleId,
    );

    this.createOperation(
      OperationModesEnum.MODULE_CREATE_AND_START,
      ModuleTypesEnum.IOT_PUBLISHER,
      module.dataSourceId,
      config,
      publisherSchema,
      processedData.databusKey,
      operations,
      OperationTypesEnum.INSITE_PUBLISHER_CREATED,
      undefined,
      processedData.sensorId,
    );
  }

  protected createOperation(
    operationMode: OperationModesEnum,
    moduleType: ModuleTypesEnum,
    dataSourceId: string,
    config: InsiteTransactionConfigDataModel,
    connectorSchema: DataSourceSchemaDataModel,
    generatedDatabusKey: string,
    operations: OperationBaseModel[],
    operationType: OperationTypesEnum,
    generatedIndicatorKey?: string,
    connectedSensorId?: string,
    newVariable?: IBaseVariable,
  ): void {
    const operation = new InsiteOperationRequestModel(
      operationMode,
      moduleType,
      config,
      connectorSchema,
      generatedDatabusKey,
    );

    operation.operationType = operationType;
    operation.connectedSensorId = connectedSensorId;
    operation.dataSourceType = this.dataSourceType;
    operation.dataSourceId = dataSourceId;

    if (generatedIndicatorKey) {
      operation.generatedIndicatorKey = generatedIndicatorKey;
    }

    if (newVariable) {
      operation.newVariable = newVariable;
    }

    this.logOperationData(this.logger, this.dataSourceType, operation);

    operations.push(operation);
  }
}
