import { Injectable, Logger } from '@nestjs/common';
import {
  DataSourceTypesEnum,
  IBaseVariable,
  IndicatorModuleDataModel,
  ModuleTypesEnum,
  MqttOperationRequestModel,
  MqttTransactionConfigDataModel,
  OperationBaseModel,
  OperationModesEnum,
  OperationTypesEnum,
  ProcessedSensorDataModel,
} from '~iotcon-models';
import { CachedSchemasDataModel } from '../../../module.cache/models/cached-schemas.dm';
import { DataSourceService } from '../../../module.data-source/data-source.service';
import { DataSourceSchemaDataModel } from '../../../module.data-source/models';
import {
  IPublisherDocument,
  ISensorDocument,
} from '../../../module.db/schemas';
import { v4 } from 'uuid';
import { TransactionRepository } from '../../repository/transaction.repository';
import { BaseTransactionService } from '../abstract/base-transaction.service';
import { isNil } from 'lodash';

@Injectable()
export class MqttTransactionService extends BaseTransactionService {
  private readonly dataSourceType = DataSourceTypesEnum.MQTT;

  constructor(
    private readonly logger: Logger,
    private readonly dataSourceService: DataSourceService,
    private readonly transactionRepository: TransactionRepository,
  ) {
    super();
  }

  public async createUpdateMqttTransaction(
    module: IndicatorModuleDataModel,
    schemas: CachedSchemasDataModel,
    operations: OperationBaseModel[],
    sensorKey?: string,
    publisherKey?: string,
    processedData?: ProcessedSensorDataModel,
    persistedIndicatorKey?: string,
  ): Promise<void> {
    const { databusKey } =
      await this.dataSourceService.retrieveDataSourceSnapshot(
        module.dataSourceId,
        {
          type: this.dataSourceType,
          isVirtual: false,
        },
      );

    if (sensorKey) {
      const sensorSchema = schemas[sensorKey];
      const { isExternal, variableName } = module;

      const sensor =
        await this.transactionRepository.getMqttConnectorByUniqueFields<ISensorDocument>(
          module.dataSourceId,
          module.mqttTopic,
        );

      if (sensor) {
        // TODO: updateSensorOperationWithVariable
      }

      let signalKey: string;

      if (isExternal && !persistedIndicatorKey) {
        signalKey = variableName;
      } else {
        signalKey = persistedIndicatorKey || v4();
      }

      return this.createSensorOperation(
        module,
        sensorSchema,
        operations,
        databusKey,
        signalKey,
      );
    }

    const publisher =
      await this.transactionRepository.getMqttConnectorByUniqueFields<IPublisherDocument>(
        module.dataSourceId,
        module.mqttTopic,
        false,
        processedData.databusKey,
      );

    if (publisher) {
      // TODO: updatePublisherOperationWithVariable
    }

    const publisherSchema = schemas[publisherKey];

    return this.createPublisherOperation(
      module,
      publisherSchema,
      processedData,
      operations,
    );
  }

  public createSensorOperation(
    module: IndicatorModuleDataModel,
    sensorSchema: DataSourceSchemaDataModel,
    operations: OperationBaseModel[],
    databusKey: string,
    indicatorKey: string,
    moduleId?: string,
  ): void {
    const config = new MqttTransactionConfigDataModel(
      module,
      undefined,
      indicatorKey,
      moduleId,
      true,
    );

    this.createOperation(
      OperationModesEnum.MODULE_CREATE_AND_START,
      ModuleTypesEnum.IOTCON_COLLECTOR,
      module.dataSourceId,
      config,
      sensorSchema,
      databusKey,
      operations,
      OperationTypesEnum.MQTT_SENSOR_CREATED,
      indicatorKey,
    );
  }

  public createPublisherOperation(
    module: IndicatorModuleDataModel,
    publisherSchema: DataSourceSchemaDataModel,
    processedData: ProcessedSensorDataModel,
    operations: OperationBaseModel[],
    moduleId?: string,
  ): void {
    const config = new MqttTransactionConfigDataModel(
      module,
      processedData,
      undefined,
      moduleId,
    );

    this.createOperation(
      OperationModesEnum.MODULE_CREATE_AND_START,
      ModuleTypesEnum.IOTCON_PUBLISHER,
      module.dataSourceId,
      config,
      publisherSchema,
      processedData.databusKey,
      operations,
      OperationTypesEnum.MQTT_PUBLISHER_CREATED,
      undefined,
      processedData.sensorId,
      undefined,
      !!module.isDefault,
    );
  }

  protected createOperation(
    operationMode: OperationModesEnum,
    moduleType: ModuleTypesEnum,
    dataSourceId: string,
    config: MqttTransactionConfigDataModel,
    connectorSchema: DataSourceSchemaDataModel,
    generatedDatabusKey: string,
    operations: OperationBaseModel[],
    operationType: OperationTypesEnum,
    generatedIndicatorKey?: string,
    connectedSensorId?: string,
    newVariable?: IBaseVariable,
    isDefault?: boolean,
  ): void {
    const operation = new MqttOperationRequestModel(
      operationMode,
      moduleType,
      config,
      connectorSchema,
      generatedDatabusKey,
    );

    operation.operationType = operationType;
    operation.connectedSensorId = connectedSensorId;
    operation.dataSourceType = this.dataSourceType;
    operation.dataSourceId = dataSourceId;

    if (!isNil(isDefault)) {
      operation.isDefault = isDefault;
    }

    if (generatedIndicatorKey) {
      operation.generatedIndicatorKey = generatedIndicatorKey;
    }

    if (newVariable) {
      operation.newVariable = newVariable;
    }

    this.logOperationData(this.logger, this.dataSourceType, operation);

    operations.push(operation);
  }

  private mapToDefaultMqttVariable({ indicatorKey, uoc }: IBaseVariable) {
    return {
      indicatorKey,
      variableName: indicatorKey,
      uoc,
      uom: 'UOM_unitless',
    } as IBaseVariable;
  }
}
