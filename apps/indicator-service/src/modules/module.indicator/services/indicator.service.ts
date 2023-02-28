import { Injectable, Logger } from '@nestjs/common';
import { has, isEmpty, isNil } from 'lodash';
import { ErrorCodes } from '~iotcon-errors';
import {
  DataSourceGenericDataModel,
  DataSourceTypesEnum,
  DefaultSettingsDataModel,
  IndicatorDataModel,
  IndicatorModuleDataModel,
} from '~iotcon-models';
import { ForbiddenRpcError } from '../../../core/errors/rpc-errors';
import { IndicatorDataSourceService } from '../../module.integration/services/indicator-data-source.service';
import { ValidationService } from '../../module.validation/validation.service';
import {
  DUPLICATE_INDICATOR_ID_MESSAGE,
  DUPLICATE_INDICATOR_NAME_MESSAGE,
  EXTERNAL_INDICATOR_MODULE_PRIMARY,
} from '../constants/indicator.constants';
import { IndicatorRepository } from '../repository/indicator.repository';
import { JoinConnectionDefaultSettingsType } from '../types/join.types';
import { IndicatorSettingsService } from './indicator-settings.service';

@Injectable()
export class IndicatorService {
  constructor(
    private readonly logger: Logger,
    private readonly validationService: ValidationService,
    private readonly indicatorRepository: IndicatorRepository,
    private readonly indicatorSettingsService: IndicatorSettingsService,
    private readonly indicatorDataSourceService: IndicatorDataSourceService,
  ) {}

  public async createIndicator(
    indicatorData: IndicatorDataModel,
  ): Promise<void> {
    const errors =
      this.validationService.validateIndicatorModule(indicatorData);

    if (!isEmpty(errors)) {
      throw new ForbiddenRpcError(ErrorCodes.INVALID_INPUT_PARAMS, errors);
    }

    const { sensor, publishers, name, description, group, tags } =
      indicatorData;

    const doesIndicatorExistByName =
      await this.indicatorRepository.checkIfIndicatorExistsByName(name);

    if (doesIndicatorExistByName) {
      throw new ForbiddenRpcError(
        ErrorCodes.INVALID_INPUT_PARAMS_IS_DUPLICATE_VALUE,
        [DUPLICATE_INDICATOR_NAME_MESSAGE],
      );
    }

    const dataSourceIds = this.extractDataSourceIds(sensor, publishers);

    const defaultSettings =
      this.indicatorSettingsService.retrieveDefaultSettings();

    const [dataSourceDataList, defaultDataSources] = await Promise.all([
      !isEmpty(dataSourceIds)
        ? this.indicatorDataSourceService.getDataSourcesByIds(dataSourceIds)
        : ([] as DataSourceGenericDataModel[]),
      this.indicatorDataSourceService.getDataSourcesByTypes(
        [DataSourceTypesEnum.MQTT, DataSourceTypesEnum.RMQ],
        true,
      ),
    ]);

    const defaultMqttDataSource = defaultDataSources.find(
      (dataSource) => dataSource.dataSourceType === DataSourceTypesEnum.MQTT,
    );
    const defaultRmqDataSource = defaultDataSources.find(
      (dataSource) => dataSource.dataSourceType === DataSourceTypesEnum.RMQ,
    );

    // TODO: add primary dataSource processing

    const dataSourceOfSensor = dataSourceDataList.find(
      (dataSourceData) => dataSourceData.dataSourceId === sensor.dataSourceId,
    );

    const isExternal = this.checkIsExternalIndicator(
      dataSourceOfSensor,
      defaultMqttDataSource,
      defaultRmqDataSource,
    );

    await this.validateConnectorsByTypes(
      dataSourceDataList,
      sensor,
      publishers,
      defaultSettings,
      isExternal,
    );

    this.updateSensorToTransactionReadyRequest(
      sensor,
      defaultMqttDataSource,
      dataSourceOfSensor,
      isExternal,
    );

    if (isExternal && isEmpty(publishers)) {
      return this.saveUnpublishedExternalIndicator(
        name,
        description,
        group,
        tags,
        sensor,
      );
    }

    if (isExternal && !isEmpty(publishers)) {
      this.updatePublishersToTransactionReadyRequests(
        publishers,
        dataSourceDataList,
        defaultMqttDataSource,
        true,
      );
    }

    if (!isExternal) {
      switch (defaultSettings.defaultPublisherType) {
        case DataSourceTypesEnum.MQTT: {
          this.addDefaultPublisher(
            sensor,
            publishers,
            defaultMqttDataSource,
            DataSourceTypesEnum.MQTT,
            isEmpty(publishers),
            defaultSettings.mqttSettings as JoinConnectionDefaultSettingsType,
          );

          break;
        }
        case DataSourceTypesEnum.RMQ: {
          this.addDefaultPublisher(
            sensor,
            publishers,
            defaultRmqDataSource,
            DataSourceTypesEnum.RMQ,
            isEmpty(publishers),
            defaultSettings.rmqSettings as JoinConnectionDefaultSettingsType,
          );

          break;
        }
      }

      if (!isEmpty(publishers)) {
        this.updatePublishersToTransactionReadyRequests(
          publishers,
          dataSourceDataList,
          defaultMqttDataSource,
        );
      }
    }

    const _transactionResult = {};
  }

