import { DataSourceTypesEnum, IDataSource } from '~iotcon-models';
import {
  InsiteDataSourceViewModel,
  MqttDataSourceViewModel,
} from './source-specific';
export class DataSourceViewModel {
  public static _factory(
    dataSource: IDataSource
  ): InsiteDataSourceViewModel | MqttDataSourceViewModel {
    return {
      [DataSourceTypesEnum.INSITE]: () =>
        new InsiteDataSourceViewModel(dataSource),
      [DataSourceTypesEnum.MQTT]: () => new MqttDataSourceViewModel(dataSource),
    }[dataSource.type]();
  }
}
