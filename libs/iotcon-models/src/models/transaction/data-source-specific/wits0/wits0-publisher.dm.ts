import {
  IBaseVariable,
  IPublisher,
  IWits0Subscription,
  IWits0Variable,
} from '../../../../interfaces';
import { ConnectorBaseModel } from '../../abstract';
import { VariableDataModel } from '../../variable.dm';
import { Wits0TransactionConfigDataModel } from './wits0-transaction-config.dm';
import { Wits0VariableDataModel } from './wits0-variable.dm';

export class Wits0PublisherDataModel
  extends ConnectorBaseModel
  implements IPublisher
{
  public wits0SampleRate: number;
  public wits0Direction: boolean;
  public connectedSensorIds: string[];
  public variables: IBaseVariable[];
  public isDefault: boolean = false;

  constructor(
    moduleId: string,
    dataSourceId: string,
    config: Partial<Wits0TransactionConfigDataModel>,
    connectedSensorIds: string[]
  ) {
    super(moduleId, dataSourceId, config.databusKey);

    const { sampleRate, direction, variables } = config.subscription;

    this.wits0SampleRate = sampleRate;
    this.wits0Direction = direction;

    this.variables = variables.map((variable) =>
      VariableDataModel._initializeFromWits0Variable(variable)
    ) as IBaseVariable[];

    this.connectedSensorIds = connectedSensorIds;
  }

  public static _initialize(
    moduleId: string,
    dataSourceId: string,
    databusKey: string,
    sampleRate: number,
    direction: boolean,
    variables: IWits0Variable[] | IBaseVariable[],
    connectedSensorIds: string[],
    isWits0VariableInit?: boolean
  ): Wits0PublisherDataModel {
    return new this(
      moduleId,
      dataSourceId,
      {
        databusKey,
        subscription: {
          sampleRate,
          direction,
          variables: isWits0VariableInit
            ? (variables as IBaseVariable[]).map(
                (variable) => new Wits0VariableDataModel(variable)
              )
            : (variables as IWits0Variable[]),
        } as IWits0Subscription,
      } as Wits0TransactionConfigDataModel,
      connectedSensorIds
    );
  }
}
