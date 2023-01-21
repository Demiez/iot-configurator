import { keys, pick } from 'lodash';
import {
  DataSourceTypesEnum,
  IDataSource,
  InsiteLogLevelEnum,
} from '~iotcon-models';

class InsiteDataSourceViewModel {
  public id: string = undefined;
  public name: string = undefined;
  public port: number = undefined;
  public type: DataSourceTypesEnum = undefined;
  public isDefault: boolean = undefined;
  public isPrimary: boolean = undefined;
  public insiteServerAddress: string = undefined;
  public bridgeId: string = undefined;
  public logLevel: InsiteLogLevelEnum = undefined;

  constructor(body: IDataSource) {
    const pickedBody = pick(body, keys(this));

    Object.assign(this, pickedBody);
  }
}

class MqttDataSourceViewModel {
  public id: string = undefined;
  public name: string = undefined;
  public port: number = undefined;
  public type: DataSourceTypesEnum = undefined;
  public isDefault: boolean = undefined;
  public isPrimary: boolean = undefined;
  public mqttServerAddress: string = undefined;

  constructor(body: IDataSource) {
    const pickedBody = pick(body, keys(this));

    Object.assign(this, pickedBody);
  }
}

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
