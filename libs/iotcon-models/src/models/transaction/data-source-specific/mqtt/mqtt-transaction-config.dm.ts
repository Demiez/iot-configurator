import { IBaseVariable, IMqttInput, IMqttOutput } from '../../../../interfaces';
import { IndicatorModuleDataModel } from '../../../indicator';
import { TransactionConfigBaseModel } from '../../abstract';
import { ProcessedSensorDataModel } from '../../processed-sensor.dm';

export class MqttTransactionConfigDataModel extends TransactionConfigBaseModel {
  public outputs?: IMqttOutput[];
  public inputs?: IMqttInput[];
  public gatewayId?: string;
  public moduleId?: string;

  constructor(
    indicatorModule: IndicatorModuleDataModel,
    processedData?: ProcessedSensorDataModel,
    indicatorKey?: string,
    moduleId?: string,
    isSensor?: boolean
  ) {
    super();

    this.sourceName = indicatorModule.sourceName;
    this.isPrimary = !!indicatorModule.isPrimary;

    const variable = this.mapToMqttVariable(
      indicatorModule,
      processedData,
      indicatorKey
    );

    if (moduleId) {
      this.moduleId = moduleId;
    }

    const variableConfigurationList = [
      {
        mqttTopic: indicatorModule.mqttTopic,
        variables: [variable],
      },
    ];

    if (isSensor) {
      this.inputs = variableConfigurationList;
    } else {
      this.outputs = variableConfigurationList;
    }
  }

  private mapToMqttVariable(
    indicatorModule: IndicatorModuleDataModel,
    processedData: ProcessedSensorDataModel,
    indicatorKey: string
  ): IBaseVariable {
    const { isExternal, variableName, uom, uoc } = indicatorModule;

    if (isExternal && !processedData) {
      return {
        indicatorKey: variableName,
        variableName,
        uom,
        uoc,
      };
    }

    if (!isExternal && !processedData) {
      return {
        indicatorKey,
        variableName,
        uom,
        uoc,
      };
    }

    return {
      indicatorKey: processedData.generatedIndicatorKey,
      variableName: indicatorModule.isDefault
        ? processedData.generatedIndicatorKey
        : indicatorModule.variableName,
      uom: indicatorModule.uom,
      uoc: indicatorModule.uoc,
    };
  }
}
