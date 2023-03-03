import { IBaseVariable, IPublisher } from '../../../../interfaces';
import { ConnectorBaseModel } from '../../abstract';
import { InsiteTransactionConfigDataModel } from './insite-transaction-config.dm';

export class InsitePublisherDataModel
  extends ConnectorBaseModel
  implements IPublisher
{
  public record: string;
  public descriptor: string;
  public isWellBased: boolean;
  public connectedSensorIds: string[];
  public variables: IBaseVariable[];
  public isDefault: boolean = false;

  constructor(
    moduleId: string,
    dataSourceId: string,
    config: Partial<InsiteTransactionConfigDataModel>,
    connectedSensorIds: string[]
  ) {
    super(moduleId, dataSourceId, config.databusKey);

    const { record, descriptor, isWellBased, variables } = config;

    this.record = record;
    this.descriptor = descriptor;
    this.isWellBased = isWellBased;
    this.variables = variables as IBaseVariable[];
    this.connectedSensorIds = connectedSensorIds;
  }

  public static _initialize(
    moduleId: string,
    dataSourceId: string,
    gatewayId: string,
    databusKey: string,
    record: string,
    descriptor: string,
    isWellBased: boolean,
    variables: IBaseVariable[],
    connectedSensorIds: string[]
  ): InsitePublisherDataModel {
    return new this(
      moduleId,
      dataSourceId,
      {
        gatewayId,
        databusKey,
        record,
        descriptor,
        isWellBased,
        variables,
      },
      connectedSensorIds
    );
  }
}
