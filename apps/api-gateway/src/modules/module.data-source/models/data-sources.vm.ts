import {
  ApiModel,
  ApiModelProperty,
  SwaggerDefinitionConstant,
} from 'swagger-express-ts';
import { IDataSources } from '~iotcon-models';
import { DataSourceViewModel } from './data-source.vm';

@ApiModel({
  name: 'DataSourcesViewModel',
  description: 'Data Sources Model with total counter',
})
export class DataSourcesViewModel {
  @ApiModelProperty({
    description: 'number of dataSources',
    type: SwaggerDefinitionConstant.NUMBER,
    example: 10 as number,
    required: true,
  })
  public total: number;

  @ApiModelProperty({
    description: 'array of dataSources',
    type: SwaggerDefinitionConstant.ARRAY,
    model: 'DataSourceViewModel',
    required: true,
  })
  public dataSources: DataSourceViewModel[];

  constructor(dataSourcesData: IDataSources) {
    const { total, dataSources } = dataSourcesData;

    this.total = total;
    this.dataSources = dataSources.map(
      (dataSourceData) => new DataSourceViewModel(dataSourceData)
    );
  }
}
