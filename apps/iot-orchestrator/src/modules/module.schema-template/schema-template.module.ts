import { Logger, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  moduleSchemaModelFactory,
  moduleTemplateModelFactory,
} from '../module.db/schemas';
import { SchemaTemplateRepository } from './repository/schema-template.repository';
import { SchemaTemplateController } from './schema-template.controller';
import { SchemaTemplateService } from './schema-template.service';

@Module({
  controllers: [SchemaTemplateController],
  providers: [Logger, SchemaTemplateService, SchemaTemplateRepository],
  imports: [
    MongooseModule.forFeatureAsync([
      moduleSchemaModelFactory,
      moduleTemplateModelFactory,
    ]),
  ],
  exports: [SchemaTemplateService],
})
export class SchemaTemplateModule {}
