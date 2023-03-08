import { IBaseVariable, IWits0Variable } from '../../../../interfaces';

export class Wits0VariableDataModel implements IWits0Variable {
  public indicatorKey: string;
  public id: string;
  public uom: string;
  public uoc: string;

  constructor(variable: IBaseVariable) {
    const { indicatorKey, variableId, uom, uoc } = variable;

    this.indicatorKey = indicatorKey;
    this.id = variableId;
    this.uom = uom;
    this.uoc = uoc;
  }
}
