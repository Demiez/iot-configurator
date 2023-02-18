import { ISchema, ITemplate } from '../../interfaces';
import { Identifier } from '../core';

export class ModuleTemplateDataModel extends Identifier implements ITemplate {
  public version: number;
  public templateId: string;
  public config: string;

  constructor(moduleTemplate: ITemplate) {
    super();
    const { version, templateId, config } = moduleTemplate;

    this.version = version;
    this.templateId = templateId;
    this.config = config;
  }
}
