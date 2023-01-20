import { Service } from 'typedi';
import BaseController from '../../core/abstract/base-controller';
import { Controller, Get, GrpcBodyUpdate, Post } from '../../core/decorators';
import { Request, Response } from 'express';
import { APP_ROOT } from '../../core/constants';
import { DataSourceService } from './data-source.service';
import { MetaContextEnum } from '~iotcon-models';
import { DataSourceRequestModel } from './models';

@Controller(`${APP_ROOT}/data-sources`)
@Service()
export class DataSourceController extends BaseController {
  constructor(private readonly dataSourceService: DataSourceService) {
    super();
  }

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

  @Get('/:id')
  public async getDataSourceById(
    req: Request,
    res: Response
  ): Promise<Response<never>> {
    const dataSourceId = req.params.id;

    const result = await this.dataSourceService.getDataSourceById(dataSourceId);

    return super.sendSuccessResponse(res, result);
  }
}
