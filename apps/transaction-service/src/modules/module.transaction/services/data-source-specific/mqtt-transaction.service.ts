import { Injectable, Logger } from '@nestjs/common';
import {
  DataSourceTypesEnum,
  IndicatorModuleDataModel,
  OperationBaseModel,
  ProcessedSensorDataModel,
} from '~iotcon-models';
import { CachedSchemasDataModel } from '../../../module.cache/models/cached-schemas.dm';

@Injectable()
export class MqttTransactionService {
  private readonly dataSourceType = DataSourceTypesEnum.MQTT;

  constructor(private readonly logger: Logger) {}

  public async createUpdateMqttTransaction(
    module: IndicatorModuleDataModel,
    schemas: CachedSchemasDataModel,
    operations: OperationBaseModel[],
    sensorKey?: string,
    publisherKey?: string,
    processedData?: ProcessedSensorDataModel,
    persistedIndicatorKey?: string,
  ): Promise<void> {
    this.logger.log([
      module,
      schemas,
      operations,
      sensorKey,
      publisherKey,
      processedData,
      persistedIndicatorKey,
    ]);
  }
}
