import { Injectable, Logger } from '@nestjs/common';
import { isNil } from 'lodash';
import { ErrorCodes } from '~iotcon-errors';
import { ForbiddenRpcError } from '~iotcon-errors/lib/errors';
import { ISchema, ITemplate } from '~iotcon-models';
import { ICachedItem } from '../module.cache/interfaces';
import { CachedSchemasDataModel } from '../module.cache/models/cached-schemas.dm';
import { SchemaCacheService } from '../module.cache/schema-cache.service';
import { FAILED_SCHEMAS_PARSING_MESSAGE } from './constants/data-source.constants';
import { DataSourceSchemaDataModel } from './models';

@Injectable()
export class DataSourceService {
  constructor(
    private readonly logger: Logger,
    private readonly schemaCacheService: SchemaCacheService,
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
