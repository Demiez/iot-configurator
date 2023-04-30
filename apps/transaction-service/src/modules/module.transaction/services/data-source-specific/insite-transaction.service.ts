import { Injectable, Logger } from '@nestjs/common';
import {
  DataSourceTypesEnum,
  IndicatorModuleDataModel,
  OperationBaseModel,
  ProcessedSensorDataModel,
} from '~iotcon-models';
import { CachedSchemasDataModel } from '../../../module.cache/models/cached-schemas.dm';
import { DataSourceService } from '../../../module.data-source/data-source.service';
import { v4 } from 'uuid';

@Injectable()
export class InsiteTransactionService {
  private readonly dataSourceType = DataSourceTypesEnum.INSITE;

  constructor(
    private readonly logger: Logger,
    private readonly dataSourceService: DataSourceService,
  ) {}

  public async createUpdateInsiteTransaction(
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
  }
}
