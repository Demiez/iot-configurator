import { FieldIsBadModel } from '~iotcon-errors';
import {
  DataSourceGenericDataModel,
  DataSourceTypesEnum,
  DefaultSettingsDataModel,
  IMqttSettings,
  IndicatorModuleDataModel,
} from '~iotcon-models';
import {
  PUBLISHERS_DUPLICATE_DATASOURCE_MESSAGE,
  PUBLISHERS_DUPLICATE_IDS_MESSAGE,
  PUBLISHER_DATA_SOURCE_TYPE_IS_DEFAULT,
  PUBLISHER_DATA_SOURCE_TYPE_NOT_ACCEPTED,
} from '../constants';
import { BaseValidator } from './abstract/base.validator';
import {
  InsiteValidator,
  ModbusValidator,
  MqttValidator,
  OpcuaValidator,
  RmqValidator,
  Wits0Validator,
} from './source-specific';

export class DataSourcesToPublishersValidator extends BaseValidator {
  private static insitePublishers: IndicatorModuleDataModel[];
  private static mqttPublishers: IndicatorModuleDataModel[];
  private static opcuaPublishers: IndicatorModuleDataModel[];
  private static rmqPublishers: IndicatorModuleDataModel[];
  private static modbusPublishers: IndicatorModuleDataModel[];
  private static wits0Publishers: IndicatorModuleDataModel[];

  public static validate(
    dataSources: DataSourceGenericDataModel[],
    publishers: IndicatorModuleDataModel[],
    defaultSettings: DefaultSettingsDataModel,
    disableModbusDataValidation?: boolean,
  ): FieldIsBadModel[] {
    this.errors = [];
    this.insitePublishers = [];
    this.opcuaPublishers = [];
    this.rmqPublishers = [];
    this.mqttPublishers = [];
    this.modbusPublishers = [];
    this.wits0Publishers = [];

    const { defaultPublisherType } = defaultSettings;
    const publisherTypeError = new FieldIsBadModel(
      'dataSourceType',
      PUBLISHER_DATA_SOURCE_TYPE_IS_DEFAULT + defaultPublisherType,
    );

    publishers.forEach((publisher) => {
      const dataSource = dataSources.find(
        (dataSourceData) =>
          publisher.dataSourceId === dataSourceData.dataSourceId,
      );

      switch (dataSource.dataSourceType) {
        case DataSourceTypesEnum.INSITE: {
          this.insitePublishers.push(publisher);

          InsiteValidator.validateInsiteFields(publisher, this.errors);

          break;
        }
        case DataSourceTypesEnum.MQTT: {
          if (defaultPublisherType === DataSourceTypesEnum.MQTT) {
            this.errors.push(publisherTypeError);
          } else {
            this.mqttPublishers.push(publisher);

            MqttValidator.validateMqttFields(publisher, this.errors);
            MqttValidator.validateMqttSettings(
              {
                mqttTopic: publisher.mqttTopic,
              } as IMqttSettings,
              this.errors,
            );
          }

          break;
        }
        case DataSourceTypesEnum.OPCUA: {
          this.opcuaPublishers.push(publisher);

          OpcuaValidator.validateOpcuaFields(publisher, this.errors);

          break;
        }
        case DataSourceTypesEnum.RMQ: {
          if (defaultPublisherType === DataSourceTypesEnum.RMQ) {
            this.errors.push(publisherTypeError);
          } else {
            this.rmqPublishers.push(publisher);

            RmqValidator.validateRmqFields(publisher, this.errors);
          }

          break;
        }
        case DataSourceTypesEnum.MODBUS: {
          this.modbusPublishers.push(publisher);

          ModbusValidator.validateModbusFields(
            publisher,
            this.errors,
            false,
            disableModbusDataValidation,
          );

          break;
        }
        case DataSourceTypesEnum.WITS0: {
          this.wits0Publishers.push(publisher);

          Wits0Validator.validateWits0Fields(publisher, this.errors);

          break;
        }
        default: {
          this.errors.push(
            new FieldIsBadModel(
              'dataSourceType',
              PUBLISHER_DATA_SOURCE_TYPE_NOT_ACCEPTED,
            ),
          );
        }
      }
    });

    if (this.insitePublishers.length > 1) {
      this.validateUniquePublishersPerRequest(
        this.insitePublishers,
        DataSourceTypesEnum.INSITE,
      );

      this.validateUniqueDataSourceIdsPerRequest(
        this.insitePublishers,
        DataSourceTypesEnum.MQTT,
      );
    }

    if (this.mqttPublishers.length > 1) {
      this.validateUniquePublishersPerRequest(
        this.mqttPublishers,
        DataSourceTypesEnum.MQTT,
      );

      this.validateUniqueDataSourceIdsPerRequest(
        this.mqttPublishers,
        DataSourceTypesEnum.MQTT,
      );
    }

    if (this.opcuaPublishers.length > 1) {
      this.validateUniquePublishersPerRequest(
        this.opcuaPublishers,
        DataSourceTypesEnum.OPCUA,
      );

      this.validateUniqueDataSourceIdsPerRequest(
        this.opcuaPublishers,
        DataSourceTypesEnum.OPCUA,
      );
    }

    if (this.rmqPublishers.length > 1) {
      this.validateUniquePublishersPerRequest(
        this.rmqPublishers,
        DataSourceTypesEnum.RMQ,
      );

      this.validateUniqueDataSourceIdsPerRequest(
        this.rmqPublishers,
        DataSourceTypesEnum.RMQ,
      );
    }

    if (this.modbusPublishers.length > 1) {
      this.validateUniquePublishersPerRequest(
        this.modbusPublishers,
        DataSourceTypesEnum.MODBUS,
      );

      this.validateUniqueDataSourceIdsPerRequest(
        this.modbusPublishers,
        DataSourceTypesEnum.MODBUS,
      );
    }

    if (this.wits0Publishers.length > 1) {
      this.validateUniquePublishersPerRequest(
        this.wits0Publishers,
        DataSourceTypesEnum.WITS0,
      );

      this.validateUniqueDataSourceIdsPerRequest(
        this.wits0Publishers,
        DataSourceTypesEnum.WITS0,
      );
    }

    return this.errors;
  }

  private static validateUniquePublishersPerRequest(
    publishers: IndicatorModuleDataModel[],
    dataSourceType: DataSourceTypesEnum,
  ) {
    const publishersIds = publishers
      .map((publisher) => publisher.id)
      .filter(Boolean);

    if (new Set(publishersIds).size !== publishersIds.length) {
      this.errors.push(
        new FieldIsBadModel(
          'publishers',
          dataSourceType.toUpperCase() + ' ' + PUBLISHERS_DUPLICATE_IDS_MESSAGE,
        ),
      );
    }
  }

  private static validateUniqueDataSourceIdsPerRequest(
    publishers: IndicatorModuleDataModel[],
    dataSourceType: DataSourceTypesEnum,
  ) {
    const publishersDataSourceIds = publishers.map(
      (publisher) => publisher.dataSourceId,
    );

    if (
      new Set(publishersDataSourceIds).size !== publishersDataSourceIds.length
    ) {
      this.errors.push(
        new FieldIsBadModel(
          'publishers',
          dataSourceType.toUpperCase() +
            ' ' +
            PUBLISHERS_DUPLICATE_DATASOURCE_MESSAGE,
        ),
      );
    }
  }
}
