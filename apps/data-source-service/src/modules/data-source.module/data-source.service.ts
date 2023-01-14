import { Injectable } from '@nestjs/common';

@Injectable()
export class DataSourceService {
  public async createDataSource(): Promise<string> {
    return 'Hello World!';
  }
}
