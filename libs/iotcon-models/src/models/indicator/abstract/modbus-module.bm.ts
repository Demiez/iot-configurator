import { IVariableModbusData } from '../../../interfaces';

export abstract class ModbusModuleBaseModel {
  public modbusSampleRate?: number = undefined;
  public modbusReadBlocksData?: boolean = undefined;
  public modbusData?: IVariableModbusData = undefined;
}
