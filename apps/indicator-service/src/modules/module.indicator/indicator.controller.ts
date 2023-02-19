import { Metadata, ServerUnaryCall } from '@grpc/grpc-js';
import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { IIndicator } from '~iotcon-models';
import { RpcServicesEnum, Empty, IndicatorRpcNamesEnum } from '~iotcon-proto';
import { IndicatorService } from './indicator.service';

@Controller()
export class IndicatorController {
  constructor(private readonly indicatorService: IndicatorService) {}

  @GrpcMethod(
    RpcServicesEnum.INDICATOR_SERVICE,
    IndicatorRpcNamesEnum.CREATE_INDICATOR,
  )
  public async createIndicator(
    _request: IIndicator,
    _metadata: Metadata,
    _call: ServerUnaryCall<Empty, IIndicator>,
  ): Promise<void> {
    console.log('Not implemented');
  }
}
