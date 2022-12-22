/**
 * This is the entrypoint for the IoT Configurator Proto Lib.
 * This lib is used to share protobuf builds as ts inside of the project
 */

import { DataSourceDto, DataSourceServiceClient } from './proto/datasource';

interface IDataSourceDto extends DataSourceDto {}

export { IDataSourceDto, DataSourceServiceClient };
