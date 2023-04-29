import { Injectable, Logger } from '@nestjs/common';
import { isNil } from 'lodash';
import { ErrorCodes } from '~iotcon-errors';
import { ForbiddenRpcError } from '~iotcon-errors/lib/errors';
import { IDataSourceSnapshot, ISchema, ITemplate } from '~iotcon-models';
import { NotFoundRpcError } from '../../core/errors/rpc-errors';
import { DataSourceSnapshotCacheService } from '../module.cache/data-source-snapshot-cache.service';
import { ICachedItem } from '../module.cache/interfaces';
import { CachedSchemasDataModel } from '../module.cache/models/cached-schemas.dm';
import { SchemaCacheService } from '../module.cache/schema-cache.service';
import {
  FAILED_DATASOURCE_SNAPSHOT_FROM_DB_MESSAGE,
  FAILED_SCHEMAS_PARSING_MESSAGE,
} from './constants/data-source.constants';
import { DataSourceSchemaDataModel } from './models';
import { DataSourceSnapshotRepository } from './repository/data-source-snapshot.repository';

@Injectable()
export class DataSourceService {
  constructor(
    private readonly logger: Logger,
    private readonly schemaCacheService: SchemaCacheService,
    private readonly dataSourceSnapshotCacheService: DataSourceSnapshotCacheService,
    private readonly dataSourceSnapshotRepository: DataSourceSnapshotRepository,
  ) {}

  public async retrieveDataSourceSchemas(
    cacheKeys: string[],
  ): Promise<CachedSchemasDataModel> {
    return await this.schemaCacheService.getBatchOfSchemasFromCache(cacheKeys);
  }

  public async storeDataSourceSchemas(
    moduleSchemas: ISchema[],
    moduleTemplates: ITemplate[],
  ): Promise<void> {
    const schemaItems = this.mapToSchemaItems(moduleSchemas, moduleTemplates);

    await this.schemaCacheService.putBatchOfSchemasToCache(schemaItems);
  }

  public async retrieveDataSourceSnapshot(
    dataSourceId: string,
  ): Promise<IDataSourceSnapshot> {
    const cachedItem: IDataSourceSnapshot =
      await this.dataSourceSnapshotCacheService.getSnapshotFromCache(
        dataSourceId,
      );

    if (cachedItem) {
      return cachedItem;
    }

    const dataSourceFromDB =
      await this.dataSourceSnapshotRepository.getDataSourceSnapshotById(
        dataSourceId,
      );

    if (!dataSourceFromDB) {
      throw new NotFoundRpcError(ErrorCodes.RECORD_NOT_FOUND, [
        FAILED_DATASOURCE_SNAPSHOT_FROM_DB_MESSAGE,
      ]);
    }

    const { type, databusKey, isVirtual } = dataSourceFromDB;

    const cacheData = new CachedDataSourceDataModel(
      type,
      databusKey,
      isVirtual,
    );

    await this.dataSourceSnapshotCacheService.putSnapshotToCache(
      dataSourceId,
      cacheData,
    );

    return cacheData;
  }

  private mapToSchemaItems(
    moduleSchemas: ISchema[],
    moduleTemplates: ITemplate[],
  ): ICachedItem<DataSourceSchemaDataModel>[] {
    const mappedModuleSchemas = moduleSchemas
      .map((moduleSchema) => {
        const key = this.processDataSourceCacheKey(moduleSchema.config);

        if (!key) {
          return;
        }

        const moduleTemplate = moduleTemplates.find(
          (template) => template.config === moduleSchema.config,
        );

        if (!moduleTemplate || isNil(moduleTemplate.version)) {
          throw new ForbiddenRpcError(
            ErrorCodes.IOT_CONNECTORS_PARSING_FAILED,
            [FAILED_SCHEMAS_PARSING_MESSAGE],
          );
        }

        const value = new DataSourceSchemaDataModel(
          moduleSchema,
          moduleTemplate,
        );

        return { key, value };
      })
      .filter(Boolean);

    return mappedModuleSchemas as ICachedItem<DataSourceSchemaDataModel>[];
  }

  private processDataSourceCacheKey(config: string): string {
    const key = '_';

    const configTags = config.split('.');
    const configType = configTags[2];
    const connectorType = configTags[4];

    return configType + key + connectorType;
  }
}
