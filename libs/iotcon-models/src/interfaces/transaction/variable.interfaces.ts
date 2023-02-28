import { IVariableModbusData } from '../indicator';
import { IPublisherTarget } from './publisher.interfaces';

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

export interface IWits0Variable extends IBaseVariable {
  id: string;
}

export interface IVariable extends IBaseVariable {
  _id?: string;
  variableName?: string;
  uom?: string;
  uoc?: string;
  sensorId: string;
  publisherTargets: IPublisherTarget[];
  modbusData?: IVariableModbusData;
  variableId?: string;
}
