import { IDataSourceId } from '../../interfaces';

export class DataSourceIdDataModel implements IDataSourceId {
  public id: string;

  constructor(id: string) {
    this.id = id;
  }
}
