import { IBaseVariable, IMqttOutput, IPublisher } from '../../../../interfaces';
import { ConnectorBaseModel } from '../../abstract';
import { MqttTransactionConfigDataModel } from './mqtt-transaction-config.dm';

export class MqttPublisherDataModel
  extends ConnectorBaseModel
  implements IPublisher
{
  public mqttTopic: string;
  public connectedSensorIds: string[];
  public variables: IBaseVariable[];
  public isDefault: boolean;

  constructor(
    moduleId: string,
    dataSourceId: string,
    config: Partial<MqttTransactionConfigDataModel>,
    connectedSensorIds: string[],
    isDefault: boolean
  ) {
    super(moduleId, dataSourceId, config.databusKey);
    const { mqttTopic, variables } = config.outputs[0];

    this.mqttTopic = mqttTopic;
    this.variables = variables as IBaseVariable[];
    this.connectedSensorIds = connectedSensorIds;
    this.isDefault = isDefault;
  }

  public static _initialize(
    moduleId: string,
    dataSourceId: string,
    gatewayId: string,
    databusKey: string,
    mqttTopic: string,
    variables: IBaseVariable[],
    connectedSensorIds: string[],
    isDefault?: boolean
  ): MqttPublisherDataModel {
    return new this(
      moduleId,
      dataSourceId,
      {
        gatewayId,
        databusKey,
        outputs: [{ mqttTopic, variables } as IMqttOutput],
      },
      connectedSensorIds,
      !!isDefault
    );
  }
}
