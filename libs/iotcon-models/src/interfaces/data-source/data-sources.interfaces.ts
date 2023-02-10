import {
  DataSourcesDto,
  DataSourcesByTypesDto,
  DataSourcesIdsDto,
} from '~iotcon-proto';
import { DataSourceTypesEnum } from '../../enums';
import { IDataSource } from './data-source.interfaces';

export interface IDataSources extends DataSourcesDto {
  dataSources: IDataSource[];
}
export interface IDataSourcesIds extends DataSourcesIdsDto {}
export interface IDataSourcesByTypes extends DataSourcesByTypesDto {
  types: DataSourceTypesEnum[];
}
