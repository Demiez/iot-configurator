import { Service } from 'typedi';
import BaseController from '../../core/abstract/base-controller';
import { APP_ROOT } from '../../core/constants';
import { Controller } from '../../core/decorators';
import { IndicatorService } from './indicator.service';

@Controller(`${APP_ROOT}/indicators`)
@Service()
export class DataSourceController extends BaseController {
  constructor(private readonly indicatorService: IndicatorService) {
    super();
  }
}
