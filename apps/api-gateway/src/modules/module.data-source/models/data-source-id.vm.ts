import { IDataSourceId } from '~iotcon-models';

export class DataSourceIdViewModel {
  public id: string;

  constructor(data: IDataSourceId) {
    this.id = data.id;
  }
}
