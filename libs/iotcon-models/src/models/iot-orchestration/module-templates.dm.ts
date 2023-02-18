import { ITemplates } from '../../interfaces';
import { ModuleTemplateDataModel } from './module-template.dm';

export class ModuleTemplatesDataModel implements ITemplates {
  public total: number;
  public templates: ModuleTemplateDataModel[];

  constructor(total: number, templates: ModuleTemplateDataModel[]) {
    this.total = total;
    this.templates = templates;
  }
}
