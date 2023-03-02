import { Logger, Module } from '@nestjs/common';
import { CacheModule } from '../module.cache/cache.module';
import { DataSourceService } from './data-source.service';

@Module({
  controllers: [],
  providers: [Logger, DataSourceService],
  imports: [CacheModule],
  exports: [DataSourceService],
})
export class DataSourceModule {}
