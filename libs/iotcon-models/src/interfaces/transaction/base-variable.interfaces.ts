import { IVariableModbusData } from '../indicator';

export interface IBaseVariable {
  indicatorKey?: string;
  variableName?: string;
  uom?: string;
  uoc?: string;
  modbusData?: IVariableModbusData;
  variableId?: string;

  isRepublishingFailed?: boolean;
  isSubstitution?: boolean;
  initialSignalKey?: string;
}
