/* eslint-disable */
import {
  CallOptions,
  ChannelCredentials,
  ChannelOptions,
  Client,
  ClientUnaryCall,
  handleUnaryCall,
  makeGenericClientConstructor,
  Metadata,
  ServiceError,
  UntypedServiceImplementation,
} from "@grpc/grpc-js";
import _m0 from "protobufjs/minimal";
import { DataSourceTypesEnum, dataSourceTypesEnumFromJSON, dataSourceTypesEnumToJSON } from "./datasource";
import { Empty } from "./google/protobuf/empty";

export enum RmqExchangeTypesEnum {
  UNKNOWN_EXCHANGE_TYPE = 0,
  DIRECT = 1,
  FANOUT = 2,
  HEADERS = 3,
  TOPIC = 4,
  UNRECOGNIZED = -1,
}

export function rmqExchangeTypesEnumFromJSON(object: any): RmqExchangeTypesEnum {
  switch (object) {
    case 0:
    case "UNKNOWN_EXCHANGE_TYPE":
      return RmqExchangeTypesEnum.UNKNOWN_EXCHANGE_TYPE;
    case 1:
    case "DIRECT":
      return RmqExchangeTypesEnum.DIRECT;
    case 2:
    case "FANOUT":
      return RmqExchangeTypesEnum.FANOUT;
    case 3:
    case "HEADERS":
      return RmqExchangeTypesEnum.HEADERS;
    case 4:
    case "TOPIC":
      return RmqExchangeTypesEnum.TOPIC;
    case -1:
    case "UNRECOGNIZED":
    default:
      return RmqExchangeTypesEnum.UNRECOGNIZED;
  }
}

