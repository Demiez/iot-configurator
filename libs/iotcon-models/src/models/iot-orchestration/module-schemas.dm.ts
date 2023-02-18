import { ISchemas } from '../../interfaces';
import { ModuleSchemaDataModel } from './module-schema.dm';

export class ModuleSchemasDataModel implements ISchemas {
  public total: number;
  public schemas: ModuleSchemaDataModel[];

  constructor(total: number, schemas: ModuleSchemaDataModel[]) {
    this.total = total;
    this.schemas = schemas;
  }
}
