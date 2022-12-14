import { Service } from 'typedi';
import BaseController from '../../core/abstract/base-controller';
import { Controller, Get } from '../../core/decorators';
import { Request, Response } from 'express';
import { APP_ROOT } from '../../core/constants';
import { DataSourceService } from './data-source.service';

@Controller(`${APP_ROOT}/data-sources`)
@Service()
export class DataSourceController extends BaseController {
  constructor(private readonly dataSourceService: DataSourceService) {
    super();
  }

  @Get('')
  public async getDataSources(
    req: Request,
    res: Response
  ): Promise<Response<never>> {
    const result = await this.dataSourceService.getDataSources();

    return super.sendSuccessResponse(res, result);
  }
}
