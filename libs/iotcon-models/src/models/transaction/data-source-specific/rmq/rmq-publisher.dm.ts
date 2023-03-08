import { IBaseVariable, IPublisher } from '../../../../interfaces';
import { ConnectorBaseModel } from '../../abstract';
import { RmqTransactionConfigDataModel } from './rmq-transaction-config.dm';

export class RmqPublisherDataModel
  extends ConnectorBaseModel
  implements IPublisher
{
  public connectedSensorIds: string[];
  public variables: IBaseVariable[];
  public rmqSettingsId: string;
  public routingKey: string;
  public isDefault: boolean;

  constructor(
    moduleId: string,
    dataSourceId: string,
    config: Partial<RmqTransactionConfigDataModel>,
    connectedSensorIds: string[],
    rmqSettingsId: string,
    isDefault: boolean
  ) {
    super(moduleId, dataSourceId, config.databusKey);
    const { routingKey, variables } = config.outputs[0];

    this.variables = variables as IBaseVariable[];
    this.connectedSensorIds = connectedSensorIds;
    this.rmqSettingsId = rmqSettingsId;
    this.routingKey = routingKey;
    this.isDefault = isDefault;
  }

  public static _initialize(
    moduleId: string,
    dataSourceId: string,
    databusKey: string,
    routingKey: string,
    variables: IBaseVariable[],
    connectedSensorIds: string[],
    rmqSettingsId: string,
    isDefault?: boolean
  ): RmqPublisherDataModel {
    return new this(
      moduleId,
      dataSourceId,
      {
        databusKey,
        outputs: [{ routingKey, variables }],
      } as RmqTransactionConfigDataModel,
      connectedSensorIds,
      rmqSettingsId,
      !!isDefault
    );
  }
}
