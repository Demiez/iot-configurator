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

export interface DataSource {
  id?: string | undefined;
  authorId: string;
  title: string;
  content: string;
}

export interface DataSourceId {
  id: string;
}

function createBaseDataSource(): DataSource {
  return { id: undefined, authorId: "", title: "", content: "" };
}

export const DataSource = {
  encode(message: DataSource, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== undefined) {
      writer.uint32(10).string(message.id);
    }
    if (message.authorId !== "") {
      writer.uint32(18).string(message.authorId);
    }
    if (message.title !== "") {
      writer.uint32(26).string(message.title);
    }
    if (message.content !== "") {
      writer.uint32(34).string(message.content);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DataSource {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDataSource();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
          break;
        case 2:
          message.authorId = reader.string();
          break;
        case 3:
          message.title = reader.string();
          break;
        case 4:
          message.content = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): DataSource {
    return {
      id: isSet(object.id) ? String(object.id) : undefined,
      authorId: isSet(object.authorId) ? String(object.authorId) : "",
      title: isSet(object.title) ? String(object.title) : "",
      content: isSet(object.content) ? String(object.content) : "",
    };
  },

  toJSON(message: DataSource): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.authorId !== undefined && (obj.authorId = message.authorId);
    message.title !== undefined && (obj.title = message.title);
    message.content !== undefined && (obj.content = message.content);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<DataSource>, I>>(object: I): DataSource {
    const message = createBaseDataSource();
    message.id = object.id ?? undefined;
    message.authorId = object.authorId ?? "";
    message.title = object.title ?? "";
    message.content = object.content ?? "";
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
    requestSerialize: (value: DataSource) => Buffer.from(DataSource.encode(value).finish()),
    requestDeserialize: (value: Buffer) => DataSource.decode(value),
    responseSerialize: (value: DataSourceId) => Buffer.from(DataSourceId.encode(value).finish()),
    responseDeserialize: (value: Buffer) => DataSourceId.decode(value),
  },
} as const;

export interface DataSourceServiceServer extends UntypedServiceImplementation {
  createDataSource: handleUnaryCall<DataSource, DataSourceId>;
}

export interface DataSourceServiceClient extends Client {
  createDataSource(
    request: DataSource,
    callback: (error: ServiceError | null, response: DataSourceId) => void,
  ): ClientUnaryCall;
  createDataSource(
    request: DataSource,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: DataSourceId) => void,
  ): ClientUnaryCall;
  createDataSource(
    request: DataSource,
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
