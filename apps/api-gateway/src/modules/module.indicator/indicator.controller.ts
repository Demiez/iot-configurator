import {
  ApiOperationPost,
  ApiPath,
  SwaggerDefinitionConstant,
} from 'swagger-express-ts';
import { Request, Response } from 'express';
import { Service } from 'typedi';
import { MetaContextEnum } from '~iotcon-models';
import BaseController from '../../core/abstract/base-controller';
import { APP_ROOT } from '../../core/constants';
import { Controller, GrpcBodyUpdate, Post } from '../../core/decorators';
import { IndicatorService } from './indicator.service';
import { IndicatorRequestModel, IndicatorViewModel } from './models';

@ApiPath({
  description: 'Indicator controller',
  name: 'Indicator controller',
  path: `/indicators`,
})
@Controller(`${APP_ROOT}/indicators`)
@Service()
export class IndicatorController extends BaseController {
  constructor(private readonly indicatorService: IndicatorService) {
    super();
  }

  @ApiOperationPost({
    path: '',
    summary: 'Creates Indicator in Iotcon System',
    parameters: {
      body: {
        required: true,
        model: 'IndicatorRequestModel',
      },
    },
    responses: {
      200: { model: 'IndicatorViewModel' },
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
  @GrpcBodyUpdate(MetaContextEnum.INDICATOR_SERVICE)
  public async createIndicator(
    req: Request,
    res: Response
  ): Promise<Response<IndicatorViewModel>> {
    const requestModel = new IndicatorRequestModel(req.body);

    const result = await this.indicatorService.createIndicator(requestModel);

    return super.sendSuccessResponse(res, result);
  }
}
