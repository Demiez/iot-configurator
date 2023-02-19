import { Injectable } from '@nestjs/common';

@Injectable()
export class RootService {
  public getRoot(): unknown {
    return {};
  }
}
