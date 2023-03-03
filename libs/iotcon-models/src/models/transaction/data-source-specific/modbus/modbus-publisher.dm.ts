import {
  IBaseVariable,
  IModbusVariable,
  IPublisher,
} from '../../../../interfaces';
import { ConnectorBaseModel } from '../../abstract';
import { VariableDataModel } from '../../variable.dm';
import { ModbusTransactionConfigDataModel } from './modbus-transaction-config.dm';
import { ModbusVariableDataModel } from './modbus-variable.dm';

export class ModbusPublisherDataModel
  extends ConnectorBaseModel
  implements IPublisher
{
  public connectedSensorIds: string[];
  public variables: IBaseVariable[];
  public isDefault: boolean = false;

  constructor(
    moduleId: string,
    dataSourceId: string,
    config: Partial<ModbusTransactionConfigDataModel>,
    connectedSensorIds: string[]
  ) {
    super(moduleId, dataSourceId, config.databusKey);

    this.variables = config.variables.map((variable) =>
      VariableDataModel._initializeFromModbusVariable(variable)
    ) as IBaseVariable[];

    this.connectedSensorIds = connectedSensorIds;
  }

  public static _initialize(
    moduleId: string,
    dataSourceId: string,
    databusKey: string,
    variables: IModbusVariable[] | IBaseVariable[],
    connectedSensorIds: string[],
    isModbusVariableInit?: boolean
  ): ModbusPublisherDataModel {
    return new this(
      moduleId,
      dataSourceId,
      {
        databusKey,
        variables: isModbusVariableInit
          ? (variables as IBaseVariable[]).map(
              (variable) => new ModbusVariableDataModel(variable)
            )
          : (variables as IModbusVariable[]),
      } as ModbusTransactionConfigDataModel,
      connectedSensorIds
    );
  }
}
