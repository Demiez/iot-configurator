import { DataSourceSchemaDataModel } from '../../module.data-source/models/data-source-schema.dm';
import { ICachedSchemaData } from '../interfaces';

export class CachedSchemasDataModel
  implements ICachedSchemaData<DataSourceSchemaDataModel>
{
  [key: string]: DataSourceSchemaDataModel;
}
