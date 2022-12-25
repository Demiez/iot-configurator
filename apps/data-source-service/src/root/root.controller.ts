import { Controller, Get } from '@nestjs/common';
import { RootService } from './root.service';

@Controller(`/api/v1/data-sources`)
export class RootController {
  constructor(private readonly rootService: RootService) {}

  @Get('/root')
  getUsers(): unknown {
    return this.rootService.getRoot();
  }
}
