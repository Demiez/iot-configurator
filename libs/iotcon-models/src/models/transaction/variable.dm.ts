import { DataSourceTypesEnum } from '../../enums';
import {
  IBaseVariable,
  IModbusVariable,
  ISourceData,
  IVariable,
  IVariableModbusData,
  IWits0Variable,
} from '../../interfaces';
import { IndicatorModuleDataModel } from '../indicator';

export class VariableDataModel implements IBaseVariable {
  public uom: string;
  public uoc: string;

  public variableName?: string;
  public variableId?: string;
  public indicatorKey?: string;
  public _id?: string;
  public modbusData?: IVariableModbusData;
  public isRepublishingFailed?: boolean;
  public isSubstitution?: boolean;

  constructor(
    indicatorModule: IndicatorModuleDataModel,
    indicatorKey?: string
  ) {
    const { uom, uoc, variableName, modbusData, variableId } = indicatorModule;

    this.uom = uom;
    this.uoc = uoc;
    this.indicatorKey = indicatorKey;

    switch (indicatorModule.dataSourceType) {
      case DataSourceTypesEnum.MODBUS: {
        this.modbusData = modbusData;
        break;
      }
      case DataSourceTypesEnum.WITS0: {
        this.variableId = variableId;
        break;
      }
      default: {
        this.variableName = variableName;
      }
    }
  }

  public static _initializeDefault(
    uoc: string,
    indicatorKey: string
  ): VariableDataModel {
    return new this(
      {
        variableName: indicatorKey,
        uom: 'UOM_unitless',
        uoc,
      } as IndicatorModuleDataModel,
      indicatorKey
    );
  }

  public static _initializeFromDocument(
    variable: IVariable,
    dataSourceType: DataSourceTypesEnum
  ): VariableDataModel {
    const { _id, variableName, uom, uoc, modbusData, variableId } = variable;

    return new this(
      {
        variableName,
        uom,
        uoc,
        modbusData,
        dataSourceType,
        variableId,
      } as IndicatorModuleDataModel,
      _id
    );
  }

  public static _initializeFromNestedDocument(
    variable: IVariable
  ): VariableDataModel {
    const { indicatorKey, variableName, uom, uoc } = variable;

    return new this(
      {
        variableName,
        uom,
        uoc,
      } as IndicatorModuleDataModel,
      indicatorKey
    );
  }

  public static _initializeFromSourceData(
    sourceData: ISourceData,
    indicatorKey: string
  ): VariableDataModel {
    const { variableName, uom, uoc } = sourceData;

    return new this(
      {
        variableName,
        uom,
        uoc,
      } as IndicatorModuleDataModel,
      indicatorKey
    );
  }

  public static _initializeFromModbusVariable(
    modbusVariable: IModbusVariable
  ): VariableDataModel {
    const {
      registerType,
      typeValue,
      endian,
      startAddress,
      uom,
      uoc,
      indicatorKey,
      isRepublishingFailed,
      isSubstitution,
    } = modbusVariable;

    const instance = new this(
      {
        dataSourceType: DataSourceTypesEnum.MODBUS,
        modbusData: {
          registerType,
          typeValue,
          endian,
          startAddress,
        } as IVariableModbusData,
        uom,
        uoc,
      } as IndicatorModuleDataModel,
      indicatorKey
    );

    instance.isRepublishingFailed = isRepublishingFailed;
    instance.isSubstitution = isSubstitution;

    return instance;
  }

  public static _initializeFromWits0Variable(
    wits0Variable: IWits0Variable
  ): VariableDataModel {
    const { indicatorKey, id, uom, uoc, isRepublishingFailed, isSubstitution } =
      wits0Variable;

    const instance = new this(
      {
        dataSourceType: DataSourceTypesEnum.WITS0,
        variableId: id,
        uom,
        uoc,
      } as IndicatorModuleDataModel,
      indicatorKey
    );

    instance.isRepublishingFailed = isRepublishingFailed;
    instance.isSubstitution = isSubstitution;

    return instance;
  }
}
