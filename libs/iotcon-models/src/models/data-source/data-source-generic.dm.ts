import { DataSourceTypesEnum } from '../../enums';
import { IDataSource } from '../../interfaces';
import { DataSourceGenericBaseModel } from './abstract/data-source-generic.bm';

export class DataSourceGenericDataModel extends DataSourceGenericBaseModel {
  public mqttServerAddress?: string;
  public opcServerAddressUrl?: string;

  constructor(body: IDataSource) {
    super(body.id, body.type, body.name);

    switch (body.type) {
      case DataSourceTypesEnum.MQTT: {
        this.mqttServerAddress = body.mqttServerAddress;
        break;
      }
      case DataSourceTypesEnum.OPCUA: {
        this.opcServerAddressUrl = body.opcuaServerAddress;
        break;
      }
    }
  }
}
