import { IMqttInput, ISensor } from '../../../../interfaces';
import { ConnectorBaseModel } from '../../abstract';
import { MqttTransactionConfigDataModel } from './mqtt-transaction-config.dm';

export class MqttSensorDataModel extends ConnectorBaseModel implements ISensor {
  public mqttTopic: string;

  constructor(
    moduleId: string,
    dataSourceId: string,
    config: Partial<MqttTransactionConfigDataModel>
  ) {
    super(moduleId, dataSourceId);

    this.mqttTopic = config.inputs[0].mqttTopic;
  }

  public static _initialize(
    moduleId: string,
    dataSourceId: string,
    mqttTopic: string
  ): MqttSensorDataModel {
    return new this(moduleId, dataSourceId, {
      inputs: [{ mqttTopic } as IMqttInput],
    });
  }
}
