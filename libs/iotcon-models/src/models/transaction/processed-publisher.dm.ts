import { DataSourceTypesEnum } from '../../enums';
import { IBaseVariable, IPublisher, IRmqSettings } from '../../interfaces';
import { OperationBaseModel } from './abstract';
import {
  InsiteTransactionConfigDataModel,
  ModbusTransactionConfigDataModel,
  MqttTransactionConfigDataModel,
  OpcuaTransactionConfigDataModel,
  RmqSettingsDataModel,
  RmqTransactionConfigDataModel,
  Wits0TransactionConfigDataModel,
} from './data-source-specific';
import { VariableDataModel } from './variable.dm';

export class ProcessedPublisherDataModel implements IPublisher {
  public dataSourceId: string;
  public type: DataSourceTypesEnum;
  public publisherId: string;
  public variable: IBaseVariable;
  public databusKey: string;
  public isDefault: boolean;
  public isPrimary: boolean;

  // INSITE
  public record?: string;
  public descriptor?: string;
  public isWellBased?: boolean;

  // MQTT
  public mqttTopic?: string;

  // RMQ
  public rmqSettings?: IRmqSettings;
  public routingKey?: string;

  // WITS0
  public wits0SampleRate?: number;
  public wits0Direction?: boolean;

  constructor(operation: OperationBaseModel) {
    this.type = operation.dataSourceType;
    this.isPrimary = (operation.config as { isPrimary: boolean }).isPrimary;
    this.dataSourceId = operation.dataSourceId;

    switch (this.type) {
      case DataSourceTypesEnum.INSITE: {
        const {
          databusKey,
          moduleId,
          variables,
          record,
          descriptor,
          isWellBased,
        } = operation.config as InsiteTransactionConfigDataModel;

        this.databusKey = databusKey;
        this.publisherId = moduleId;
        this.variable = variables[variables.length - 1];
        this.isDefault = false;

        // Insite specific
        this.record = record;
        this.descriptor = descriptor;
        this.isWellBased = isWellBased;

        break;
      }
      case DataSourceTypesEnum.MQTT: {
        const { databusKey, moduleId, outputs } =
          operation.config as MqttTransactionConfigDataModel;
        const { mqttTopic, variables } = outputs[0];

        this.databusKey = databusKey;
        this.publisherId = moduleId;
        this.variable = variables[variables.length - 1];
        this.isDefault = operation.isDefault;

        // Mqtt specific
        this.mqttTopic = mqttTopic;

        break;
      }
      case DataSourceTypesEnum.OPCUA: {
        const { databusKey, moduleId, variables } =
          operation.config as OpcuaTransactionConfigDataModel;

        this.publisherId = moduleId;
        this.variable = variables[variables.length - 1];
        this.databusKey = databusKey;
        this.isDefault = false;

        break;
      }
      case DataSourceTypesEnum.RMQ: {
        const { moduleId, databusKey, rmqSettings, outputs } =
          operation.config as RmqTransactionConfigDataModel;

        const { variables, routingKey } = outputs[0];

        this.publisherId = moduleId;
        this.variable = variables[variables.length - 1];
        this.databusKey = databusKey;
        this.isDefault = operation.isDefault;

        // rmq specific
        this.rmqSettings = new RmqSettingsDataModel(rmqSettings);
        this.routingKey = routingKey;

        break;
      }
      case DataSourceTypesEnum.MODBUS: {
        const { moduleId, databusKey, variables } =
          operation.config as ModbusTransactionConfigDataModel;

        this.publisherId = moduleId;
        this.variable = VariableDataModel._initializeFromModbusVariable(
          variables[variables.length - 1]
        );
        this.databusKey = databusKey;
        this.isDefault = false;

        break;
      }
      case DataSourceTypesEnum.WITS0: {
        const { moduleId, databusKey, subscription } =
          operation.config as Wits0TransactionConfigDataModel;

        const { sampleRate, direction, variables } = subscription;

        this.publisherId = moduleId;
        this.wits0SampleRate = sampleRate;
        this.wits0Direction = direction;
        this.variable = VariableDataModel._initializeFromWits0Variable(
          variables[variables.length - 1]
        );
        this.databusKey = databusKey;
        this.isDefault = false;

        break;
      }
    }
  }

  public static mapToBriefProcessedPublisherDataModel(
    type: DataSourceTypesEnum,
    variable: IBaseVariable,
    publisher: IPublisher,
    isPrimary: boolean
  ): ProcessedPublisherDataModel {
    switch (type) {
      case DataSourceTypesEnum.MQTT: {
        const { _id, dataSourceId, mqttTopic, isDefault } = publisher;

        return {
          type,
          dataSourceId,
          publisherId: _id,
          variable,
          mqttTopic,
          isDefault,
          isPrimary,
        } as ProcessedPublisherDataModel;
      }
      case DataSourceTypesEnum.INSITE: {
        const { _id, dataSourceId, record, descriptor, isWellBased } =
          publisher;

        return {
          type,
          dataSourceId,
          publisherId: _id,
          variable,
          record,
          descriptor,
          isWellBased,
          isDefault: false,
          isPrimary,
        } as ProcessedPublisherDataModel;
      }
      case DataSourceTypesEnum.OPCUA: {
        const { _id, dataSourceId } = publisher;

        return {
          type,
          dataSourceId,
          publisherId: _id,
          variable,
          isDefault: false,
          isPrimary,
        } as ProcessedPublisherDataModel;
      }
      case DataSourceTypesEnum.RMQ: {
        const { _id, dataSourceId, rmqSettings, routingKey, isDefault } =
          publisher;

        return {
          type,
          dataSourceId,
          publisherId: _id,
          variable,
          rmqSettings,
          routingKey,
          isDefault,
          isPrimary,
        } as ProcessedPublisherDataModel;
      }
      case DataSourceTypesEnum.MODBUS: {
        const { _id, dataSourceId } = publisher;

        return {
          type,
          dataSourceId,
          publisherId: _id,
          variable,
          isDefault: false,
          isPrimary,
        } as ProcessedPublisherDataModel;
      }
      case DataSourceTypesEnum.WITS0: {
        const { _id, dataSourceId, wits0SampleRate, wits0Direction } =
          publisher;

        return {
          type,
          dataSourceId,
          publisherId: _id,
          wits0SampleRate,
          wits0Direction,
          variable,
          isDefault: false,
          isPrimary,
        } as ProcessedPublisherDataModel;
      }
    }
  }
}