  public checkIsExternalIndicator(
    dataSource: DataSourceGenericDataModel,
    defaultMqttDataSource: DataSourceGenericDataModel,
    defaultRmqDataSource: DataSourceGenericDataModel,
  ): boolean {
    switch (dataSource.dataSourceType) {
      case DataSourceTypesEnum.MQTT: {
        return dataSource.dataSourceId === defaultMqttDataSource.dataSourceId;
      }
      case DataSourceTypesEnum.RMQ: {
        return dataSource.dataSourceId === defaultRmqDataSource.dataSourceId;
      }
      default: {
        return false;
      }
    }
  }

  private extractDataSourceIds(
    sensor: IndicatorModuleDataModel,
    publishers: IndicatorModuleDataModel[],
  ): string[] {
    const publishersDataSourceIds = publishers
      .map((publisher) => {
        if (has(publisher, 'dataSourceId')) {
          return publisher.dataSourceId;
        }
      })
      .filter(Boolean);

    const dataSourceIds = [...publishersDataSourceIds];

    if (sensor && !sensor.isPrimary && has(sensor, 'dataSourceId')) {
      dataSourceIds.push(sensor.dataSourceId);
    }

    return dataSourceIds;
  }

  private async validateConnectorsByTypes(
    dataSourceDataList: DataSourceGenericDataModel[],
    sensor: IndicatorModuleDataModel,
    publishers: IndicatorModuleDataModel[],
    defaultSettings: DefaultSettingsDataModel,
    isExternal: boolean,
    isUpdate?: boolean,
  ) {
    const sensorErrors = this.validationService.validateDataSourceToSensor(
      dataSourceDataList,
      sensor,
      isExternal,
    );

    if (!isEmpty(sensorErrors)) {
      throw new ForbiddenRpcError(
        ErrorCodes.INVALID_INPUT_PARAMS,
        sensorErrors,
      );
    }

    if (isExternal && !isNil(sensor.isPrimary) && sensor.isPrimary === true) {
      throw new ForbiddenRpcError(ErrorCodes.INVALID_INPUT_PARAMS, [
        EXTERNAL_INDICATOR_MODULE_PRIMARY,
      ]);
    }

    if (isExternal && !isUpdate) {
      // indicator key will be taken from variableName for external indicator
      const doesIndicatorExistById =
        await this.indicatorRepository.checkIfIndicatorExistsById(
          sensor.variableName,
        );

      if (doesIndicatorExistById) {
        throw new ForbiddenRpcError(
          ErrorCodes.INVALID_INPUT_PARAMS_IS_DUPLICATE_VALUE,
          [DUPLICATE_INDICATOR_ID_MESSAGE],
        );
      }

      const { dataSourceType } = dataSourceDataList.find(
        (dataSource) => sensor.dataSourceId === dataSource.dataSourceId,
      );

      if (dataSourceType === DataSourceTypesEnum.RMQ) {
        // TODO: add additional check for default rmq settings (checkOugoingRmqSettings)
      }
    }

    if (!isEmpty(publishers)) {
      const publishersErrors =
        this.validationService.validateDataSourcesToPublishers(
          dataSourceDataList,
          publishers,
          defaultSettings,
        );

      if (!isEmpty(publishersErrors)) {
        throw new ForbiddenRpcError(
          ErrorCodes.INVALID_INPUT_PARAMS,
          publishersErrors,
        );
      }
    }
  }

