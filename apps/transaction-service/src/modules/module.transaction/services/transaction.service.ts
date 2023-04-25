import { Injectable, Logger } from '@nestjs/common';
import { isEmpty } from 'lodash';
import { ErrorCodes } from '~iotcon-errors';
import {
  DataSourceTypesEnum,
  IndicatorDataModel,
  IndicatorModuleDataModel,
  OperationBaseModel,
  ProcessedSensorDataModel,
} from '~iotcon-models';
import { NotFoundRpcError } from '../../../core/errors/rpc-errors';
import { CachedSchemasDataModel } from '../../module.cache/models/cached-schemas.dm';
import { SchemaCacheService } from '../../module.cache/schema-cache.service';
import { DataSourceService } from '../../module.data-source/data-source.service';
import { TransactionIotOrchestratorService } from '../../module.integration/services/transaction-iot-orchestrator.service';
import {
  InsiteTransactionService,
  MqttTransactionService,
} from './data-source-specific';

@Injectable()
export class TransactionService {
  constructor(
    private readonly logger: Logger,
    private readonly schemaCacheService: SchemaCacheService,
    private readonly dataSourceService: DataSourceService,
    private readonly transactionIotOrchestratorService: TransactionIotOrchestratorService,
    private readonly insiteTransactionService: InsiteTransactionService,
    private readonly mqttTransactionService: MqttTransactionService,
  ) {}

  public async createTransaction(
    indicatorData: IndicatorDataModel,
  ): Promise<void> {
    const { sensor, publishers } = indicatorData;

    const { schemas, sensorKey, publisherKeys } =
      await this.getSchemasAndCacheKeys(sensor, publishers);

    const operations: OperationBaseModel[] = [];

    await this.createTransactionServiceMethodFactory(
      sensor,
      schemas,
      operations,
      sensorKey,
    )();
  }

  public async getTransactionsModulesSchemas(
    cacheKeys?: string[],
  ): Promise<CachedSchemasDataModel> {
    const isCacheEmpty =
      await this.schemaCacheService.checkIsSchemaCacheEmpty();

    // TODO: implement integration
    if (isCacheEmpty) {
      const [moduleSchemas, moduleTemplates] = await Promise.all([
        this.transactionIotOrchestratorService.getAllSchemas(),
        this.transactionIotOrchestratorService.getAllTemplates(),
      ]);

      await this.dataSourceService.storeDataSourceSchemas(
        moduleSchemas,
        moduleTemplates,
      );
    }

    const storedSchemaItems: CachedSchemasDataModel =
      await this.dataSourceService.retrieveDataSourceSchemas(cacheKeys);

    if (isEmpty(storedSchemaItems)) {
      throw new NotFoundRpcError(ErrorCodes.RECORD_NOT_FOUND, [
        'Schemas in cache not found',
      ]);
    }

    return storedSchemaItems;
  }

  private async getSchemasAndCacheKeys(
    sensor: IndicatorModuleDataModel,
    publishers: IndicatorModuleDataModel[],
  ): Promise<{
    schemas: CachedSchemasDataModel;
    sensorKey: string;
    publisherKeys: string[];
  }> {
    const publishersTypes = publishers.map(
      (publisher) => publisher.dataSourceType,
    );

    const sensorDataSourceType = sensor ? sensor.dataSourceType : undefined;

    if (
      sensorDataSourceType === DataSourceTypesEnum.RMQ ||
      publishersTypes.includes(DataSourceTypesEnum.RMQ)
    ) {
      // TODO: clear RMQ data
    }

    const keys = this.schemaCacheService.getSensorPublisherCacheKeys(
      sensorDataSourceType,
      publishersTypes,
    );

    const schemas = await this.getTransactionsModulesSchemas(keys);

    const sensorKey = sensorDataSourceType ? keys[0] : undefined;
    const publisherKeys = isEmpty(publishersTypes)
      ? undefined
      : keys.slice(sensorDataSourceType ? 1 : 0);

    return { schemas, sensorKey, publisherKeys };
  }

  private createTransactionServiceMethodFactory(
    module: IndicatorModuleDataModel,
    schemas: CachedSchemasDataModel,
    operations: OperationBaseModel[],
    sensorKey?: string,
    publisherKey?: string,
    processedData?: ProcessedSensorDataModel,
    persistedIndicatorKey?: string,
  ) {
    return {
      [DataSourceTypesEnum.INSITE]: () =>
        this.insiteTransactionService.createUpdateInsiteTransaction(
          module,
          schemas,
          operations,
          sensorKey,
          publisherKey,
          processedData,
          persistedIndicatorKey,
        ),
      [DataSourceTypesEnum.MQTT]: () =>
        this.mqttTransactionService.createUpdateMqttTransaction(
          module,
          schemas,
          operations,
          sensorKey,
          publisherKey,
          processedData,
          persistedIndicatorKey,
        ),
    }[module.dataSourceType];
  }
}
