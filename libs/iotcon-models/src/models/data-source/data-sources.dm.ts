import { IDataSource, IDataSources } from '../../interfaces';
import { DataSourceDataModel } from './data-source.dm';

export class DataSourcesDataModel implements IDataSources {
  public total: number;
  public dataSources: DataSourceDataModel[];

  constructor(total: number, dataSources: IDataSource[]) {
    this.total = total;
    this.dataSources = dataSources as DataSourceDataModel[];
  }
}
