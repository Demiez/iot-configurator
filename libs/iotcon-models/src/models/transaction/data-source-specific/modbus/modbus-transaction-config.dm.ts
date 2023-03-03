import { IModbusConnector, IModbusVariable } from '../../../../interfaces';
import { IndicatorModuleDataModel } from '../../../indicator';
import { TransactionConfigBaseModel } from '../../abstract';
import { ModbusVariableDataModel } from './modbus-variable.dm';

export class ModbusTransactionConfigDataModel
  extends TransactionConfigBaseModel
  implements IModbusConnector
{
  public sourceName: string;
  public modbusSampleRate?: number;
  public readBlocksData?: boolean;
  public variables: IModbusVariable[] = [];
  public mqttServerAddress: string;

  public moduleId?: string;
  public gatewayId?: string;

  constructor(
    indicatorModule: IndicatorModuleDataModel,
    indicatorKey: string,
    moduleId?: string,
    isSensor?: boolean
  ) {
    super();

    this.sourceName = indicatorModule.sourceName;
    this.mqttServerAddress = indicatorModule.mqttServerAddress;
    this.isPrimary = !!indicatorModule.isPrimary;

    if (moduleId) {
      this.moduleId = moduleId;
    }

    if (isSensor) {
      this.modbusSampleRate = indicatorModule.modbusSampleRate;
      this.readBlocksData = indicatorModule.modbusReadBlocksData;
    }

    this.variables.push(
      new ModbusVariableDataModel({
        indicatorKey,
        uom: indicatorModule.uom,
        uoc: indicatorModule.uoc,
        modbusData: indicatorModule.modbusData,
      })
    );
  }
}
