import { Injectable, Logger } from '@nestjs/common';
import {
  DataSourceTypesEnum,
  IndicatorModuleDataModel,
  OperationBaseModel,
  ProcessedSensorDataModel,
} from '~iotcon-models';
import { CachedSchemasDataModel } from '../../../module.cache/models/cached-schemas.dm';
import { DataSourceService } from '../../../module.data-source/data-source.service';

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

    const { databusKey } =
      await this.dataSourceService.retrieveDataSourceSnapshot(
        module.dataSourceId,
      );
  }
}
