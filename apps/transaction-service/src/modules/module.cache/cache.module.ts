import { Logger, Module } from '@nestjs/common';
import { SchemaCacheService } from './schema-cache.service';

@Module({
  controllers: [],
  providers: [Logger, SchemaCacheService],
  imports: [],
  exports: [SchemaCacheService],
})
export class CacheModule {}
