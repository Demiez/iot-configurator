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

export enum DataSourceTypesEnum {
  UNKNOWN_TYPE = 0,
  MQTT = 1,
  INSITE = 2,
  RMQ = 3,
  MODBUS = 4,
  OPCUA = 5,
  WITS0 = 6,
  UNRECOGNIZED = -1,
}

export function dataSourceTypesEnumFromJSON(object: any): DataSourceTypesEnum {
  switch (object) {
    case 0:
    case "UNKNOWN_TYPE":
      return DataSourceTypesEnum.UNKNOWN_TYPE;
    case 1:
    case "MQTT":
      return DataSourceTypesEnum.MQTT;
    case 2:
    case "INSITE":
      return DataSourceTypesEnum.INSITE;
    case 3:
    case "RMQ":
      return DataSourceTypesEnum.RMQ;
    case 4:
    case "MODBUS":
      return DataSourceTypesEnum.MODBUS;
    case 5:
    case "OPCUA":
      return DataSourceTypesEnum.OPCUA;
    case 6:
    case "WITS0":
      return DataSourceTypesEnum.WITS0;
    case -1:
    case "UNRECOGNIZED":
    default:
      return DataSourceTypesEnum.UNRECOGNIZED;
  }
}

export function dataSourceTypesEnumToJSON(object: DataSourceTypesEnum): string {
  switch (object) {
    case DataSourceTypesEnum.UNKNOWN_TYPE:
      return "UNKNOWN_TYPE";
    case DataSourceTypesEnum.MQTT:
      return "MQTT";
    case DataSourceTypesEnum.INSITE:
      return "INSITE";
    case DataSourceTypesEnum.RMQ:
      return "RMQ";
    case DataSourceTypesEnum.MODBUS:
      return "MODBUS";
    case DataSourceTypesEnum.OPCUA:
      return "OPCUA";
    case DataSourceTypesEnum.WITS0:
      return "WITS0";
    case DataSourceTypesEnum.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export enum SecurityPolicyEnum {
  UNKNOWN_POLICY = 0,
  NONE = 1,
  BASIC128 = 2,
  BASIC128RSA15 = 3,
  BASIC192 = 4,
  BASIC192RSA15 = 5,
  BASIC256 = 6,
  BASIC256RSA15 = 7,
  AES128SHA256RSA = 8,
  PUBSUBAES128 = 9,
  PUBSUBAES256 = 10,
  BASIC256SHA256 = 11,
  UNRECOGNIZED = -1,
}

export function securityPolicyEnumFromJSON(object: any): SecurityPolicyEnum {
  switch (object) {
    case 0:
    case "UNKNOWN_POLICY":
      return SecurityPolicyEnum.UNKNOWN_POLICY;
    case 1:
    case "NONE":
      return SecurityPolicyEnum.NONE;
    case 2:
    case "BASIC128":
      return SecurityPolicyEnum.BASIC128;
    case 3:
    case "BASIC128RSA15":
      return SecurityPolicyEnum.BASIC128RSA15;
    case 4:
    case "BASIC192":
      return SecurityPolicyEnum.BASIC192;
    case 5:
    case "BASIC192RSA15":
      return SecurityPolicyEnum.BASIC192RSA15;
    case 6:
    case "BASIC256":
      return SecurityPolicyEnum.BASIC256;
    case 7:
    case "BASIC256RSA15":
      return SecurityPolicyEnum.BASIC256RSA15;
    case 8:
    case "AES128SHA256RSA":
      return SecurityPolicyEnum.AES128SHA256RSA;
    case 9:
    case "PUBSUBAES128":
      return SecurityPolicyEnum.PUBSUBAES128;
    case 10:
    case "PUBSUBAES256":
      return SecurityPolicyEnum.PUBSUBAES256;
    case 11:
    case "BASIC256SHA256":
      return SecurityPolicyEnum.BASIC256SHA256;
    case -1:
    case "UNRECOGNIZED":
    default:
      return SecurityPolicyEnum.UNRECOGNIZED;
  }
}

export function securityPolicyEnumToJSON(object: SecurityPolicyEnum): string {
  switch (object) {
    case SecurityPolicyEnum.UNKNOWN_POLICY:
      return "UNKNOWN_POLICY";
    case SecurityPolicyEnum.NONE:
      return "NONE";
    case SecurityPolicyEnum.BASIC128:
      return "BASIC128";
    case SecurityPolicyEnum.BASIC128RSA15:
      return "BASIC128RSA15";
    case SecurityPolicyEnum.BASIC192:
      return "BASIC192";
    case SecurityPolicyEnum.BASIC192RSA15:
      return "BASIC192RSA15";
    case SecurityPolicyEnum.BASIC256:
      return "BASIC256";
    case SecurityPolicyEnum.BASIC256RSA15:
      return "BASIC256RSA15";
    case SecurityPolicyEnum.AES128SHA256RSA:
      return "AES128SHA256RSA";
    case SecurityPolicyEnum.PUBSUBAES128:
      return "PUBSUBAES128";
    case SecurityPolicyEnum.PUBSUBAES256:
      return "PUBSUBAES256";
    case SecurityPolicyEnum.BASIC256SHA256:
      return "BASIC256SHA256";
    case SecurityPolicyEnum.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export enum InsiteLogLevelEnum {
  UNKNOWN_LEVEL = 0,
  TRACE = 1,
  DEBUG = 2,
  INFO = 3,
  WARN = 4,
  ERROR = 5,
  FATAL = 6,
  UNRECOGNIZED = -1,
}

export function insiteLogLevelEnumFromJSON(object: any): InsiteLogLevelEnum {
  switch (object) {
    case 0:
    case "UNKNOWN_LEVEL":
      return InsiteLogLevelEnum.UNKNOWN_LEVEL;
    case 1:
    case "TRACE":
      return InsiteLogLevelEnum.TRACE;
    case 2:
    case "DEBUG":
      return InsiteLogLevelEnum.DEBUG;
    case 3:
    case "INFO":
      return InsiteLogLevelEnum.INFO;
    case 4:
    case "WARN":
      return InsiteLogLevelEnum.WARN;
    case 5:
    case "ERROR":
      return InsiteLogLevelEnum.ERROR;
    case 6:
    case "FATAL":
      return InsiteLogLevelEnum.FATAL;
    case -1:
    case "UNRECOGNIZED":
    default:
      return InsiteLogLevelEnum.UNRECOGNIZED;
  }
}

export function insiteLogLevelEnumToJSON(object: InsiteLogLevelEnum): string {
  switch (object) {
    case InsiteLogLevelEnum.UNKNOWN_LEVEL:
      return "UNKNOWN_LEVEL";
    case InsiteLogLevelEnum.TRACE:
      return "TRACE";
    case InsiteLogLevelEnum.DEBUG:
      return "DEBUG";
    case InsiteLogLevelEnum.INFO:
      return "INFO";
    case InsiteLogLevelEnum.WARN:
      return "WARN";
    case InsiteLogLevelEnum.ERROR:
      return "ERROR";
    case InsiteLogLevelEnum.FATAL:
      return "FATAL";
    case InsiteLogLevelEnum.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface DataSourceDto {
  id?: string | undefined;
  name: string;
  port: number;
  type: DataSourceTypesEnum;
  isDefault: boolean;
  isPrimary: boolean;
  /** insite specific */
  insiteServerAddress?: string | undefined;
  bridgeId?: string | undefined;
  logLevel?:
    | InsiteLogLevelEnum
    | undefined;
  /** mqtt specific */
  mqttServerAddress?:
    | string
    | undefined;
  /** rmq specific */
  amqpServerAddress?:
    | string
    | undefined;
  /** modbus specific */
  slaveId?: string | undefined;
  modbusIpAddress?:
    | string
    | undefined;
  /** opcua specific */
  opcuaServerAddress?: string | undefined;
  domainName?: string | undefined;
  messageSecurityMode?: number | undefined;
  securityPolicy?: SecurityPolicyEnum | undefined;
  certificate?:
    | string
    | undefined;
  /**
   * wits0 specific
   * took data structure from here https://github.com/TIBCOSoftware/flogo-contrib/pull/326/files
   */
  baudRate?: number | undefined;
  dataBits?: number | undefined;
  stopBits?: number | undefined;
  parity?: number | undefined;
  readTimeoutSeconds?: number | undefined;
  heartBeatInterval?: number | undefined;
  heartBeatValue?: string | undefined;
  packetHeader?: string | undefined;
  packetFooter?: string | undefined;
  lineSeparator?: string | undefined;
  outputRaw?: boolean | undefined;
}

export interface DataSourceId {
  id: string;
}

function createBaseDataSourceDto(): DataSourceDto {
  return {
    id: undefined,
    name: "",
    port: 0,
    type: 0,
    isDefault: false,
    isPrimary: false,
    insiteServerAddress: undefined,
    bridgeId: undefined,
    logLevel: undefined,
    mqttServerAddress: undefined,
    amqpServerAddress: undefined,
    slaveId: undefined,
    modbusIpAddress: undefined,
    opcuaServerAddress: undefined,
    domainName: undefined,
    messageSecurityMode: undefined,
    securityPolicy: undefined,
    certificate: undefined,
    baudRate: undefined,
    dataBits: undefined,
    stopBits: undefined,
    parity: undefined,
    readTimeoutSeconds: undefined,
    heartBeatInterval: undefined,
    heartBeatValue: undefined,
    packetHeader: undefined,
    packetFooter: undefined,
    lineSeparator: undefined,
    outputRaw: undefined,
  };
}

export const DataSourceDto = {
  encode(message: DataSourceDto, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== undefined) {
      writer.uint32(10).string(message.id);
    }
    if (message.name !== "") {
      writer.uint32(18).string(message.name);
    }
    if (message.port !== 0) {
      writer.uint32(24).int32(message.port);
    }
    if (message.type !== 0) {
      writer.uint32(32).int32(message.type);
    }
    if (message.isDefault === true) {
      writer.uint32(40).bool(message.isDefault);
    }
    if (message.isPrimary === true) {
      writer.uint32(48).bool(message.isPrimary);
    }
    if (message.insiteServerAddress !== undefined) {
      writer.uint32(58).string(message.insiteServerAddress);
    }
    if (message.bridgeId !== undefined) {
      writer.uint32(66).string(message.bridgeId);
    }
    if (message.logLevel !== undefined) {
      writer.uint32(72).int32(message.logLevel);
    }
    if (message.mqttServerAddress !== undefined) {
      writer.uint32(82).string(message.mqttServerAddress);
    }
    if (message.amqpServerAddress !== undefined) {
      writer.uint32(90).string(message.amqpServerAddress);
    }
    if (message.slaveId !== undefined) {
      writer.uint32(98).string(message.slaveId);
    }
    if (message.modbusIpAddress !== undefined) {
      writer.uint32(106).string(message.modbusIpAddress);
    }
    if (message.opcuaServerAddress !== undefined) {
      writer.uint32(114).string(message.opcuaServerAddress);
    }
    if (message.domainName !== undefined) {
      writer.uint32(122).string(message.domainName);
    }
    if (message.messageSecurityMode !== undefined) {
      writer.uint32(128).int32(message.messageSecurityMode);
    }
    if (message.securityPolicy !== undefined) {
      writer.uint32(136).int32(message.securityPolicy);
    }
    if (message.certificate !== undefined) {
      writer.uint32(146).string(message.certificate);
    }
    if (message.baudRate !== undefined) {
      writer.uint32(152).int32(message.baudRate);
    }
    if (message.dataBits !== undefined) {
      writer.uint32(160).int32(message.dataBits);
    }
    if (message.stopBits !== undefined) {
      writer.uint32(168).int32(message.stopBits);
    }
    if (message.parity !== undefined) {
      writer.uint32(176).int32(message.parity);
    }
    if (message.readTimeoutSeconds !== undefined) {
      writer.uint32(184).int32(message.readTimeoutSeconds);
    }
    if (message.heartBeatInterval !== undefined) {
      writer.uint32(192).int32(message.heartBeatInterval);
    }
    if (message.heartBeatValue !== undefined) {
      writer.uint32(202).string(message.heartBeatValue);
    }
    if (message.packetHeader !== undefined) {
      writer.uint32(210).string(message.packetHeader);
    }
    if (message.packetFooter !== undefined) {
      writer.uint32(218).string(message.packetFooter);
    }
    if (message.lineSeparator !== undefined) {
      writer.uint32(226).string(message.lineSeparator);
    }
    if (message.outputRaw !== undefined) {
      writer.uint32(232).bool(message.outputRaw);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DataSourceDto {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDataSourceDto();
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
          message.port = reader.int32();
          break;
        case 4:
          message.type = reader.int32() as any;
          break;
        case 5:
          message.isDefault = reader.bool();
          break;
        case 6:
          message.isPrimary = reader.bool();
          break;
        case 7:
          message.insiteServerAddress = reader.string();
          break;
        case 8:
          message.bridgeId = reader.string();
          break;
        case 9:
          message.logLevel = reader.int32() as any;
          break;
        case 10:
          message.mqttServerAddress = reader.string();
          break;
        case 11:
          message.amqpServerAddress = reader.string();
          break;
        case 12:
          message.slaveId = reader.string();
          break;
        case 13:
          message.modbusIpAddress = reader.string();
          break;
        case 14:
          message.opcuaServerAddress = reader.string();
          break;
        case 15:
          message.domainName = reader.string();
          break;
        case 16:
          message.messageSecurityMode = reader.int32();
          break;
        case 17:
          message.securityPolicy = reader.int32() as any;
          break;
        case 18:
          message.certificate = reader.string();
          break;
        case 19:
          message.baudRate = reader.int32();
          break;
        case 20:
          message.dataBits = reader.int32();
          break;
        case 21:
          message.stopBits = reader.int32();
          break;
        case 22:
          message.parity = reader.int32();
          break;
        case 23:
          message.readTimeoutSeconds = reader.int32();
          break;
        case 24:
          message.heartBeatInterval = reader.int32();
          break;
        case 25:
          message.heartBeatValue = reader.string();
          break;
        case 26:
          message.packetHeader = reader.string();
          break;
        case 27:
          message.packetFooter = reader.string();
          break;
        case 28:
          message.lineSeparator = reader.string();
          break;
        case 29:
          message.outputRaw = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): DataSourceDto {
    return {
      id: isSet(object.id) ? String(object.id) : undefined,
      name: isSet(object.name) ? String(object.name) : "",
      port: isSet(object.port) ? Number(object.port) : 0,
      type: isSet(object.type) ? dataSourceTypesEnumFromJSON(object.type) : 0,
      isDefault: isSet(object.isDefault) ? Boolean(object.isDefault) : false,
      isPrimary: isSet(object.isPrimary) ? Boolean(object.isPrimary) : false,
      insiteServerAddress: isSet(object.insiteServerAddress) ? String(object.insiteServerAddress) : undefined,
      bridgeId: isSet(object.bridgeId) ? String(object.bridgeId) : undefined,
      logLevel: isSet(object.logLevel) ? insiteLogLevelEnumFromJSON(object.logLevel) : undefined,
      mqttServerAddress: isSet(object.mqttServerAddress) ? String(object.mqttServerAddress) : undefined,
      amqpServerAddress: isSet(object.amqpServerAddress) ? String(object.amqpServerAddress) : undefined,
      slaveId: isSet(object.slaveId) ? String(object.slaveId) : undefined,
      modbusIpAddress: isSet(object.modbusIpAddress) ? String(object.modbusIpAddress) : undefined,
      opcuaServerAddress: isSet(object.opcuaServerAddress) ? String(object.opcuaServerAddress) : undefined,
      domainName: isSet(object.domainName) ? String(object.domainName) : undefined,
      messageSecurityMode: isSet(object.messageSecurityMode) ? Number(object.messageSecurityMode) : undefined,
      securityPolicy: isSet(object.securityPolicy) ? securityPolicyEnumFromJSON(object.securityPolicy) : undefined,
      certificate: isSet(object.certificate) ? String(object.certificate) : undefined,
      baudRate: isSet(object.baudRate) ? Number(object.baudRate) : undefined,
      dataBits: isSet(object.dataBits) ? Number(object.dataBits) : undefined,
      stopBits: isSet(object.stopBits) ? Number(object.stopBits) : undefined,
      parity: isSet(object.parity) ? Number(object.parity) : undefined,
      readTimeoutSeconds: isSet(object.readTimeoutSeconds) ? Number(object.readTimeoutSeconds) : undefined,
      heartBeatInterval: isSet(object.heartBeatInterval) ? Number(object.heartBeatInterval) : undefined,
      heartBeatValue: isSet(object.heartBeatValue) ? String(object.heartBeatValue) : undefined,
      packetHeader: isSet(object.packetHeader) ? String(object.packetHeader) : undefined,
      packetFooter: isSet(object.packetFooter) ? String(object.packetFooter) : undefined,
      lineSeparator: isSet(object.lineSeparator) ? String(object.lineSeparator) : undefined,
      outputRaw: isSet(object.outputRaw) ? Boolean(object.outputRaw) : undefined,
    };
  },

  toJSON(message: DataSourceDto): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.name !== undefined && (obj.name = message.name);
    message.port !== undefined && (obj.port = Math.round(message.port));
    message.type !== undefined && (obj.type = dataSourceTypesEnumToJSON(message.type));
    message.isDefault !== undefined && (obj.isDefault = message.isDefault);
    message.isPrimary !== undefined && (obj.isPrimary = message.isPrimary);
    message.insiteServerAddress !== undefined && (obj.insiteServerAddress = message.insiteServerAddress);
    message.bridgeId !== undefined && (obj.bridgeId = message.bridgeId);
    message.logLevel !== undefined &&
      (obj.logLevel = message.logLevel !== undefined ? insiteLogLevelEnumToJSON(message.logLevel) : undefined);
    message.mqttServerAddress !== undefined && (obj.mqttServerAddress = message.mqttServerAddress);
    message.amqpServerAddress !== undefined && (obj.amqpServerAddress = message.amqpServerAddress);
    message.slaveId !== undefined && (obj.slaveId = message.slaveId);
    message.modbusIpAddress !== undefined && (obj.modbusIpAddress = message.modbusIpAddress);
    message.opcuaServerAddress !== undefined && (obj.opcuaServerAddress = message.opcuaServerAddress);
    message.domainName !== undefined && (obj.domainName = message.domainName);
    message.messageSecurityMode !== undefined && (obj.messageSecurityMode = Math.round(message.messageSecurityMode));
    message.securityPolicy !== undefined && (obj.securityPolicy = message.securityPolicy !== undefined
      ? securityPolicyEnumToJSON(message.securityPolicy)
      : undefined);
    message.certificate !== undefined && (obj.certificate = message.certificate);
    message.baudRate !== undefined && (obj.baudRate = Math.round(message.baudRate));
    message.dataBits !== undefined && (obj.dataBits = Math.round(message.dataBits));
    message.stopBits !== undefined && (obj.stopBits = Math.round(message.stopBits));
    message.parity !== undefined && (obj.parity = Math.round(message.parity));
    message.readTimeoutSeconds !== undefined && (obj.readTimeoutSeconds = Math.round(message.readTimeoutSeconds));
    message.heartBeatInterval !== undefined && (obj.heartBeatInterval = Math.round(message.heartBeatInterval));
    message.heartBeatValue !== undefined && (obj.heartBeatValue = message.heartBeatValue);
    message.packetHeader !== undefined && (obj.packetHeader = message.packetHeader);
    message.packetFooter !== undefined && (obj.packetFooter = message.packetFooter);
    message.lineSeparator !== undefined && (obj.lineSeparator = message.lineSeparator);
    message.outputRaw !== undefined && (obj.outputRaw = message.outputRaw);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<DataSourceDto>, I>>(object: I): DataSourceDto {
    const message = createBaseDataSourceDto();
    message.id = object.id ?? undefined;
    message.name = object.name ?? "";
    message.port = object.port ?? 0;
    message.type = object.type ?? 0;
    message.isDefault = object.isDefault ?? false;
    message.isPrimary = object.isPrimary ?? false;
    message.insiteServerAddress = object.insiteServerAddress ?? undefined;
    message.bridgeId = object.bridgeId ?? undefined;
    message.logLevel = object.logLevel ?? undefined;
    message.mqttServerAddress = object.mqttServerAddress ?? undefined;
    message.amqpServerAddress = object.amqpServerAddress ?? undefined;
    message.slaveId = object.slaveId ?? undefined;
    message.modbusIpAddress = object.modbusIpAddress ?? undefined;
    message.opcuaServerAddress = object.opcuaServerAddress ?? undefined;
    message.domainName = object.domainName ?? undefined;
    message.messageSecurityMode = object.messageSecurityMode ?? undefined;
    message.securityPolicy = object.securityPolicy ?? undefined;
    message.certificate = object.certificate ?? undefined;
    message.baudRate = object.baudRate ?? undefined;
    message.dataBits = object.dataBits ?? undefined;
    message.stopBits = object.stopBits ?? undefined;
    message.parity = object.parity ?? undefined;
    message.readTimeoutSeconds = object.readTimeoutSeconds ?? undefined;
    message.heartBeatInterval = object.heartBeatInterval ?? undefined;
    message.heartBeatValue = object.heartBeatValue ?? undefined;
    message.packetHeader = object.packetHeader ?? undefined;
    message.packetFooter = object.packetFooter ?? undefined;
    message.lineSeparator = object.lineSeparator ?? undefined;
    message.outputRaw = object.outputRaw ?? undefined;
    return message;
  },
};

function createBaseDataSourceId(): DataSourceId {
  return { id: "" };
}

export const DataSourceId = {
  encode(message: DataSourceId, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DataSourceId {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDataSourceId();
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

  fromJSON(object: any): DataSourceId {
    return { id: isSet(object.id) ? String(object.id) : "" };
  },

  toJSON(message: DataSourceId): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<DataSourceId>, I>>(object: I): DataSourceId {
    const message = createBaseDataSourceId();
    message.id = object.id ?? "";
    return message;
  },
};

export type DataSourceServiceService = typeof DataSourceServiceService;
export const DataSourceServiceService = {
  createDataSource: {
    path: "/datasource.DataSourceService/CreateDataSource",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: DataSourceDto) => Buffer.from(DataSourceDto.encode(value).finish()),
    requestDeserialize: (value: Buffer) => DataSourceDto.decode(value),
    responseSerialize: (value: DataSourceId) => Buffer.from(DataSourceId.encode(value).finish()),
    responseDeserialize: (value: Buffer) => DataSourceId.decode(value),
  },
} as const;

export interface DataSourceServiceServer extends UntypedServiceImplementation {
  createDataSource: handleUnaryCall<DataSourceDto, DataSourceId>;
}

export interface DataSourceServiceClient extends Client {
  createDataSource(
    request: DataSourceDto,
    callback: (error: ServiceError | null, response: DataSourceId) => void,
  ): ClientUnaryCall;
  createDataSource(
    request: DataSourceDto,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: DataSourceId) => void,
  ): ClientUnaryCall;
  createDataSource(
    request: DataSourceDto,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: DataSourceId) => void,
  ): ClientUnaryCall;
}

export const DataSourceServiceClient = makeGenericClientConstructor(
  DataSourceServiceService,
  "datasource.DataSourceService",
) as unknown as {
  new (address: string, credentials: ChannelCredentials, options?: Partial<ChannelOptions>): DataSourceServiceClient;
  service: typeof DataSourceServiceService;
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
