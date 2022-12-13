import { Metadata, ServerUnaryCall } from '@grpc/grpc-js';
import { Controller, Get } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @GrpcMethod('DataSourceService', 'CreateDataSource')
  createDataSource(
    data: { id: string },
    metadata: Metadata,
    call: ServerUnaryCall<any, any>,
  ): void {
    console.log(data.id);
  }
}
