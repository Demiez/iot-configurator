import {
  DataSourceTypesEnum,
  OperationModesEnum,
  OperationTypesEnum,
} from '../../../enums';
import { IBaseVariable } from '../../../interfaces';

export abstract class OperationBaseModel {
  public mode: OperationModesEnum;
  public operationId: string;
  // Required any for base model
  // eslint-disable-next-line
  public config: any;

  public operationType: OperationTypesEnum;
  public dataSourceType: DataSourceTypesEnum;
  public dataSourceId?: string;
  public generatedIndicatorKey?: string;
  public newVariable?: IBaseVariable;
  public connectedSensorId?: string;
  public isDefault?: boolean;

  constructor(mode: OperationModesEnum) {
    this.mode = mode;
  }
}
