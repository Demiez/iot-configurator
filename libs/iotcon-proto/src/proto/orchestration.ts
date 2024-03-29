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
import { Empty } from "./google/protobuf/empty";

export enum OperationModesEnum {
  UNKNOWN_MODE = 0,
  MODULE_CREATE = 1,
  MODULE_CREATE_AND_START = 2,
  MODULE_REPLACE = 3,
  MODULE_START = 4,
  MODULE_STOP = 5,
  MODULE_RESTART = 6,
  MODULE_DELETE = 7,
  DELETE_ALL = 8,
  UNRECOGNIZED = -1,
}

export function operationModesEnumFromJSON(object: any): OperationModesEnum {
  switch (object) {
    case 0:
    case "UNKNOWN_MODE":
      return OperationModesEnum.UNKNOWN_MODE;
    case 1:
    case "MODULE_CREATE":
      return OperationModesEnum.MODULE_CREATE;
    case 2:
    case "MODULE_CREATE_AND_START":
      return OperationModesEnum.MODULE_CREATE_AND_START;
    case 3:
    case "MODULE_REPLACE":
      return OperationModesEnum.MODULE_REPLACE;
    case 4:
    case "MODULE_START":
      return OperationModesEnum.MODULE_START;
    case 5:
    case "MODULE_STOP":
      return OperationModesEnum.MODULE_STOP;
    case 6:
    case "MODULE_RESTART":
      return OperationModesEnum.MODULE_RESTART;
    case 7:
    case "MODULE_DELETE":
      return OperationModesEnum.MODULE_DELETE;
    case 8:
    case "DELETE_ALL":
      return OperationModesEnum.DELETE_ALL;
    case -1:
    case "UNRECOGNIZED":
    default:
      return OperationModesEnum.UNRECOGNIZED;
  }
}

