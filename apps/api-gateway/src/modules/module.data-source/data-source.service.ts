import { Service } from 'typedi';

@Service()
export class DataSourceService {
  public async getDataSources() {
    await Promise.resolve([]);
  }
}
