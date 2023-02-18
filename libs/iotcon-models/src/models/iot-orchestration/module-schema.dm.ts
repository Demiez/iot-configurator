import { ModuleTypesEnum } from '../../enums';
import { ISchema } from '../../interfaces';
import { Identifier } from '../core';

export class ModuleSchemaDataModel extends Identifier implements ISchema {
  public name: string;
  public type: ModuleTypesEnum;
  public class: string;
  public config: string;

  constructor(moduleSchema: ISchema) {
    super();

    this.name = moduleSchema.name;
    this.type = moduleSchema.type;
    this.class = moduleSchema.class;
    this.config = moduleSchema.config;
  }
}
