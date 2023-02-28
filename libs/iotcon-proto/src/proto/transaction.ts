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
import { Empty } from "./google/protobuf/empty";
import { IndicatorDto } from "./indicator";

export type TransactionServiceService = typeof TransactionServiceService;
export const TransactionServiceService = {
  createTransaction: {
    path: "/transaction.TransactionService/createTransaction",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: IndicatorDto) => Buffer.from(IndicatorDto.encode(value).finish()),
    requestDeserialize: (value: Buffer) => IndicatorDto.decode(value),
    responseSerialize: (value: Empty) => Buffer.from(Empty.encode(value).finish()),
    responseDeserialize: (value: Buffer) => Empty.decode(value),
  },
} as const;

export interface TransactionServiceServer extends UntypedServiceImplementation {
  createTransaction: handleUnaryCall<IndicatorDto, Empty>;
}

export interface TransactionServiceClient extends Client {
  createTransaction(
    request: IndicatorDto,
    callback: (error: ServiceError | null, response: Empty) => void,
  ): ClientUnaryCall;
  createTransaction(
    request: IndicatorDto,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: Empty) => void,
  ): ClientUnaryCall;
  createTransaction(
    request: IndicatorDto,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: Empty) => void,
  ): ClientUnaryCall;
}

export const TransactionServiceClient = makeGenericClientConstructor(
  TransactionServiceService,
  "transaction.TransactionService",
) as unknown as {
  new (address: string, credentials: ChannelCredentials, options?: Partial<ChannelOptions>): TransactionServiceClient;
  service: typeof TransactionServiceService;
};
