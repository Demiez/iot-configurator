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
import {
  DATA_SOURCE_CACHE_DB_NUMBER,
  DEFAULT_TTL_IN_SECONDS,
} from './constants/cache.constants';
import {
  DataSourceSnapshotDataModel,
  IDataSourceSnapshot,
} from '~iotcon-models';

@Injectable()
export class DataSourceSnapshotCacheService implements OnModuleInit {
  private snapshotCache: RedisClientType<
    unknown & RedisModules,
    RedisFunctions,
    RedisScripts
  >;
  private schemaTtl: number = 6 * DEFAULT_TTL_IN_SECONDS;

  constructor(private readonly logger: Logger) {}

  public async onModuleInit(): Promise<void> {
    const { REDIS_HOST, REDIS_PORT } = process.env;

    this.snapshotCache = createClient({
      socket: {
        host: REDIS_HOST,
        port: Number(REDIS_PORT),
        reconnectStrategy: (retries) => Math.min(retries * 50, 5000),
      },
      database: DATA_SOURCE_CACHE_DB_NUMBER,
    } as RedisClientOptions);

    this.snapshotCache.on('error', (error: Error) => {
      throw new InternalRpcError(ErrorCodes.REDIS_ERROR, [error.message]);
    });

    await this.snapshotCache.connect();
    await this.clearSnapshotCache();

    this.logger.log(
      `Initialized dataSource snapshot cache on ${REDIS_HOST}:${REDIS_PORT}`,
    );
  }

  public async putSnapshotToCache(
    dataSourceId: string,
    snapshot: IDataSourceSnapshot,
  ): Promise<void> {
    await this.snapshotCache.set(dataSourceId, JSON.stringify(snapshot));
    await this.snapshotCache.expire(dataSourceId, this.schemaTtl);

    this.logger.log(`Cached dataSource snapshot: ${dataSourceId}`);
  }

  public async getSnapshotFromCache(
    dataSourceId: string,
  ): Promise<DataSourceSnapshotDataModel> {
    const cachedData = await this.snapshotCache.get(dataSourceId);

    if (!cachedData) {
      return;
    }

    return new DataSourceSnapshotDataModel(JSON.parse(cachedData));
  }

  public async clearSnapshotCache(): Promise<void> {
    await this.snapshotCache.flushAll();
  }
}
