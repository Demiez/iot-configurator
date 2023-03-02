import { ISchema, ITemplate } from '~iotcon-models';

export class DataSourceSchemaDataModel {
  public moduleClass: string;
  public moduleConfig: string;
  public version: number;

  public cacheKey?: string;

  constructor(moduleSchema: ISchema, moduleTemplate: ITemplate) {
    this.moduleClass = moduleSchema.class;
    this.moduleConfig = moduleSchema.config;
    this.version = moduleTemplate.version;
  }

  public static _initialize(
    moduleClass: string,
    moduleConfig: string,
    version: number,
  ): DataSourceSchemaDataModel {
    return new this(
      { class: moduleClass, config: moduleConfig } as ISchema,
      { version } as ITemplate,
    );
  }
}
