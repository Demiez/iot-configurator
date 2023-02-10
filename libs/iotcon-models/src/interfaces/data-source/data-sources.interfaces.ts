import {
  DataSourcesDto,
  DataSourcesByTypesDto,
  DataSourcesIdsDto,
} from '~iotcon-proto';
import { DataSourceTypesEnum } from '../../enums';

export interface IDataSources extends DataSourcesDto {}
export interface IDataSourcesIds extends DataSourcesIdsDto {}
export interface IDataSourcesByTypes extends DataSourcesByTypesDto {
  types: DataSourceTypesEnum[];
}
