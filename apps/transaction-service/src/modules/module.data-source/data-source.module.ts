import { Logger, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CacheModule } from '../module.cache/cache.module';
import { dataSourceSnapshotModelFactory } from '../module.db/schemas';
import { DataSourceService } from './data-source.service';
import { DataSourceSnapshotRepository } from './repository/data-source-snapshot.repository';

@Module({
  controllers: [],
  providers: [Logger, DataSourceService],
  imports: [
    CacheModule,
    MongooseModule.forFeatureAsync([dataSourceSnapshotModelFactory]),
  ],
  exports: [DataSourceService, DataSourceSnapshotRepository],
})
export class DataSourceModule {}
