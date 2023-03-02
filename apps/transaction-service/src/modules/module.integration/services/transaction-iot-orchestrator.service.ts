import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Client, ClientGrpc } from '@nestjs/microservices';
import { lastValueFrom, Observable } from 'rxjs';
import { ISchema, ISchemas, ITemplate, ITemplates } from '~iotcon-models';
import { Empty, RpcServicesEnum } from '~iotcon-proto';
import { handleRpcError } from '../../../core/errors/rpc-errors';
import { orchestrationGrpcOptions } from '../grpc-options';

interface IIotOrchestratorGrpcService {
  getAllSchemas(request: Empty): Observable<ISchemas>;
  getAllTemplates(request: Empty): Observable<ITemplates>;
}

@Injectable()
export class TransactionIotOrchestratorService implements OnModuleInit {
  @Client(orchestrationGrpcOptions) private readonly client: ClientGrpc;
  private iotOrchestratorClient: IIotOrchestratorGrpcService;

  constructor(private readonly logger: Logger) {}

  public onModuleInit(): void {
    this.iotOrchestratorClient =
      this.client.getService<IIotOrchestratorGrpcService>(
        RpcServicesEnum.IOT_ORCHESTRATOR_SERVICE,
      );
  }

  public async getAllSchemas(): Promise<ISchema[]> {
    try {
      const result$ = this.iotOrchestratorClient.getAllSchemas(null);

      const schemasResponse = await lastValueFrom(result$);

      return schemasResponse.schemas as ISchema[];
    } catch (error) {
      handleRpcError(error);
    }
  }

  public async getAllTemplates(): Promise<ITemplate[]> {
    try {
      const result$ = this.iotOrchestratorClient.getAllTemplates(null);

      const templatesResponse = await lastValueFrom(result$);

      return templatesResponse.templates as ITemplate[];
    } catch (error) {
      handleRpcError(error);
    }
  }
}
