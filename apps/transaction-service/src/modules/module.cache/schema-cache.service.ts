import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import {
  createClient,
  RedisClientOptions,
  RedisClientType,
  RedisFunctions,
  RedisModules,
  RedisScripts,
} from 'redis';
import process from 'process';
import { ErrorCodes } from '~iotcon-errors';
import { InternalRpcError } from '../../core/errors/rpc-errors';
import { DataSourceSchemaDataModel } from '../module.data-source/models';
import {
  DEFAULT_TTL_IN_SECONDS,
  SCHEMA_CACHE_DB_NUMBER,
} from './constants/cache.constants';
import { ICachedItem } from './interfaces/cached-item.interfaces';
import { ICachedSchemaData } from './interfaces';
import { isEmpty } from 'lodash';
import { DataSourceTypesEnum } from '~iotcon-models';

@Injectable()
export class SchemaCacheService implements OnModuleInit {
  private schemaCache: RedisClientType<
    unknown & RedisModules,
    RedisFunctions,
    RedisScripts
  >;
  private schemaTtl: number = 12 * DEFAULT_TTL_IN_SECONDS;

  constructor(private readonly logger: Logger) {}

  public async onModuleInit(): Promise<void> {
    const { REDIS_HOST, REDIS_PORT } = process.env;

    this.schemaCache = createClient({
      socket: {
        host: REDIS_HOST,
        port: Number(REDIS_PORT),
        reconnectStrategy: (retries) => Math.min(retries * 50, 5000),
      },
      database: SCHEMA_CACHE_DB_NUMBER,
    } as RedisClientOptions);

    this.schemaCache.on('error', (error: Error) => {
      throw new InternalRpcError(ErrorCodes.REDIS_ERROR, [error.message]);
    });

    await this.schemaCache.connect();
    await this.clearSchemaCache();

    this.logger.log(`Initialized schema cache on ${REDIS_HOST}:${REDIS_PORT}`);
  }

  public async getStoredSchemaKeys(): Promise<string[]> {
    return await this.schemaCache.keys('*');
  }

  public async putSchemaToCache(
    cacheKey: string,
    schema: DataSourceSchemaDataModel,
  ): Promise<void> {
    schema.cacheKey = cacheKey;

    await this.schemaCache.set(cacheKey, JSON.stringify(schema));
    await this.schemaCache.expire(cacheKey, this.schemaTtl);

    this.logger.log(`Cached schema: ${cacheKey}`);
  }

  public async putBatchOfSchemasToCache(
    schemas: ICachedItem<DataSourceSchemaDataModel>[],
  ): Promise<void> {
    const schemasArray: string[] & DataSourceSchemaDataModel[] = [];
    const cacheKeys: string[] = [];

    schemas.forEach((schema) => {
      schema.value.cacheKey = schema.key;

      schemasArray.push(schema.key);
      schemasArray.push(JSON.stringify(schema.value));
      cacheKeys.push(schema.key);
    });

    await this.schemaCache.mSet(schemasArray);

    await Promise.all(
      cacheKeys.map((cacheKey) =>
        this.schemaCache.expire(cacheKey, this.schemaTtl),
      ),
    );

    this.logger.log(`Cached schemas: ${cacheKeys.join(',')}`);
  }

  public async getSchemaFromCache(
    key: string,
  ): Promise<DataSourceSchemaDataModel> {
    const cachedData = await this.schemaCache.get(key);

    if (!cachedData) {
      return;
    }

    return JSON.parse(cachedData) as DataSourceSchemaDataModel;
  }

  public async getBatchOfSchemasFromCache(
    cacheKeys?: string[],
  ): Promise<ICachedSchemaData<DataSourceSchemaDataModel>> {
    const storedKeys: string[] = isEmpty(cacheKeys)
      ? await this.getStoredSchemaKeys()
      : cacheKeys;

    const cachedData = await this.schemaCache.mGet(storedKeys);

    const cachedSchemaData: ICachedSchemaData<DataSourceSchemaDataModel> = {};

    cachedData.filter(Boolean).forEach((stringData) => {
      const parsedData: DataSourceSchemaDataModel = JSON.parse(stringData);

      cachedSchemaData[parsedData.cacheKey] = parsedData;
    });

    return cachedSchemaData;
  }

  public getSensorPublisherCacheKeys(
    sensorType: DataSourceTypesEnum,
    publisherTypes: DataSourceTypesEnum[],
  ): string[] {
    const keys: string[] = [];

    if (sensorType) {
      keys.push(
        sensorType === DataSourceTypesEnum.MQTT ||
          sensorType === DataSourceTypesEnum.RMQ
          ? sensorType.toLowerCase() + '_collector'
          : sensorType.toLowerCase() + '_sensor',
      );
    }

    publisherTypes.forEach((publisherType) =>
      keys.push(publisherType.toLowerCase() + '_publisher'),
    );

    return keys;
  }

  public async checkIsSchemaCacheEmpty(): Promise<boolean> {
    const storedKeys = await this.getStoredSchemaKeys();

    return isEmpty(storedKeys);
  }

  public async clearSchemaCache(): Promise<void> {
    await this.schemaCache.flushAll();
  }
}