export function rmqExchangeTypesEnumToJSON(object: RmqExchangeTypesEnum): string {
  switch (object) {
    case RmqExchangeTypesEnum.UNKNOWN_EXCHANGE_TYPE:
      return "UNKNOWN_EXCHANGE_TYPE";
    case RmqExchangeTypesEnum.DIRECT:
      return "DIRECT";
    case RmqExchangeTypesEnum.FANOUT:
      return "FANOUT";
    case RmqExchangeTypesEnum.HEADERS:
      return "HEADERS";
    case RmqExchangeTypesEnum.TOPIC:
      return "TOPIC";
    case RmqExchangeTypesEnum.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export enum RegisterTypesEnum {
  UNKNOWN_REGISTER_TYPE = 0,
  COILS = 1,
  INPUTS = 2,
  REGISTERS = 3,
  QUEUE = 4,
  UNRECOGNIZED = -1,
}

export function registerTypesEnumFromJSON(object: any): RegisterTypesEnum {
  switch (object) {
    case 0:
    case "UNKNOWN_REGISTER_TYPE":
      return RegisterTypesEnum.UNKNOWN_REGISTER_TYPE;
    case 1:
    case "COILS":
      return RegisterTypesEnum.COILS;
    case 2:
    case "INPUTS":
      return RegisterTypesEnum.INPUTS;
    case 3:
    case "REGISTERS":
      return RegisterTypesEnum.REGISTERS;
    case 4:
    case "QUEUE":
      return RegisterTypesEnum.QUEUE;
    case -1:
    case "UNRECOGNIZED":
    default:
      return RegisterTypesEnum.UNRECOGNIZED;
  }
}

export function registerTypesEnumToJSON(object: RegisterTypesEnum): string {
  switch (object) {
    case RegisterTypesEnum.UNKNOWN_REGISTER_TYPE:
      return "UNKNOWN_REGISTER_TYPE";
    case RegisterTypesEnum.COILS:
      return "COILS";
    case RegisterTypesEnum.INPUTS:
      return "INPUTS";
    case RegisterTypesEnum.REGISTERS:
      return "REGISTERS";
    case RegisterTypesEnum.QUEUE:
      return "QUEUE";
    case RegisterTypesEnum.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export enum TypeValuesEnum {
  UNKNOWN_TYPE_VALUE = 0,
  INT16 = 1,
  INT32 = 2,
  LONG = 3,
  DOUBLE = 4,
  BOOL = 5,
  UNRECOGNIZED = -1,
}

export function typeValuesEnumFromJSON(object: any): TypeValuesEnum {
  switch (object) {
    case 0:
    case "UNKNOWN_TYPE_VALUE":
      return TypeValuesEnum.UNKNOWN_TYPE_VALUE;
    case 1:
    case "INT16":
      return TypeValuesEnum.INT16;
    case 2:
    case "INT32":
      return TypeValuesEnum.INT32;
    case 3:
    case "LONG":
      return TypeValuesEnum.LONG;
    case 4:
    case "DOUBLE":
      return TypeValuesEnum.DOUBLE;
    case 5:
    case "BOOL":
      return TypeValuesEnum.BOOL;
    case -1:
    case "UNRECOGNIZED":
    default:
      return TypeValuesEnum.UNRECOGNIZED;
  }
}

export function typeValuesEnumToJSON(object: TypeValuesEnum): string {
  switch (object) {
    case TypeValuesEnum.UNKNOWN_TYPE_VALUE:
      return "UNKNOWN_TYPE_VALUE";
    case TypeValuesEnum.INT16:
      return "INT16";
    case TypeValuesEnum.INT32:
      return "INT32";
    case TypeValuesEnum.LONG:
      return "LONG";
    case TypeValuesEnum.DOUBLE:
      return "DOUBLE";
    case TypeValuesEnum.BOOL:
      return "BOOL";
    case TypeValuesEnum.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export enum EndiansEnum {
  UNKNOWN_ENDIAN = 0,
  BIG = 1,
  LITTLE = 2,
  UNRECOGNIZED = -1,
}

export function endiansEnumFromJSON(object: any): EndiansEnum {
  switch (object) {
    case 0:
    case "UNKNOWN_ENDIAN":
      return EndiansEnum.UNKNOWN_ENDIAN;
    case 1:
    case "BIG":
      return EndiansEnum.BIG;
    case 2:
    case "LITTLE":
      return EndiansEnum.LITTLE;
    case -1:
    case "UNRECOGNIZED":
    default:
      return EndiansEnum.UNRECOGNIZED;
  }
}

export function endiansEnumToJSON(object: EndiansEnum): string {
  switch (object) {
    case EndiansEnum.UNKNOWN_ENDIAN:
      return "UNKNOWN_ENDIAN";
    case EndiansEnum.BIG:
      return "BIG";
    case EndiansEnum.LITTLE:
      return "LITTLE";
    case EndiansEnum.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export enum SubscriptionModesEnum {
  UNKNOWN_SUBSCRIPTION_MODE = 0,
  POLLING = 1,
  SUBSCRIPTION = 2,
  UNRECOGNIZED = -1,
}

export function subscriptionModesEnumFromJSON(object: any): SubscriptionModesEnum {
  switch (object) {
    case 0:
    case "UNKNOWN_SUBSCRIPTION_MODE":
      return SubscriptionModesEnum.UNKNOWN_SUBSCRIPTION_MODE;
    case 1:
    case "POLLING":
      return SubscriptionModesEnum.POLLING;
    case 2:
    case "SUBSCRIPTION":
      return SubscriptionModesEnum.SUBSCRIPTION;
    case -1:
    case "UNRECOGNIZED":
    default:
      return SubscriptionModesEnum.UNRECOGNIZED;
  }
}

export function subscriptionModesEnumToJSON(object: SubscriptionModesEnum): string {
  switch (object) {
    case SubscriptionModesEnum.UNKNOWN_SUBSCRIPTION_MODE:
      return "UNKNOWN_SUBSCRIPTION_MODE";
    case SubscriptionModesEnum.POLLING:
      return "POLLING";
    case SubscriptionModesEnum.SUBSCRIPTION:
      return "SUBSCRIPTION";
    case SubscriptionModesEnum.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface VariableModbusDataDto {
  registerType: RegisterTypesEnum;
  typeValue: TypeValuesEnum;
  endian: EndiansEnum;
  startAddress: number;
}

export interface IndicatorModuleDto {
  id?: string | undefined;
  dataSourceId: string;
  variableName: string;
  uom: string;
  uoc: string;
  dataSourceType?: DataSourceTypesEnum | undefined;
  group?: string | undefined;
  isExternal?: boolean | undefined;
  isDefault?: boolean | undefined;
  isPrimary?:
    | boolean
    | undefined;
  /** insite specific */
  record?: string | undefined;
  descriptor?: string | undefined;
  isWellBased?:
    | boolean
    | undefined;
  /** mqtt specific */
  mqttServerAddress?: string | undefined;
  mqttTopic?:
    | string
    | undefined;
  /** rmq specific */
  exchangeName?: string | undefined;
  exchangeType?: RmqExchangeTypesEnum | undefined;
  exchangeDurable?: boolean | undefined;
  routingKey?:
    | string
    | undefined;
  /** modbus specific */
  modbusSampleRate?: number | undefined;
  modbusReadBlocksData?: boolean | undefined;
  modbusData?:
    | VariableModbusDataDto
    | undefined;
  /** opcua specific */
  subscriptionMode?:
    | SubscriptionModesEnum
    | undefined;
  /** wits0 specific */
  wits0SampleRate?: number | undefined;
  wits0Direction?: boolean | undefined;
  variableId?: string | undefined;
}

export interface IndicatorDto {
  id?: string | undefined;
  name: string;
  description?: string | undefined;
  group?: string | undefined;
  tags: string[];
  sensor?: IndicatorModuleDto;
  publishers: IndicatorModuleDto[];
}

export interface IndicatorsDto {
  total: number;
  indicators: IndicatorDto[];
}

export interface IndicatorIdDto {
  id: string;
}

function createBaseVariableModbusDataDto(): VariableModbusDataDto {
  return { registerType: 0, typeValue: 0, endian: 0, startAddress: 0 };
}

export const VariableModbusDataDto = {
  encode(message: VariableModbusDataDto, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.registerType !== 0) {
      writer.uint32(8).int32(message.registerType);
    }
    if (message.typeValue !== 0) {
      writer.uint32(16).int32(message.typeValue);
    }
    if (message.endian !== 0) {
      writer.uint32(24).int32(message.endian);
    }
    if (message.startAddress !== 0) {
      writer.uint32(32).int32(message.startAddress);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): VariableModbusDataDto {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseVariableModbusDataDto();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.registerType = reader.int32() as any;
          break;
        case 2:
          message.typeValue = reader.int32() as any;
          break;
        case 3:
          message.endian = reader.int32() as any;
          break;
        case 4:
          message.startAddress = reader.int32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): VariableModbusDataDto {
    return {
      registerType: isSet(object.registerType) ? registerTypesEnumFromJSON(object.registerType) : 0,
      typeValue: isSet(object.typeValue) ? typeValuesEnumFromJSON(object.typeValue) : 0,
      endian: isSet(object.endian) ? endiansEnumFromJSON(object.endian) : 0,
      startAddress: isSet(object.startAddress) ? Number(object.startAddress) : 0,
    };
  },

  toJSON(message: VariableModbusDataDto): unknown {
    const obj: any = {};
    message.registerType !== undefined && (obj.registerType = registerTypesEnumToJSON(message.registerType));
    message.typeValue !== undefined && (obj.typeValue = typeValuesEnumToJSON(message.typeValue));
    message.endian !== undefined && (obj.endian = endiansEnumToJSON(message.endian));
    message.startAddress !== undefined && (obj.startAddress = Math.round(message.startAddress));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<VariableModbusDataDto>, I>>(object: I): VariableModbusDataDto {
    const message = createBaseVariableModbusDataDto();
    message.registerType = object.registerType ?? 0;
    message.typeValue = object.typeValue ?? 0;
    message.endian = object.endian ?? 0;
    message.startAddress = object.startAddress ?? 0;
    return message;
  },
};

function createBaseIndicatorModuleDto(): IndicatorModuleDto {
  return {
    id: undefined,
    dataSourceId: "",
    variableName: "",
    uom: "",
    uoc: "",
    dataSourceType: undefined,
    group: undefined,
    isExternal: undefined,
    isDefault: undefined,
    isPrimary: undefined,
    record: undefined,
    descriptor: undefined,
    isWellBased: undefined,
    mqttServerAddress: undefined,
    mqttTopic: undefined,
    exchangeName: undefined,
    exchangeType: undefined,
    exchangeDurable: undefined,
    routingKey: undefined,
    modbusSampleRate: undefined,
    modbusReadBlocksData: undefined,
    modbusData: undefined,
    subscriptionMode: undefined,
    wits0SampleRate: undefined,
    wits0Direction: undefined,
    variableId: undefined,
  };
}

export const IndicatorModuleDto = {
  encode(message: IndicatorModuleDto, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== undefined) {
      writer.uint32(10).string(message.id);
    }
    if (message.dataSourceId !== "") {
      writer.uint32(18).string(message.dataSourceId);
    }
    if (message.variableName !== "") {
      writer.uint32(26).string(message.variableName);
    }
    if (message.uom !== "") {
      writer.uint32(34).string(message.uom);
    }
    if (message.uoc !== "") {
      writer.uint32(42).string(message.uoc);
    }
    if (message.dataSourceType !== undefined) {
      writer.uint32(48).int32(message.dataSourceType);
    }
    if (message.group !== undefined) {
      writer.uint32(58).string(message.group);
    }
    if (message.isExternal !== undefined) {
      writer.uint32(64).bool(message.isExternal);
    }
    if (message.isDefault !== undefined) {
      writer.uint32(72).bool(message.isDefault);
    }
    if (message.isPrimary !== undefined) {
      writer.uint32(80).bool(message.isPrimary);
    }
    if (message.record !== undefined) {
      writer.uint32(90).string(message.record);
    }
    if (message.descriptor !== undefined) {
      writer.uint32(98).string(message.descriptor);
    }
    if (message.isWellBased !== undefined) {
      writer.uint32(104).bool(message.isWellBased);
    }
    if (message.mqttServerAddress !== undefined) {
      writer.uint32(114).string(message.mqttServerAddress);
    }
    if (message.mqttTopic !== undefined) {
      writer.uint32(122).string(message.mqttTopic);
    }
    if (message.exchangeName !== undefined) {
      writer.uint32(130).string(message.exchangeName);
    }
    if (message.exchangeType !== undefined) {
      writer.uint32(136).int32(message.exchangeType);
    }
    if (message.exchangeDurable !== undefined) {
      writer.uint32(144).bool(message.exchangeDurable);
    }
    if (message.routingKey !== undefined) {
      writer.uint32(154).string(message.routingKey);
    }
    if (message.modbusSampleRate !== undefined) {
      writer.uint32(160).int32(message.modbusSampleRate);
    }
    if (message.modbusReadBlocksData !== undefined) {
      writer.uint32(168).bool(message.modbusReadBlocksData);
    }
    if (message.modbusData !== undefined) {
      VariableModbusDataDto.encode(message.modbusData, writer.uint32(178).fork()).ldelim();
    }
    if (message.subscriptionMode !== undefined) {
      writer.uint32(184).int32(message.subscriptionMode);
    }
    if (message.wits0SampleRate !== undefined) {
      writer.uint32(192).int32(message.wits0SampleRate);
    }
    if (message.wits0Direction !== undefined) {
      writer.uint32(200).bool(message.wits0Direction);
    }
    if (message.variableId !== undefined) {
      writer.uint32(210).string(message.variableId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): IndicatorModuleDto {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseIndicatorModuleDto();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
          break;
        case 2:
          message.dataSourceId = reader.string();
          break;
        case 3:
          message.variableName = reader.string();
          break;
        case 4:
          message.uom = reader.string();
          break;
        case 5:
          message.uoc = reader.string();
          break;
        case 6:
          message.dataSourceType = reader.int32() as any;
          break;
        case 7:
          message.group = reader.string();
          break;
        case 8:
          message.isExternal = reader.bool();
          break;
        case 9:
          message.isDefault = reader.bool();
          break;
        case 10:
          message.isPrimary = reader.bool();
          break;
        case 11:
          message.record = reader.string();
          break;
        case 12:
          message.descriptor = reader.string();
          break;
        case 13:
          message.isWellBased = reader.bool();
          break;
        case 14:
          message.mqttServerAddress = reader.string();
          break;
        case 15:
          message.mqttTopic = reader.string();
          break;
        case 16:
          message.exchangeName = reader.string();
          break;
        case 17:
          message.exchangeType = reader.int32() as any;
          break;
        case 18:
          message.exchangeDurable = reader.bool();
          break;
        case 19:
          message.routingKey = reader.string();
          break;
        case 20:
          message.modbusSampleRate = reader.int32();
          break;
        case 21:
          message.modbusReadBlocksData = reader.bool();
          break;
        case 22:
          message.modbusData = VariableModbusDataDto.decode(reader, reader.uint32());
          break;
        case 23:
          message.subscriptionMode = reader.int32() as any;
          break;
        case 24:
          message.wits0SampleRate = reader.int32();
          break;
        case 25:
          message.wits0Direction = reader.bool();
          break;
        case 26:
          message.variableId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): IndicatorModuleDto {
    return {
      id: isSet(object.id) ? String(object.id) : undefined,
      dataSourceId: isSet(object.dataSourceId) ? String(object.dataSourceId) : "",
      variableName: isSet(object.variableName) ? String(object.variableName) : "",
      uom: isSet(object.uom) ? String(object.uom) : "",
      uoc: isSet(object.uoc) ? String(object.uoc) : "",
      dataSourceType: isSet(object.dataSourceType) ? dataSourceTypesEnumFromJSON(object.dataSourceType) : undefined,
      group: isSet(object.group) ? String(object.group) : undefined,
      isExternal: isSet(object.isExternal) ? Boolean(object.isExternal) : undefined,
      isDefault: isSet(object.isDefault) ? Boolean(object.isDefault) : undefined,
      isPrimary: isSet(object.isPrimary) ? Boolean(object.isPrimary) : undefined,
      record: isSet(object.record) ? String(object.record) : undefined,
      descriptor: isSet(object.descriptor) ? String(object.descriptor) : undefined,
      isWellBased: isSet(object.isWellBased) ? Boolean(object.isWellBased) : undefined,
      mqttServerAddress: isSet(object.mqttServerAddress) ? String(object.mqttServerAddress) : undefined,
      mqttTopic: isSet(object.mqttTopic) ? String(object.mqttTopic) : undefined,
      exchangeName: isSet(object.exchangeName) ? String(object.exchangeName) : undefined,
      exchangeType: isSet(object.exchangeType) ? rmqExchangeTypesEnumFromJSON(object.exchangeType) : undefined,
      exchangeDurable: isSet(object.exchangeDurable) ? Boolean(object.exchangeDurable) : undefined,
      routingKey: isSet(object.routingKey) ? String(object.routingKey) : undefined,
      modbusSampleRate: isSet(object.modbusSampleRate) ? Number(object.modbusSampleRate) : undefined,
      modbusReadBlocksData: isSet(object.modbusReadBlocksData) ? Boolean(object.modbusReadBlocksData) : undefined,
      modbusData: isSet(object.modbusData) ? VariableModbusDataDto.fromJSON(object.modbusData) : undefined,
      subscriptionMode: isSet(object.subscriptionMode)
        ? subscriptionModesEnumFromJSON(object.subscriptionMode)
        : undefined,
      wits0SampleRate: isSet(object.wits0SampleRate) ? Number(object.wits0SampleRate) : undefined,
      wits0Direction: isSet(object.wits0Direction) ? Boolean(object.wits0Direction) : undefined,
      variableId: isSet(object.variableId) ? String(object.variableId) : undefined,
    };
  },

  toJSON(message: IndicatorModuleDto): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.dataSourceId !== undefined && (obj.dataSourceId = message.dataSourceId);
    message.variableName !== undefined && (obj.variableName = message.variableName);
    message.uom !== undefined && (obj.uom = message.uom);
    message.uoc !== undefined && (obj.uoc = message.uoc);
    message.dataSourceType !== undefined && (obj.dataSourceType = message.dataSourceType !== undefined
      ? dataSourceTypesEnumToJSON(message.dataSourceType)
      : undefined);
    message.group !== undefined && (obj.group = message.group);
    message.isExternal !== undefined && (obj.isExternal = message.isExternal);
    message.isDefault !== undefined && (obj.isDefault = message.isDefault);
    message.isPrimary !== undefined && (obj.isPrimary = message.isPrimary);
    message.record !== undefined && (obj.record = message.record);
    message.descriptor !== undefined && (obj.descriptor = message.descriptor);
    message.isWellBased !== undefined && (obj.isWellBased = message.isWellBased);
    message.mqttServerAddress !== undefined && (obj.mqttServerAddress = message.mqttServerAddress);
    message.mqttTopic !== undefined && (obj.mqttTopic = message.mqttTopic);
    message.exchangeName !== undefined && (obj.exchangeName = message.exchangeName);
    message.exchangeType !== undefined && (obj.exchangeType = message.exchangeType !== undefined
      ? rmqExchangeTypesEnumToJSON(message.exchangeType)
      : undefined);
    message.exchangeDurable !== undefined && (obj.exchangeDurable = message.exchangeDurable);
    message.routingKey !== undefined && (obj.routingKey = message.routingKey);
    message.modbusSampleRate !== undefined && (obj.modbusSampleRate = Math.round(message.modbusSampleRate));
    message.modbusReadBlocksData !== undefined && (obj.modbusReadBlocksData = message.modbusReadBlocksData);
    message.modbusData !== undefined &&
      (obj.modbusData = message.modbusData ? VariableModbusDataDto.toJSON(message.modbusData) : undefined);
    message.subscriptionMode !== undefined && (obj.subscriptionMode = message.subscriptionMode !== undefined
      ? subscriptionModesEnumToJSON(message.subscriptionMode)
      : undefined);
    message.wits0SampleRate !== undefined && (obj.wits0SampleRate = Math.round(message.wits0SampleRate));
    message.wits0Direction !== undefined && (obj.wits0Direction = message.wits0Direction);
    message.variableId !== undefined && (obj.variableId = message.variableId);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<IndicatorModuleDto>, I>>(object: I): IndicatorModuleDto {
    const message = createBaseIndicatorModuleDto();
    message.id = object.id ?? undefined;
    message.dataSourceId = object.dataSourceId ?? "";
    message.variableName = object.variableName ?? "";
    message.uom = object.uom ?? "";
    message.uoc = object.uoc ?? "";
    message.dataSourceType = object.dataSourceType ?? undefined;
    message.group = object.group ?? undefined;
    message.isExternal = object.isExternal ?? undefined;
    message.isDefault = object.isDefault ?? undefined;
    message.isPrimary = object.isPrimary ?? undefined;
    message.record = object.record ?? undefined;
    message.descriptor = object.descriptor ?? undefined;
    message.isWellBased = object.isWellBased ?? undefined;
    message.mqttServerAddress = object.mqttServerAddress ?? undefined;
    message.mqttTopic = object.mqttTopic ?? undefined;
    message.exchangeName = object.exchangeName ?? undefined;
    message.exchangeType = object.exchangeType ?? undefined;
    message.exchangeDurable = object.exchangeDurable ?? undefined;
    message.routingKey = object.routingKey ?? undefined;
    message.modbusSampleRate = object.modbusSampleRate ?? undefined;
    message.modbusReadBlocksData = object.modbusReadBlocksData ?? undefined;
    message.modbusData = (object.modbusData !== undefined && object.modbusData !== null)
      ? VariableModbusDataDto.fromPartial(object.modbusData)
      : undefined;
    message.subscriptionMode = object.subscriptionMode ?? undefined;
    message.wits0SampleRate = object.wits0SampleRate ?? undefined;
    message.wits0Direction = object.wits0Direction ?? undefined;
    message.variableId = object.variableId ?? undefined;
    return message;
  },
};

function createBaseIndicatorDto(): IndicatorDto {
  return {
    id: undefined,
    name: "",
    description: undefined,
    group: undefined,
    tags: [],
    sensor: undefined,
    publishers: [],
  };
}

export const IndicatorDto = {
  encode(message: IndicatorDto, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== undefined) {
      writer.uint32(10).string(message.id);
    }
    if (message.name !== "") {
      writer.uint32(18).string(message.name);
    }
    if (message.description !== undefined) {
      writer.uint32(26).string(message.description);
    }
    if (message.group !== undefined) {
      writer.uint32(34).string(message.group);
    }
    for (const v of message.tags) {
      writer.uint32(42).string(v!);
    }
    if (message.sensor !== undefined) {
      IndicatorModuleDto.encode(message.sensor, writer.uint32(50).fork()).ldelim();
    }
    for (const v of message.publishers) {
      IndicatorModuleDto.encode(v!, writer.uint32(58).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): IndicatorDto {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseIndicatorDto();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
          break;
        case 2:
          message.name = reader.string();
          break;
        case 3:
          message.description = reader.string();
          break;
        case 4:
          message.group = reader.string();
          break;
        case 5:
          message.tags.push(reader.string());
          break;
        case 6:
          message.sensor = IndicatorModuleDto.decode(reader, reader.uint32());
          break;
        case 7:
          message.publishers.push(IndicatorModuleDto.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): IndicatorDto {
    return {
      id: isSet(object.id) ? String(object.id) : undefined,
      name: isSet(object.name) ? String(object.name) : "",
      description: isSet(object.description) ? String(object.description) : undefined,
      group: isSet(object.group) ? String(object.group) : undefined,
      tags: Array.isArray(object?.tags) ? object.tags.map((e: any) => String(e)) : [],
      sensor: isSet(object.sensor) ? IndicatorModuleDto.fromJSON(object.sensor) : undefined,
      publishers: Array.isArray(object?.publishers)
        ? object.publishers.map((e: any) => IndicatorModuleDto.fromJSON(e))
        : [],
    };
  },

  toJSON(message: IndicatorDto): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.name !== undefined && (obj.name = message.name);
    message.description !== undefined && (obj.description = message.description);
    message.group !== undefined && (obj.group = message.group);
    if (message.tags) {
      obj.tags = message.tags.map((e) => e);
    } else {
      obj.tags = [];
    }
    message.sensor !== undefined &&
      (obj.sensor = message.sensor ? IndicatorModuleDto.toJSON(message.sensor) : undefined);
    if (message.publishers) {
      obj.publishers = message.publishers.map((e) => e ? IndicatorModuleDto.toJSON(e) : undefined);
    } else {
      obj.publishers = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<IndicatorDto>, I>>(object: I): IndicatorDto {
    const message = createBaseIndicatorDto();
    message.id = object.id ?? undefined;
    message.name = object.name ?? "";
    message.description = object.description ?? undefined;
    message.group = object.group ?? undefined;
    message.tags = object.tags?.map((e) => e) || [];
    message.sensor = (object.sensor !== undefined && object.sensor !== null)
      ? IndicatorModuleDto.fromPartial(object.sensor)
      : undefined;
    message.publishers = object.publishers?.map((e) => IndicatorModuleDto.fromPartial(e)) || [];
    return message;
  },
};

function createBaseIndicatorsDto(): IndicatorsDto {
  return { total: 0, indicators: [] };
}

export const IndicatorsDto = {
  encode(message: IndicatorsDto, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.total !== 0) {
      writer.uint32(8).int32(message.total);
    }
    for (const v of message.indicators) {
      IndicatorDto.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): IndicatorsDto {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseIndicatorsDto();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.total = reader.int32();
          break;
        case 2:
          message.indicators.push(IndicatorDto.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): IndicatorsDto {
    return {
      total: isSet(object.total) ? Number(object.total) : 0,
      indicators: Array.isArray(object?.indicators) ? object.indicators.map((e: any) => IndicatorDto.fromJSON(e)) : [],
    };
  },

  toJSON(message: IndicatorsDto): unknown {
    const obj: any = {};
    message.total !== undefined && (obj.total = Math.round(message.total));
    if (message.indicators) {
      obj.indicators = message.indicators.map((e) => e ? IndicatorDto.toJSON(e) : undefined);
    } else {
      obj.indicators = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<IndicatorsDto>, I>>(object: I): IndicatorsDto {
    const message = createBaseIndicatorsDto();
    message.total = object.total ?? 0;
    message.indicators = object.indicators?.map((e) => IndicatorDto.fromPartial(e)) || [];
    return message;
  },
};

function createBaseIndicatorIdDto(): IndicatorIdDto {
  return { id: "" };
}

export const IndicatorIdDto = {
  encode(message: IndicatorIdDto, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): IndicatorIdDto {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseIndicatorIdDto();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): IndicatorIdDto {
    return { id: isSet(object.id) ? String(object.id) : "" };
  },

  toJSON(message: IndicatorIdDto): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<IndicatorIdDto>, I>>(object: I): IndicatorIdDto {
    const message = createBaseIndicatorIdDto();
    message.id = object.id ?? "";
    return message;
  },
};

export type IndicatorServiceService = typeof IndicatorServiceService;
export const IndicatorServiceService = {
  createIndicator: {
    path: "/indicator.IndicatorService/createIndicator",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: IndicatorDto) => Buffer.from(IndicatorDto.encode(value).finish()),
    requestDeserialize: (value: Buffer) => IndicatorDto.decode(value),
    responseSerialize: (value: IndicatorDto) => Buffer.from(IndicatorDto.encode(value).finish()),
    responseDeserialize: (value: Buffer) => IndicatorDto.decode(value),
  },
  getIndicatorById: {
    path: "/indicator.IndicatorService/getIndicatorById",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: IndicatorIdDto) => Buffer.from(IndicatorIdDto.encode(value).finish()),
    requestDeserialize: (value: Buffer) => IndicatorIdDto.decode(value),
    responseSerialize: (value: IndicatorDto) => Buffer.from(IndicatorDto.encode(value).finish()),
    responseDeserialize: (value: Buffer) => IndicatorDto.decode(value),
  },
  getAllIndicators: {
    path: "/indicator.IndicatorService/getAllIndicators",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: Empty) => Buffer.from(Empty.encode(value).finish()),
    requestDeserialize: (value: Buffer) => Empty.decode(value),
    responseSerialize: (value: IndicatorsDto) => Buffer.from(IndicatorsDto.encode(value).finish()),
    responseDeserialize: (value: Buffer) => IndicatorsDto.decode(value),
  },
} as const;

export interface IndicatorServiceServer extends UntypedServiceImplementation {
  createIndicator: handleUnaryCall<IndicatorDto, IndicatorDto>;
  getIndicatorById: handleUnaryCall<IndicatorIdDto, IndicatorDto>;
  getAllIndicators: handleUnaryCall<Empty, IndicatorsDto>;
}

export interface IndicatorServiceClient extends Client {
  createIndicator(
    request: IndicatorDto,
    callback: (error: ServiceError | null, response: IndicatorDto) => void,
  ): ClientUnaryCall;
  createIndicator(
    request: IndicatorDto,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: IndicatorDto) => void,
  ): ClientUnaryCall;
  createIndicator(
    request: IndicatorDto,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: IndicatorDto) => void,
  ): ClientUnaryCall;
  getIndicatorById(
    request: IndicatorIdDto,
    callback: (error: ServiceError | null, response: IndicatorDto) => void,
  ): ClientUnaryCall;
  getIndicatorById(
    request: IndicatorIdDto,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: IndicatorDto) => void,
  ): ClientUnaryCall;
  getIndicatorById(
    request: IndicatorIdDto,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: IndicatorDto) => void,
  ): ClientUnaryCall;
  getAllIndicators(
    request: Empty,
    callback: (error: ServiceError | null, response: IndicatorsDto) => void,
  ): ClientUnaryCall;
  getAllIndicators(
    request: Empty,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: IndicatorsDto) => void,
  ): ClientUnaryCall;
  getAllIndicators(
    request: Empty,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: IndicatorsDto) => void,
  ): ClientUnaryCall;
}

export const IndicatorServiceClient = makeGenericClientConstructor(
  IndicatorServiceService,
  "indicator.IndicatorService",
) as unknown as {
  new (address: string, credentials: ChannelCredentials, options?: Partial<ChannelOptions>): IndicatorServiceClient;
  service: typeof IndicatorServiceService;
};

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

type DeepPartial<T> = T extends Builtin ? T
  : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
