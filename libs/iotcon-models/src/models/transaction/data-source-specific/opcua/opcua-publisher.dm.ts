import { IBaseVariable, IPublisher } from '../../../../interfaces';
import { ConnectorBaseModel } from '../../abstract';
import { OpcuaTransactionConfigDataModel } from './opcua-transaction-config.dm';

export class OpcuaPublisherDataModel
  extends ConnectorBaseModel
  implements IPublisher
{
  public connectedSensorIds: string[];
  public variables: IBaseVariable[];
  public isDefault: boolean = false;

  constructor(
    moduleId: string,
    dataSourceId: string,
    config: Partial<OpcuaTransactionConfigDataModel>,
    connectedSensorIds: string[]
  ) {
    super(moduleId, dataSourceId, config.databusKey);

    this.variables = config.variables as IBaseVariable[];
    this.connectedSensorIds = connectedSensorIds;
  }

  public static _initialize(
    moduleId: string,
    dataSourceId: string,
    databusKey: string,
    variables: IBaseVariable[],
    connectedSensorIds: string[]
  ): OpcuaPublisherDataModel {
    return new this(
      moduleId,
      dataSourceId,
      {
        databusKey,
        variables,
      } as OpcuaTransactionConfigDataModel,
      connectedSensorIds
    );
  }
}
