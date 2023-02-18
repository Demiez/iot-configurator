import { Metadata, ServerUnaryCall } from '@grpc/grpc-js';
import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import {
  ISchemas,
  ITemplates,
  ModuleSchemasDataModel,
  ModuleTemplatesDataModel,
} from '~iotcon-models';
import {
  RpcServicesEnum,
  Empty,
  IotOrchestratorRpcNamesEnum,
} from '~iotcon-proto';
import { SchemaTemplateService } from './schema-template.service';

@Controller()
export class SchemaTemplateController {
  constructor(private readonly schemaTemplateService: SchemaTemplateService) {}

  @GrpcMethod(
    RpcServicesEnum.IOT_ORCHESTRATOR_SERVICE,
    IotOrchestratorRpcNamesEnum.GET_ALL_SCHEMAS,
  )
  public async getAllModuleSchemas(
    _request: Empty,
    _metadata: Metadata,
    _call: ServerUnaryCall<Empty, ISchemas>,
  ): Promise<ModuleSchemasDataModel> {
    const result = await this.schemaTemplateService.getAllModuleSchemas();

    return result;
  }

  @GrpcMethod(
    RpcServicesEnum.IOT_ORCHESTRATOR_SERVICE,
    IotOrchestratorRpcNamesEnum.GET_ALL_TEMPLATES,
  )
  public async getAllModuleTemplates(
    _request: Empty,
    _metadata: Metadata,
    _call: ServerUnaryCall<Empty, ITemplates>,
  ): Promise<ModuleTemplatesDataModel> {
    const result = await this.schemaTemplateService.getAllModuleTemplates();

    return result;
  }
}
