import { DataSourceTypesEnum, SubscriptionModesEnum } from '../../enums';
import { IBaseVariable, IRmqSettings, ISensor } from '../../interfaces';
import { IndicatorModuleDataModel } from '../indicator';
import { OperationBaseModel } from './abstract/operation.bm';
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

export class ProcessedSensorDataModel implements ISensor {
  public dataSourceId: string;
  public type: DataSourceTypesEnum;
  public sensorId: string;
  public variable: IBaseVariable;
  public databusKey: string;
  public isPrimary: boolean;

  // INSITE
  public record?: string;
  public descriptor?: string;
  public isWellBased?: boolean;

  // MQTT
  public mqttTopic?: string;

  // OPCUA
  public subscriptionMode?: SubscriptionModesEnum;

  // RMQ
  public rmqSettings?: IRmqSettings;
  public routingKey?: string;

  // MODBUS
  public modbusSampleRate?: number;
  public modbusReadBlocksData?: boolean;

  // WITS0
  public wits0SampleRate?: number;
  public wits0Direction?: boolean;

  public generatedIndicatorKey?: string;
  public newInstance?: ISensor;

  constructor(module: IndicatorModuleDataModel, operation: OperationBaseModel) {
    this.dataSourceId = module.dataSourceId;
    this.isPrimary = !!module.isPrimary;
    this.type = operation.dataSourceType;
    this.generatedIndicatorKey = operation.generatedIndicatorKey;

    switch (this.type) {
      case DataSourceTypesEnum.INSITE: {
        const {
          moduleId,
          variables,
          record,
          descriptor,
          isWellBased,
          databusKey,
        } = operation.config as InsiteTransactionConfigDataModel;

        this.sensorId = moduleId;
        this.variable = variables[variables.length - 1];
        this.record = record;
        this.descriptor = descriptor;
        this.isWellBased = isWellBased;
        this.databusKey = databusKey;

        break;
      }
      case DataSourceTypesEnum.MQTT: {
        const { moduleId, databusKey, outputs, inputs } =
          operation.config as MqttTransactionConfigDataModel;

        const { variables, mqttTopic } = outputs ? outputs[0] : inputs[0];

        this.sensorId = moduleId;
        this.variable = variables[variables.length - 1];
        this.databusKey = databusKey;
        this.mqttTopic = mqttTopic;

        break;
      }
      case DataSourceTypesEnum.OPCUA: {
        const { moduleId, databusKey, subscriptions, subscriptionMode } =
          operation.config as OpcuaTransactionConfigDataModel;

        const { variables } = subscriptions
          ? subscriptions[0]
          : operation.config;

        this.sensorId = moduleId;
        this.variable = variables[variables.length - 1];
        this.databusKey = databusKey;
        this.subscriptionMode = subscriptionMode;

        break;
      }
      case DataSourceTypesEnum.RMQ: {
        const { moduleId, databusKey, rmqSettings, inputs } =
          operation.config as RmqTransactionConfigDataModel;

        const { variables, routingKey } = inputs[0];

        this.sensorId = moduleId;
        this.variable = variables[variables.length - 1];
        this.databusKey = databusKey;
        this.rmqSettings = new RmqSettingsDataModel(rmqSettings);
        this.routingKey = routingKey;

        break;
      }
      case DataSourceTypesEnum.MODBUS: {
        const {
          moduleId,
          databusKey,
          modbusSampleRate,
          readBlocksData,
          variables,
        } = operation.config as ModbusTransactionConfigDataModel;

        this.sensorId = moduleId;
        this.modbusSampleRate = modbusSampleRate;
        this.modbusReadBlocksData = readBlocksData;
        this.variable = VariableDataModel._initializeFromModbusVariable(
          variables[variables.length - 1]
        );
        this.databusKey = databusKey;

        break;
      }
      case DataSourceTypesEnum.WITS0: {
        const { moduleId, databusKey, subscription } =
          operation.config as Wits0TransactionConfigDataModel;

        const { sampleRate, direction, variables } = subscription;

        this.sensorId = moduleId;
        this.wits0SampleRate = sampleRate;
        this.wits0Direction = direction;

        this.variable = VariableDataModel._initializeFromWits0Variable(
          variables[variables.length - 1]
        );
        this.databusKey = databusKey;

        break;
      }
    }
  }

  public static mapToBriefProcessedSensorDataModel(
    type: DataSourceTypesEnum,
    variable: IBaseVariable,
    sensor: ISensor,
    isPrimary: boolean,
    newInstance?: ISensor
  ): ProcessedSensorDataModel {
    const baseInstance = { sensorId: sensor._id };

    switch (type) {
      case DataSourceTypesEnum.INSITE: {
        const { dataSourceId, record, descriptor, isWellBased } = sensor;

        return Object.assign(baseInstance, {
          type,
          dataSourceId,
          variable,
          record,
          descriptor,
          isWellBased,
          isPrimary,
          newInstance,
        }) as ProcessedSensorDataModel;
      }
      case DataSourceTypesEnum.MQTT: {
        const { dataSourceId, mqttTopic } = sensor;

        return Object.assign(baseInstance, {
          type,
          dataSourceId,
          variable,
          mqttTopic,
          isPrimary,
          newInstance,
        }) as ProcessedSensorDataModel;
      }
      case DataSourceTypesEnum.OPCUA: {
        const { dataSourceId, subscriptionMode } = sensor;

        return Object.assign(baseInstance, {
          type,
          dataSourceId,
          variable,
          subscriptionMode,
          isPrimary,
          newInstance,
        }) as ProcessedSensorDataModel;
      }
      case DataSourceTypesEnum.RMQ: {
        const { dataSourceId, rmqSettings, routingKey } = sensor;

        return Object.assign(baseInstance, {
          type,
          dataSourceId,
          variable,
          rmqSettings,
          routingKey,
          isPrimary,
          newInstance,
        }) as ProcessedSensorDataModel;
      }

      case DataSourceTypesEnum.MODBUS: {
        const { dataSourceId, modbusSampleRate, modbusReadBlocksData } = sensor;

        return Object.assign(baseInstance, {
          type,
          dataSourceId,
          modbusSampleRate,
          modbusReadBlocksData,
          variable,
          isPrimary,
          newInstance,
        }) as ProcessedSensorDataModel;
      }

      case DataSourceTypesEnum.WITS0: {
        const { dataSourceId, wits0SampleRate, wits0Direction } = sensor;

        return Object.assign(baseInstance, {
          type,
          dataSourceId,
          wits0SampleRate,
          wits0Direction,
          variable,
          isPrimary,
          newInstance,
        }) as ProcessedSensorDataModel;
      }
    }
  }
}
