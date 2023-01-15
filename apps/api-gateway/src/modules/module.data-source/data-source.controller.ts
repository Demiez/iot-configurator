import { Service } from 'typedi';
import BaseController from '../../core/abstract/base-controller';
import { Controller, GrpcBodyUpdate, Post } from '../../core/decorators';
import { Request, Response } from 'express';
import { APP_ROOT } from '../../core/constants';
import { DataSourceService } from './data-source.service';
import { MetaContextEnum } from '~iotcon-models';

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
    const result = await this.dataSourceService.createDataSource(req.body);

    return super.sendSuccessResponse(res, result);
  }
}
