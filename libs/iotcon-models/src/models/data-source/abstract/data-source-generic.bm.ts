import { DataSourceTypesEnum } from '../../../enums';

export abstract class DataSourceGenericBaseModel {
  public dataSourceId: string;
  public dataSourceType: DataSourceTypesEnum;
  public sourceName: string;

  public usePrimary?: boolean;
  constructor(
    dataSourceId: string,
    dataSourceType: DataSourceTypesEnum,
    sourceName: string
  ) {
    this.dataSourceId = dataSourceId;
    this.dataSourceType = dataSourceType;
    this.sourceName = sourceName;
  }
}
