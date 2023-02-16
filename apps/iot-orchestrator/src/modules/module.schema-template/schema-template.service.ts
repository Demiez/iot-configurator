import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { ModuleTemplateDataModel } from '~iotcon-models';
import { SchemaTemplateRepository } from './repository/schema-template.repository';
import { join } from 'path';
import process from 'process';
import { readFileSync } from 'fs';
import { ModuleSchemaDataModel } from '~iotcon-models';
import { v4 } from 'uuid';

@Injectable()
export class SchemaTemplateService implements OnApplicationBootstrap {
  constructor(
    private readonly schemaTemplateRepository: SchemaTemplateRepository,
    private readonly logger: Logger,
  ) {}

  public async onApplicationBootstrap(): Promise<void> {
    const [schemasCount, templatesCount] = await Promise.all([
      this.schemaTemplateRepository.getCountOfModuleSchemas(),
      this.schemaTemplateRepository.getCountOfModuleTemplates(),
    ]);

    const defaultPopulationOperations: Promise<void>[] = [];

    if (schemasCount !== 0 && templatesCount !== 0) {
      this.logger.log('Found schemas and templates');
      return;
    }

    if (schemasCount === 0) {
      this.logger.log('Schemas not found. Performing default population');
      defaultPopulationOperations.push(this.populateDefaultSchemas());
    }

    if (templatesCount === 0) {
      this.logger.log('Templates not found. Performing default population');
      defaultPopulationOperations.push(this.populateDefaultTemplates());
    }

    await Promise.all(defaultPopulationOperations);

    this.logger.log('Finished default schemas/templates population');
  }

  private async populateDefaultSchemas(): Promise<void> {
    const defaultFilePath = join(
      process.cwd(),
      '/default-data/module-schemas.default-data.json',
    );

    const moduleSchemasData: ModuleSchemaDataModel[] = JSON.parse(
      readFileSync(defaultFilePath).toString(),
    );

    moduleSchemasData.forEach((moduleSchemaData) => {
      moduleSchemaData._id = v4();
    });

    await this.schemaTemplateRepository.insertManyModuleSchemas(
      moduleSchemasData,
    );
  }

  private async populateDefaultTemplates(): Promise<void> {
    const defaultFilePath = join(
      process.cwd(),
      '/default-data/module-templates.default-data.json',
    );

    const moduleTemplatesData: ModuleTemplateDataModel[] = JSON.parse(
      readFileSync(defaultFilePath).toString(),
    );

    moduleTemplatesData.forEach((moduleTemplateData) => {
      moduleTemplateData._id = v4();
    });

    await this.schemaTemplateRepository.insertManyModuleTemplates(
      moduleTemplatesData,
    );
  }
}
