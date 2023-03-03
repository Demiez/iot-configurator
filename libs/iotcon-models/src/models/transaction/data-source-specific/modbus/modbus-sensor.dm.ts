import { ISensor } from '../../../../interfaces';
import { ConnectorBaseModel } from '../../abstract';
import { ModbusTransactionConfigDataModel } from './modbus-transaction-config.dm';

export class ModbusSensorDataModel
  extends ConnectorBaseModel
  implements ISensor
{
  public modbusSampleRate: number;
  public modbusReadBlocksData: boolean;

  constructor(
    moduleId: string,
    dataSourceId: string,
    config: Partial<ModbusTransactionConfigDataModel>
  ) {
    super(moduleId, dataSourceId);

    this.modbusSampleRate = config.modbusSampleRate;
    this.modbusReadBlocksData = config.readBlocksData;
  }

  public static _initialize(
    moduleId: string,
    dataSourceId: string,
    modbusSampleRate: number,
    readBlocksData: boolean
  ): ModbusSensorDataModel {
    return new this(moduleId, dataSourceId, {
      modbusSampleRate,
      readBlocksData,
    } as ModbusTransactionConfigDataModel);
  }
}