export function operationModesEnumToJSON(object: OperationModesEnum): string {
  switch (object) {
    case OperationModesEnum.UNKNOWN_MODE:
      return "UNKNOWN_MODE";
    case OperationModesEnum.MODULE_CREATE:
      return "MODULE_CREATE";
    case OperationModesEnum.MODULE_CREATE_AND_START:
      return "MODULE_CREATE_AND_START";
    case OperationModesEnum.MODULE_REPLACE:
      return "MODULE_REPLACE";
    case OperationModesEnum.MODULE_START:
      return "MODULE_START";
    case OperationModesEnum.MODULE_STOP:
      return "MODULE_STOP";
    case OperationModesEnum.MODULE_RESTART:
      return "MODULE_RESTART";
    case OperationModesEnum.MODULE_DELETE:
      return "MODULE_DELETE";
    case OperationModesEnum.DELETE_ALL:
      return "DELETE_ALL";
    case OperationModesEnum.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export enum ModuleTypesEnum {
  UNKNOWN_MODULE_TYPE = 0,
  CORE_LIB_MODULE = 1,
  IOT_SENSOR = 2,
  IOT_PUBLISHER = 3,
  IOTCON_COLLECTOR = 4,
  IOTCON_PUBLISHER = 5,
  UNRECOGNIZED = -1,
}

export function moduleTypesEnumFromJSON(object: any): ModuleTypesEnum {
  switch (object) {
    case 0:
    case "UNKNOWN_MODULE_TYPE":
      return ModuleTypesEnum.UNKNOWN_MODULE_TYPE;
    case 1:
    case "CORE_LIB_MODULE":
      return ModuleTypesEnum.CORE_LIB_MODULE;
    case 2:
    case "IOT_SENSOR":
      return ModuleTypesEnum.IOT_SENSOR;
    case 3:
    case "IOT_PUBLISHER":
      return ModuleTypesEnum.IOT_PUBLISHER;
    case 4:
    case "IOTCON_COLLECTOR":
      return ModuleTypesEnum.IOTCON_COLLECTOR;
    case 5:
    case "IOTCON_PUBLISHER":
      return ModuleTypesEnum.IOTCON_PUBLISHER;
    case -1:
    case "UNRECOGNIZED":
    default:
      return ModuleTypesEnum.UNRECOGNIZED;
  }
}

export function moduleTypesEnumToJSON(object: ModuleTypesEnum): string {
  switch (object) {
    case ModuleTypesEnum.UNKNOWN_MODULE_TYPE:
      return "UNKNOWN_MODULE_TYPE";
    case ModuleTypesEnum.CORE_LIB_MODULE:
      return "CORE_LIB_MODULE";
    case ModuleTypesEnum.IOT_SENSOR:
      return "IOT_SENSOR";
    case ModuleTypesEnum.IOT_PUBLISHER:
      return "IOT_PUBLISHER";
    case ModuleTypesEnum.IOTCON_COLLECTOR:
      return "IOTCON_COLLECTOR";
    case ModuleTypesEnum.IOTCON_PUBLISHER:
      return "IOTCON_PUBLISHER";
    case ModuleTypesEnum.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface SchemaDto {
  name: string;
  type: ModuleTypesEnum;
  class: string;
  config: string;
}

export interface SchemasDto {
  total: number;
  schemas: SchemaDto[];
}

export interface TemplateDto {
  version: number;
  templateId: string;
  config: string;
}

export interface TemplatesDto {
  total: number;
  templates: TemplateDto[];
}

export interface OperationDto {
  transactionId: string;
  mode: OperationModesEnum;
  config: string;
}

export interface TransactionDto {
  transactionId?: string | undefined;
  operations: OperationDto[];
}

export interface TransactionIdDto {
  transactionId: string;
}

export interface TransactionCompleteDto {
  transactionId: string;
  isComplete: boolean;
}

export interface ModulesIdsDto {
  ids: string[];
}

export interface ModulesConfigsDto {
  total: number;
  configs: string[];
}

function createBaseSchemaDto(): SchemaDto {
  return { name: "", type: 0, class: "", config: "" };
}

export const SchemaDto = {
  encode(message: SchemaDto, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.type !== 0) {
      writer.uint32(16).int32(message.type);
    }
    if (message.class !== "") {
      writer.uint32(26).string(message.class);
    }
    if (message.config !== "") {
      writer.uint32(34).string(message.config);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SchemaDto {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSchemaDto();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.name = reader.string();
          break;
        case 2:
          message.type = reader.int32() as any;
          break;
        case 3:
          message.class = reader.string();
          break;
        case 4:
          message.config = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): SchemaDto {
    return {
      name: isSet(object.name) ? String(object.name) : "",
      type: isSet(object.type) ? moduleTypesEnumFromJSON(object.type) : 0,
      class: isSet(object.class) ? String(object.class) : "",
      config: isSet(object.config) ? String(object.config) : "",
    };
  },

  toJSON(message: SchemaDto): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    message.type !== undefined && (obj.type = moduleTypesEnumToJSON(message.type));
    message.class !== undefined && (obj.class = message.class);
    message.config !== undefined && (obj.config = message.config);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<SchemaDto>, I>>(object: I): SchemaDto {
    const message = createBaseSchemaDto();
    message.name = object.name ?? "";
    message.type = object.type ?? 0;
    message.class = object.class ?? "";
    message.config = object.config ?? "";
    return message;
  },
};

function createBaseSchemasDto(): SchemasDto {
  return { total: 0, schemas: [] };
}

export const SchemasDto = {
  encode(message: SchemasDto, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.total !== 0) {
      writer.uint32(8).int32(message.total);
    }
    for (const v of message.schemas) {
      SchemaDto.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SchemasDto {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSchemasDto();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.total = reader.int32();
          break;
        case 2:
          message.schemas.push(SchemaDto.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): SchemasDto {
    return {
      total: isSet(object.total) ? Number(object.total) : 0,
      schemas: Array.isArray(object?.schemas) ? object.schemas.map((e: any) => SchemaDto.fromJSON(e)) : [],
    };
  },

  toJSON(message: SchemasDto): unknown {
    const obj: any = {};
    message.total !== undefined && (obj.total = Math.round(message.total));
    if (message.schemas) {
      obj.schemas = message.schemas.map((e) => e ? SchemaDto.toJSON(e) : undefined);
    } else {
      obj.schemas = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<SchemasDto>, I>>(object: I): SchemasDto {
    const message = createBaseSchemasDto();
    message.total = object.total ?? 0;
    message.schemas = object.schemas?.map((e) => SchemaDto.fromPartial(e)) || [];
    return message;
  },
};

function createBaseTemplateDto(): TemplateDto {
  return { version: 0, templateId: "", config: "" };
}

export const TemplateDto = {
  encode(message: TemplateDto, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.version !== 0) {
      writer.uint32(8).int32(message.version);
    }
    if (message.templateId !== "") {
      writer.uint32(18).string(message.templateId);
    }
    if (message.config !== "") {
      writer.uint32(26).string(message.config);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): TemplateDto {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTemplateDto();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.version = reader.int32();
          break;
        case 2:
          message.templateId = reader.string();
          break;
        case 3:
          message.config = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): TemplateDto {
    return {
      version: isSet(object.version) ? Number(object.version) : 0,
      templateId: isSet(object.templateId) ? String(object.templateId) : "",
      config: isSet(object.config) ? String(object.config) : "",
    };
  },

  toJSON(message: TemplateDto): unknown {
    const obj: any = {};
    message.version !== undefined && (obj.version = Math.round(message.version));
    message.templateId !== undefined && (obj.templateId = message.templateId);
    message.config !== undefined && (obj.config = message.config);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<TemplateDto>, I>>(object: I): TemplateDto {
    const message = createBaseTemplateDto();
    message.version = object.version ?? 0;
    message.templateId = object.templateId ?? "";
    message.config = object.config ?? "";
    return message;
  },
};

function createBaseTemplatesDto(): TemplatesDto {
  return { total: 0, templates: [] };
}

export const TemplatesDto = {
  encode(message: TemplatesDto, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.total !== 0) {
      writer.uint32(8).int32(message.total);
    }
    for (const v of message.templates) {
      TemplateDto.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): TemplatesDto {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTemplatesDto();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.total = reader.int32();
          break;
        case 2:
          message.templates.push(TemplateDto.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): TemplatesDto {
    return {
      total: isSet(object.total) ? Number(object.total) : 0,
      templates: Array.isArray(object?.templates) ? object.templates.map((e: any) => TemplateDto.fromJSON(e)) : [],
    };
  },

  toJSON(message: TemplatesDto): unknown {
    const obj: any = {};
    message.total !== undefined && (obj.total = Math.round(message.total));
    if (message.templates) {
      obj.templates = message.templates.map((e) => e ? TemplateDto.toJSON(e) : undefined);
    } else {
      obj.templates = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<TemplatesDto>, I>>(object: I): TemplatesDto {
    const message = createBaseTemplatesDto();
    message.total = object.total ?? 0;
    message.templates = object.templates?.map((e) => TemplateDto.fromPartial(e)) || [];
    return message;
  },
};

function createBaseOperationDto(): OperationDto {
  return { transactionId: "", mode: 0, config: "" };
}

export const OperationDto = {
  encode(message: OperationDto, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.transactionId !== "") {
      writer.uint32(10).string(message.transactionId);
    }
    if (message.mode !== 0) {
      writer.uint32(16).int32(message.mode);
    }
    if (message.config !== "") {
      writer.uint32(26).string(message.config);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): OperationDto {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseOperationDto();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.transactionId = reader.string();
          break;
        case 2:
          message.mode = reader.int32() as any;
          break;
        case 3:
          message.config = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): OperationDto {
    return {
      transactionId: isSet(object.transactionId) ? String(object.transactionId) : "",
      mode: isSet(object.mode) ? operationModesEnumFromJSON(object.mode) : 0,
      config: isSet(object.config) ? String(object.config) : "",
    };
  },

  toJSON(message: OperationDto): unknown {
    const obj: any = {};
    message.transactionId !== undefined && (obj.transactionId = message.transactionId);
    message.mode !== undefined && (obj.mode = operationModesEnumToJSON(message.mode));
    message.config !== undefined && (obj.config = message.config);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<OperationDto>, I>>(object: I): OperationDto {
    const message = createBaseOperationDto();
    message.transactionId = object.transactionId ?? "";
    message.mode = object.mode ?? 0;
    message.config = object.config ?? "";
    return message;
  },
};

function createBaseTransactionDto(): TransactionDto {
  return { transactionId: undefined, operations: [] };
}

export const TransactionDto = {
  encode(message: TransactionDto, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.transactionId !== undefined) {
      writer.uint32(10).string(message.transactionId);
    }
    for (const v of message.operations) {
      OperationDto.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): TransactionDto {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTransactionDto();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.transactionId = reader.string();
          break;
        case 2:
          message.operations.push(OperationDto.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): TransactionDto {
    return {
      transactionId: isSet(object.transactionId) ? String(object.transactionId) : undefined,
      operations: Array.isArray(object?.operations) ? object.operations.map((e: any) => OperationDto.fromJSON(e)) : [],
    };
  },

  toJSON(message: TransactionDto): unknown {
    const obj: any = {};
    message.transactionId !== undefined && (obj.transactionId = message.transactionId);
    if (message.operations) {
      obj.operations = message.operations.map((e) => e ? OperationDto.toJSON(e) : undefined);
    } else {
      obj.operations = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<TransactionDto>, I>>(object: I): TransactionDto {
    const message = createBaseTransactionDto();
    message.transactionId = object.transactionId ?? undefined;
    message.operations = object.operations?.map((e) => OperationDto.fromPartial(e)) || [];
    return message;
  },
};

function createBaseTransactionIdDto(): TransactionIdDto {
  return { transactionId: "" };
}

export const TransactionIdDto = {
  encode(message: TransactionIdDto, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.transactionId !== "") {
      writer.uint32(10).string(message.transactionId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): TransactionIdDto {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTransactionIdDto();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.transactionId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): TransactionIdDto {
    return { transactionId: isSet(object.transactionId) ? String(object.transactionId) : "" };
  },

  toJSON(message: TransactionIdDto): unknown {
    const obj: any = {};
    message.transactionId !== undefined && (obj.transactionId = message.transactionId);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<TransactionIdDto>, I>>(object: I): TransactionIdDto {
    const message = createBaseTransactionIdDto();
    message.transactionId = object.transactionId ?? "";
    return message;
  },
};

function createBaseTransactionCompleteDto(): TransactionCompleteDto {
  return { transactionId: "", isComplete: false };
}

export const TransactionCompleteDto = {
  encode(message: TransactionCompleteDto, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.transactionId !== "") {
      writer.uint32(10).string(message.transactionId);
    }
    if (message.isComplete === true) {
      writer.uint32(16).bool(message.isComplete);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): TransactionCompleteDto {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTransactionCompleteDto();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.transactionId = reader.string();
          break;
        case 2:
          message.isComplete = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): TransactionCompleteDto {
    return {
      transactionId: isSet(object.transactionId) ? String(object.transactionId) : "",
      isComplete: isSet(object.isComplete) ? Boolean(object.isComplete) : false,
    };
  },

  toJSON(message: TransactionCompleteDto): unknown {
    const obj: any = {};
    message.transactionId !== undefined && (obj.transactionId = message.transactionId);
    message.isComplete !== undefined && (obj.isComplete = message.isComplete);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<TransactionCompleteDto>, I>>(object: I): TransactionCompleteDto {
    const message = createBaseTransactionCompleteDto();
    message.transactionId = object.transactionId ?? "";
    message.isComplete = object.isComplete ?? false;
    return message;
  },
};

function createBaseModulesIdsDto(): ModulesIdsDto {
  return { ids: [] };
}

export const ModulesIdsDto = {
  encode(message: ModulesIdsDto, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.ids) {
      writer.uint32(10).string(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ModulesIdsDto {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseModulesIdsDto();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.ids.push(reader.string());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ModulesIdsDto {
    return { ids: Array.isArray(object?.ids) ? object.ids.map((e: any) => String(e)) : [] };
  },

  toJSON(message: ModulesIdsDto): unknown {
    const obj: any = {};
    if (message.ids) {
      obj.ids = message.ids.map((e) => e);
    } else {
      obj.ids = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ModulesIdsDto>, I>>(object: I): ModulesIdsDto {
    const message = createBaseModulesIdsDto();
    message.ids = object.ids?.map((e) => e) || [];
    return message;
  },
};

function createBaseModulesConfigsDto(): ModulesConfigsDto {
  return { total: 0, configs: [] };
}

export const ModulesConfigsDto = {
  encode(message: ModulesConfigsDto, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.total !== 0) {
      writer.uint32(8).int32(message.total);
    }
    for (const v of message.configs) {
      writer.uint32(18).string(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ModulesConfigsDto {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseModulesConfigsDto();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.total = reader.int32();
          break;
        case 2:
          message.configs.push(reader.string());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ModulesConfigsDto {
    return {
      total: isSet(object.total) ? Number(object.total) : 0,
      configs: Array.isArray(object?.configs) ? object.configs.map((e: any) => String(e)) : [],
    };
  },

  toJSON(message: ModulesConfigsDto): unknown {
    const obj: any = {};
    message.total !== undefined && (obj.total = Math.round(message.total));
    if (message.configs) {
      obj.configs = message.configs.map((e) => e);
    } else {
      obj.configs = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ModulesConfigsDto>, I>>(object: I): ModulesConfigsDto {
    const message = createBaseModulesConfigsDto();
    message.total = object.total ?? 0;
    message.configs = object.configs?.map((e) => e) || [];
    return message;
  },
};

export type IotOrchestratorServiceService = typeof IotOrchestratorServiceService;
export const IotOrchestratorServiceService = {
  getAllSchemas: {
    path: "/orchestration.IotOrchestratorService/getAllSchemas",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: Empty) => Buffer.from(Empty.encode(value).finish()),
    requestDeserialize: (value: Buffer) => Empty.decode(value),
    responseSerialize: (value: SchemasDto) => Buffer.from(SchemasDto.encode(value).finish()),
    responseDeserialize: (value: Buffer) => SchemasDto.decode(value),
  },
  getAllTemplates: {
    path: "/orchestration.IotOrchestratorService/getAllTemplates",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: Empty) => Buffer.from(Empty.encode(value).finish()),
    requestDeserialize: (value: Buffer) => Empty.decode(value),
    responseSerialize: (value: TemplatesDto) => Buffer.from(TemplatesDto.encode(value).finish()),
    responseDeserialize: (value: Buffer) => TemplatesDto.decode(value),
  },
  submitTransaction: {
    path: "/orchestration.IotOrchestratorService/submitTransaction",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: TransactionDto) => Buffer.from(TransactionDto.encode(value).finish()),
    requestDeserialize: (value: Buffer) => TransactionDto.decode(value),
    responseSerialize: (value: TransactionDto) => Buffer.from(TransactionDto.encode(value).finish()),
    responseDeserialize: (value: Buffer) => TransactionDto.decode(value),
  },
  checkIsTransactionComplete: {
    path: "/orchestration.IotOrchestratorService/checkIsTransactionComplete",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: TransactionIdDto) => Buffer.from(TransactionIdDto.encode(value).finish()),
    requestDeserialize: (value: Buffer) => TransactionIdDto.decode(value),
    responseSerialize: (value: TransactionCompleteDto) => Buffer.from(TransactionCompleteDto.encode(value).finish()),
    responseDeserialize: (value: Buffer) => TransactionCompleteDto.decode(value),
  },
  getModulesConfigsByIds: {
    path: "/orchestration.IotOrchestratorService/getModulesConfigsByIds",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: ModulesIdsDto) => Buffer.from(ModulesIdsDto.encode(value).finish()),
    requestDeserialize: (value: Buffer) => ModulesIdsDto.decode(value),
    responseSerialize: (value: ModulesConfigsDto) => Buffer.from(ModulesConfigsDto.encode(value).finish()),
    responseDeserialize: (value: Buffer) => ModulesConfigsDto.decode(value),
  },
} as const;

export interface IotOrchestratorServiceServer extends UntypedServiceImplementation {
  getAllSchemas: handleUnaryCall<Empty, SchemasDto>;
  getAllTemplates: handleUnaryCall<Empty, TemplatesDto>;
  submitTransaction: handleUnaryCall<TransactionDto, TransactionDto>;
  checkIsTransactionComplete: handleUnaryCall<TransactionIdDto, TransactionCompleteDto>;
  getModulesConfigsByIds: handleUnaryCall<ModulesIdsDto, ModulesConfigsDto>;
}

export interface IotOrchestratorServiceClient extends Client {
  getAllSchemas(request: Empty, callback: (error: ServiceError | null, response: SchemasDto) => void): ClientUnaryCall;
  getAllSchemas(
    request: Empty,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: SchemasDto) => void,
  ): ClientUnaryCall;
  getAllSchemas(
    request: Empty,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: SchemasDto) => void,
  ): ClientUnaryCall;
  getAllTemplates(
    request: Empty,
    callback: (error: ServiceError | null, response: TemplatesDto) => void,
  ): ClientUnaryCall;
  getAllTemplates(
    request: Empty,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: TemplatesDto) => void,
  ): ClientUnaryCall;
  getAllTemplates(
    request: Empty,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: TemplatesDto) => void,
  ): ClientUnaryCall;
  submitTransaction(
    request: TransactionDto,
    callback: (error: ServiceError | null, response: TransactionDto) => void,
  ): ClientUnaryCall;
  submitTransaction(
    request: TransactionDto,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: TransactionDto) => void,
  ): ClientUnaryCall;
  submitTransaction(
    request: TransactionDto,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: TransactionDto) => void,
  ): ClientUnaryCall;
  checkIsTransactionComplete(
    request: TransactionIdDto,
    callback: (error: ServiceError | null, response: TransactionCompleteDto) => void,
  ): ClientUnaryCall;
  checkIsTransactionComplete(
    request: TransactionIdDto,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: TransactionCompleteDto) => void,
  ): ClientUnaryCall;
  checkIsTransactionComplete(
    request: TransactionIdDto,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: TransactionCompleteDto) => void,
  ): ClientUnaryCall;
  getModulesConfigsByIds(
    request: ModulesIdsDto,
    callback: (error: ServiceError | null, response: ModulesConfigsDto) => void,
  ): ClientUnaryCall;
  getModulesConfigsByIds(
    request: ModulesIdsDto,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: ModulesConfigsDto) => void,
  ): ClientUnaryCall;
  getModulesConfigsByIds(
    request: ModulesIdsDto,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: ModulesConfigsDto) => void,
  ): ClientUnaryCall;
}

export const IotOrchestratorServiceClient = makeGenericClientConstructor(
  IotOrchestratorServiceService,
  "orchestration.IotOrchestratorService",
) as unknown as {
  new (
    address: string,
    credentials: ChannelCredentials,
    options?: Partial<ChannelOptions>,
  ): IotOrchestratorServiceClient;
  service: typeof IotOrchestratorServiceService;
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
