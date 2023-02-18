import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import {
  ModuleSchemasDataModel,
  ModuleTemplateDataModel,
  ModuleTemplatesDataModel,
} from '~iotcon-models';
import { SchemaTemplateRepository } from './repository/schema-template.repository';
import { join } from 'path';
import process from 'process';
import { readFileSync } from 'fs';
import { ModuleSchemaDataModel } from '~iotcon-models';
import { NOT_FOUND_POPULATION_MESSAGE } from './constants/schema-template.constants';

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
      this.logger.log('Schemas' + NOT_FOUND_POPULATION_MESSAGE);
      defaultPopulationOperations.push(this.populateDefaultSchemas());
    }

    if (templatesCount === 0) {
      this.logger.log('Templates' + NOT_FOUND_POPULATION_MESSAGE);
      defaultPopulationOperations.push(this.populateDefaultTemplates());
    }

    await Promise.all(defaultPopulationOperations);

    this.logger.log('Finished default schemas/templates population');
  }

  public async getAllModuleSchemas(): Promise<ModuleSchemasDataModel> {
    const schemas = await this.schemaTemplateRepository.findAllModuleSchemas();

    return new ModuleSchemasDataModel(
      schemas.length,
      schemas.map((schema) => new ModuleSchemaDataModel(schema)),
    );
  }

  public async getAllModuleTemplates(): Promise<ModuleTemplatesDataModel> {
    const templates =
      await this.schemaTemplateRepository.findAllModuleTemplates();

    return new ModuleTemplatesDataModel(
      templates.length,
      templates.map((template) => new ModuleTemplateDataModel(template)),
    );
  }

  private async populateDefaultSchemas(): Promise<void> {
    const defaultFilePath = join(
      process.cwd(),
      '/default-data/module-schemas.default-data.json',
    );

    const moduleSchemasData: ModuleSchemaDataModel[] = JSON.parse(
      readFileSync(defaultFilePath).toString(),
    );

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

    await this.schemaTemplateRepository.insertManyModuleTemplates(
      moduleTemplatesData,
    );
  }
}
