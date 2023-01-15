/**
 * This is the entrypoint for the IoT Configurator Proto Lib.
 * This lib is used to share protobuf builds as ts inside of the project
 */

import {
  DataSourceDto,
  DataSourceId,
  DataSourceServiceClient,
} from './proto/datasource';

interface IDataSourceDto extends DataSourceDto {}
interface IDataSourceId extends DataSourceId {}

export { IDataSourceDto, IDataSourceId, DataSourceServiceClient };
export * from './mapping';
