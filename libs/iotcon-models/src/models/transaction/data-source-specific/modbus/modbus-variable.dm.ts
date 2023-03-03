import {
  EndiansEnum,
  RegisterTypesEnum,
  TypeValuesEnum,
} from '../../../../enums';
import { IBaseVariable, IModbusVariable } from '../../../../interfaces';

export class ModbusVariableDataModel implements IModbusVariable {
  public registerType: RegisterTypesEnum;
  public typeValue: TypeValuesEnum;
  public endian: EndiansEnum;
  public startAddress: number;
  public indicatorKey?: string;
  public uom?: string;
  public uoc?: string;

  constructor(variable: IBaseVariable) {
    const { registerType, typeValue, endian, startAddress } =
      variable.modbusData;

    const { indicatorKey, uom, uoc } = variable;

    this.registerType = registerType;
    this.typeValue = typeValue;
    this.endian = endian;
    this.startAddress = startAddress;
    this.indicatorKey = indicatorKey;
    this.uom = uom;
    this.uoc = uoc;
  }
}
