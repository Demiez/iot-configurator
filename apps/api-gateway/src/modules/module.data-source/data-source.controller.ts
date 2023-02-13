import { Service } from 'typedi';
import BaseController from '../../core/abstract/base-controller';
import {
  Controller,
  Delete,
  Get,
  GrpcBodyUpdate,
  Post,
} from '../../core/decorators';
import { Request, Response } from 'express';
import { APP_ROOT, UUID_REGEX } from '../../core/constants';
import { DataSourceService } from './data-source.service';
import { MetaContextEnum } from '~iotcon-models';
import { DataSourceRequestModel, DataSourcesIdsRequestModel } from './models';
import {
  ApiOperationDelete,
  ApiOperationGet,
  ApiOperationPost,
  ApiPath,
  SwaggerDefinitionConstant,
} from 'swagger-express-ts';

@ApiPath({
  description: 'DataSource controller',
  name: 'DataSource controller',
  path: `/data-sources`,
})
@Controller(`${APP_ROOT}/data-sources`)
@Service()
export class DataSourceController extends BaseController {
  constructor(private readonly dataSourceService: DataSourceService) {
    super();
  }

  @ApiOperationPost({
    path: '',
    summary: 'Creates DataSource in Iotcon System',
    parameters: {
      body: {
        required: true,
        model: 'DataSourceRequestModel',
      },
    },
    responses: {
      200: { model: 'DataSourceIdViewModel' },
      500: {
        description: `INTERNAL_SERVER_ERROR: ErrorResponseViewModel`,
        type: SwaggerDefinitionConstant.OBJECT,
      },
    },
    security: {
      basicAuth: [],
    },
  })
  @Post('')
  @GrpcBodyUpdate(MetaContextEnum.DATA_SOURCE_SERVICE)
  public async createDataSource(
    req: Request,
    res: Response
  ): Promise<Response<never>> {
    const requestModel = new DataSourceRequestModel(req.body);

    const result = await this.dataSourceService.createDataSource(requestModel);

    return super.sendSuccessResponse(res, result);
  }

  @ApiOperationGet({
    path: '',
    summary: 'Retrieves all available DataSources',
    responses: {
      200: { model: 'DataSourceViewModel' },
      500: {
        description: `INTERNAL_SERVER_ERROR: ErrorResponseViewModel`,
        type: SwaggerDefinitionConstant.OBJECT,
      },
    },
    security: {
      basicAuth: [],
    },
  })
  @Get('')
  public async getAllDataSources(
    req: Request,
    res: Response
  ): Promise<Response<never>> {
    const result = await this.dataSourceService.getAllDataSources();

    return super.sendSuccessResponse(res, result);
  }

  @ApiOperationGet({
    path: '/{id}',
    summary: 'Responds with info about dataSource by id',
    parameters: {
      path: {
        id: {
          name: 'id',
          allowEmptyValue: false,
          required: true,
          type: SwaggerDefinitionConstant.STRING,
          format: UUID_REGEX,
        },
      },
    },
    responses: {
      200: { model: 'DataSourceViewModel' },
      404: {
        description: `RECORD_NOT_FOUND: ErrorResponseViewModel`,
        type: SwaggerDefinitionConstant.OBJECT,
      },
      500: {
        description: `INTERNAL_SERVER_ERROR: ErrorResponseViewModel`,
        type: SwaggerDefinitionConstant.OBJECT,
      },
    },
    security: {
      basicAuth: [],
    },
  })
  @Get('/:id')
  public async getDataSourceById(
    req: Request,
    res: Response
  ): Promise<Response<never>> {
    const dataSourceId = req.params.id;

    const result = await this.dataSourceService.getDataSourceById(dataSourceId);

    return super.sendSuccessResponse(res, result);
  }

  @ApiOperationPost({
    path: '/ids',
    summary: 'Retrieves DataSources by Ids',
    parameters: {
      body: {
        required: true,
        model: 'DataSourcesIdsRequestModel',
      },
    },
    responses: {
      200: { model: 'DataSourcesViewModel' },
      500: {
        description: `INTERNAL_SERVER_ERROR: ErrorResponseViewModel`,
        type: SwaggerDefinitionConstant.OBJECT,
      },
    },
    security: {
      basicAuth: [],
    },
  })
  @Post('/ids')
  public async getDataSourcesByIds(
    req: Request,
    res: Response
  ): Promise<Response<never>> {
    const requestModel = new DataSourcesIdsRequestModel(req.body);

    const result = await this.dataSourceService.getDataSourcesByIds(
      requestModel
    );

    return super.sendSuccessResponse(res, result);
  }

  @ApiOperationDelete({
    path: '/all',
    summary: 'Deletes all dataSources',
    parameters: {},
    responses: {
      200: { description: 'Success', type: SwaggerDefinitionConstant.OBJECT },
      500: {
        description: `INTERNAL_SERVER_ERROR: ErrorResponseViewModel`,
        type: SwaggerDefinitionConstant.OBJECT,
      },
    },
    security: {
      basicAuth: [],
    },
  })
  @Delete('/all')
  public async deleteAllDataSources(
    req: Request,
    res: Response
  ): Promise<Response<never>> {
    const result = await this.dataSourceService.deleteAllDataSources();

    return super.sendSuccessResponse(res, result);
  }

  @ApiOperationDelete({
    path: '/{id}',
    summary: 'Deletes dataSource by id',
    parameters: {
      path: {
        id: {
          name: 'id',
          allowEmptyValue: false,
          required: true,
          type: SwaggerDefinitionConstant.STRING,
          format: UUID_REGEX,
        },
      },
    },
    responses: {
      200: { description: 'Success', type: SwaggerDefinitionConstant.OBJECT },
      500: {
        description: `INTERNAL_SERVER_ERROR: ErrorResponseViewModel`,
        type: SwaggerDefinitionConstant.OBJECT,
      },
    },
    security: {
      basicAuth: [],
    },
  })
  @Delete('/:id')
  public async deleteDataSourceById(
    req: Request,
    res: Response
  ): Promise<Response<never>> {
    const dataSourceId = req.params.id;

    const result = await this.dataSourceService.deleteDataSourceById(
      dataSourceId
    );

    return super.sendSuccessResponse(res, result);
  }
}
