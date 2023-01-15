import {
  DataSourceDto,
  DataSourceTypesEnum,
  InsiteLogLevelEnum,
  SecurityPolicyEnum,
} from '../proto/datasource';

export function mapDataSource(dataSource: DataSourceDto) {
  if (dataSource.type) {
    dataSource.type = DataSourceTypesEnum[
      dataSource.type
    ] as unknown as DataSourceTypesEnum;
  }

  if (dataSource.logLevel) {
    dataSource.logLevel = InsiteLogLevelEnum[
      dataSource.logLevel
    ] as unknown as InsiteLogLevelEnum;
  }

  if (dataSource.securityPolicy) {
    dataSource.securityPolicy = SecurityPolicyEnum[
      dataSource.securityPolicy
    ] as unknown as SecurityPolicyEnum;
  }
}
