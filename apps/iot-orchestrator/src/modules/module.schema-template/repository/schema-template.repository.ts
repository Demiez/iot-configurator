import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ModuleSchemaDataModel } from '~iotcon-models';
import { ModuleTemplateDataModel } from '~iotcon-models';
import {
  ModuleSchema,
  ModuleSchemaDocument,
  ModuleTemplate,
  ModuleTemplateDocument,
} from '../../module.db/schemas';

@Injectable()
export class SchemaTemplateRepository {
  constructor(
    @InjectModel(ModuleSchema.name)
    private moduleSchemaModel: Model<ModuleSchemaDocument>,
    @InjectModel(ModuleTemplate.name)
    private moduleTemplateModel: Model<ModuleTemplateDocument>,
  ) {}

  public async getCountOfModuleSchemas(): Promise<number> {
    return await this.moduleSchemaModel.countDocuments({});
  }

  public async getCountOfModuleTemplates(): Promise<number> {
    return await this.moduleTemplateModel.countDocuments({});
  }

  public async insertManyModuleSchemas(
    moduleSchemas: ModuleSchemaDataModel[],
  ): Promise<void> {
    try {
      await this.moduleSchemaModel.insertMany(moduleSchemas, {
        ordered: false,
      });
    } catch (error) {
      if (error.code !== 11000) {
        throw error;
      }
    }
  }

  public async insertManyModuleTemplates(
    moduleTemplates: ModuleTemplateDataModel[],
  ): Promise<void> {
    try {
      await this.moduleTemplateModel.insertMany(moduleTemplates, {
        ordered: false,
      });
    } catch (error) {
      if (error.code !== 11000) {
        throw error;
      }
    }
  }

  public async findAllModuleSchemas(): Promise<ModuleSchemaDocument[]> {
    return await this.moduleSchemaModel.find({});
  }

  public async findAllModuleTemplates(): Promise<ModuleTemplateDocument[]> {
    return await this.moduleTemplateModel.find({});
  }
}
