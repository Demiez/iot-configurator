import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DataSource, DataSourceSchema } from '../module.db/schemas';
import { DataSourceController } from './data-source.controller';
import { DataSourceService } from './data-source.service';
import { DataSourceRepository } from './repository/data-source.repository';

@Module({
  controllers: [DataSourceController],
  providers: [DataSourceService, DataSourceRepository],
  imports: [
    MongooseModule.forFeature([
      { name: DataSource.name, schema: DataSourceSchema },
    ]),
  ],
  exports: [DataSourceService],
})
export class DataSourceModule {}
