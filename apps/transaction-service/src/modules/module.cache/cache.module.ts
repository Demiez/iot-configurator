import { Logger, Module } from '@nestjs/common';
import { DataSourceSnapshotCacheService } from './data-source-snapshot-cache.service';
import { SchemaCacheService } from './schema-cache.service';

@Module({
  controllers: [],
  providers: [Logger, SchemaCacheService, DataSourceSnapshotCacheService],
  imports: [],
  exports: [SchemaCacheService, DataSourceSnapshotCacheService],
})
export class CacheModule {}
