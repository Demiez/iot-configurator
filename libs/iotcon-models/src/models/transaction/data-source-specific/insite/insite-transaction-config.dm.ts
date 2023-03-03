import { IBaseVariable, IInsiteConnector } from '../../../../interfaces';
import { IndicatorModuleDataModel } from '../../../indicator';
import { TransactionConfigBaseModel } from '../../abstract/transaction-config.bm';

export class InsiteTransactionConfigDataModel
  extends TransactionConfigBaseModel
  implements IInsiteConnector
{
  public sourceName: string;
  public record: string;
  public descriptor: string;
  public isWellBased: boolean;
  public variables: IBaseVariable[] = [];
  public mqttServerAddress: string;

  public moduleId?: string;
  public gatewayId?: string;

  constructor(
    indicatorModule: IndicatorModuleDataModel,
    indicatorKey: string,
    moduleId?: string
  ) {
    super();

    this.sourceName = indicatorModule.sourceName;
    this.record = indicatorModule.record;
    this.descriptor = indicatorModule.descriptor;
    this.isWellBased = indicatorModule.isWellBased;
    this.mqttServerAddress = indicatorModule.mqttServerAddress;
    this.isPrimary = !!indicatorModule.isPrimary;

    if (moduleId) {
      this.moduleId = moduleId;
    }

    this.variables.push({
      indicatorKey,
      variableName: indicatorModule.variableName,
      uom: indicatorModule.uom,
      uoc: indicatorModule.uoc,
    });
  }
}
