import { DataSourceTypesEnum } from '../../enums';
import {
  IInsiteConnector,
  IMqttConnector,
  IRmqConnector,
  IWits0Connector,
} from './source-specific';
import { IBaseVariable } from './variable.interfaces';

export interface IPublisherTarget {
  publisherId: string;
  type: DataSourceTypesEnum;
}

export interface IPublisher
  extends IInsiteConnector,
    IMqttConnector,
    IRmqConnector,
    IWits0Connector {
  _id?: string;
  dataSourceId: string;
  databusKey: string;
  connectedSensorIds?: string[];
  variables?: IBaseVariable[];
  isDefault?: boolean;
  _created?: Date;
  _updated?: Date;
}
