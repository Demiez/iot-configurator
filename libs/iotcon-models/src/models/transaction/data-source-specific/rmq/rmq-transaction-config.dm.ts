import { IBaseVariable, IRmqInput, IRmqOutput } from '../../../../interfaces';
import { IndicatorModuleDataModel } from '../../../indicator';
import { TransactionConfigBaseModel } from '../../abstract';
import { RmqConfigSettingsDataModel } from './rmq-config-settings.dm';

export class RmqTransactionConfigDataModel extends TransactionConfigBaseModel {
  public rmqSettings: RmqConfigSettingsDataModel;
  public outputs?: IRmqOutput[];
  public inputs?: IRmqInput[];
  public moduleId?: string;

  constructor(
    indicatorModule: IndicatorModuleDataModel,
    indicatorKey?: string,
    moduleId?: string,
    isSensor?: boolean
  ) {
    super();
    this.sourceName = indicatorModule.sourceName;
    this.rmqSettings = new RmqConfigSettingsDataModel(indicatorModule);
    this.isPrimary = !!indicatorModule.isPrimary;

    const variable = this.mapToRmqVariable(indicatorModule, indicatorKey);

    if (moduleId) {
      this.moduleId = moduleId;
    }

    const variableConfigurationList = [
      {
        routingKey: indicatorModule.routingKey,
        variables: [variable],
      },
    ];

    if (isSensor) {
      this.inputs = variableConfigurationList;
    } else {
      this.outputs = variableConfigurationList;
    }
  }

  private mapToRmqVariable(
    indicatorModule: IndicatorModuleDataModel,
    indicatorKey?: string
  ): IBaseVariable {
    const { isExternal, variableName, uom, uoc } = indicatorModule;

    if (isExternal) {
      return {
        indicatorKey: variableName,
        variableName,
        uom,
        uoc,
      };
    }

    return {
      indicatorKey,
      variableName: indicatorModule.isDefault ? indicatorKey : variableName,
      uom,
      uoc,
    } as IBaseVariable;
  }
}