  private updateSensorToTransactionReadyRequest(
    sensor: IndicatorModuleDataModel,
    defaultMqttDataSource: DataSourceGenericDataModel,
    dataSource: DataSourceGenericDataModel,
    isExternal: boolean,
  ) {
    sensor.sourceName = dataSource.sourceName;
    sensor.dataSourceId = dataSource.dataSourceId;
    sensor.dataSourceType = dataSource.dataSourceType;
    sensor.mqttServerAddress = defaultMqttDataSource.mqttServerAddress;
    sensor.isExternal = isExternal;

    if (
      dataSource.dataSourceType !== DataSourceTypesEnum.MODBUS &&
      dataSource.dataSourceType !== DataSourceTypesEnum.WITS0
    ) {
      sensor.variableName = sensor.variableName.trim();
    }
  }

  private updatePublishersToTransactionReadyRequests(
    publishers: IndicatorModuleDataModel[],
    dataSourceDataList: DataSourceGenericDataModel[],
    defaultMqttDataSource: DataSourceGenericDataModel,
    skipIndexCheck?: boolean,
  ) {
    // Index skip check is required for previously added default publisher
    const conditionalValue = skipIndexCheck ? -1 : 0;

    publishers.forEach((publisher, index) => {
      if (index > conditionalValue) {
        const dataSource = dataSourceDataList.find(
          (dataSourceData) =>
            dataSourceData.dataSourceId === publisher.dataSourceId,
        );

        publisher.sourceName = dataSource.sourceName;
        publisher.dataSourceId = dataSource.dataSourceId;
        publisher.dataSourceType = dataSource.dataSourceType;
        publisher.mqttServerAddress = defaultMqttDataSource.mqttServerAddress;

        if (
          dataSource.dataSourceType !== DataSourceTypesEnum.MODBUS &&
          dataSource.dataSourceType !== DataSourceTypesEnum.WITS0
        ) {
          publisher.variableName = publisher.variableName.trim();
        }
      }
    });
  }

  private async saveUnpublishedExternalIndicator(
    _name: string,
    _description: string,
    _group: string,
    _tags: string[],
    _sensor: IndicatorModuleDataModel,
  ): Promise<void> {
    this.logger.error('Method not implemented');
  }

  private addDefaultPublisher(
    sensor: IndicatorModuleDataModel,
    publishers: IndicatorModuleDataModel[],
    defaultDataSource: DataSourceGenericDataModel,
    defaultDataSourceType: DataSourceTypesEnum,
    isOnlyDefaultTarget: boolean,
    defaultSettings: JoinConnectionDefaultSettingsType,
  ) {
    const publisherData = IndicatorModuleDataModel._initializeDefault(
      sensor,
      defaultDataSource,
      defaultDataSourceType,
      defaultSettings,
    );

    if (isOnlyDefaultTarget) {
      publishers.push(publisherData);
      return;
    }

    publishers.splice(0, 0, publisherData);
  }
}
