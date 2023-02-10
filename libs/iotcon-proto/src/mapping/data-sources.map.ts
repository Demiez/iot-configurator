import { DataSourcesDto } from '../proto/datasource';
import { mapDataSource } from './data-source.map';

export function mapDataSources(dataSourcesDto: DataSourcesDto) {
  const { dataSources } = dataSourcesDto;

  dataSources.forEach((dataSource) => mapDataSource(dataSource));
}
