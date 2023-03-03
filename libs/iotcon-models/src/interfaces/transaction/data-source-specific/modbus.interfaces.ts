import { IVariableModbusData } from '../../indicator';
import { IBaseVariable } from '../variable.interfaces';

export interface IModbusConnector {
  modbusSampleRate?: number;
  modbusReadBlocksData?: boolean;
}

export interface IModbusUniqueFieldQuery {
  dataSourceId: string;
  modbusSampleRate?: number;
  modbusReadBlocksData?: boolean;
  databusKey?: string;
}

export interface IModbusVariable extends IBaseVariable, IVariableModbusData {}
