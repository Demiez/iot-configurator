import { ISensor } from '../../../../interfaces';
import { ConnectorBaseModel } from '../../abstract';

export class RmqSensorDataModel extends ConnectorBaseModel implements ISensor {
  public rmqSettingsId: string;
  public routingKey: string;

  constructor(
    moduleId: string,
    dataSourceId: string,
    rmqSettingsId: string,
    routingKey: string
  ) {
    super(moduleId, dataSourceId);

    this.rmqSettingsId = rmqSettingsId;
    this.routingKey = routingKey;
  }
}
