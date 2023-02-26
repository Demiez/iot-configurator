import { DataSourceTypesEnum } from '../../enums';
import { IDataSourcesByTypes } from '../../interfaces';

export class DataSourcesByTypesRequestModel implements IDataSourcesByTypes {
  public types: DataSourceTypesEnum[];
  public isDefault: boolean;

  constructor(types: DataSourceTypesEnum[], isDefault: boolean) {
    this.types = types;
    this.isDefault = isDefault;
  }
}
