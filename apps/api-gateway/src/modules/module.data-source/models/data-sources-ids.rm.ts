import {
  ApiModel,
  ApiModelProperty,
  SwaggerDefinitionConstant,
} from 'swagger-express-ts';
import { IDataSourcesIds } from '~iotcon-models';

@ApiModel({
  name: 'DataSourcesIdsRequestModel',
  description: 'Ids of Data Sources',
})
export class DataSourcesIdsRequestModel {
  @ApiModelProperty({
    description: 'ids of dataSources (uuids)',
    type: SwaggerDefinitionConstant.ARRAY,
    itemType: SwaggerDefinitionConstant.STRING,
    example: [
      '00000000-1234-abcd-0000-000000000000',
      '00000000-1234-abcd-0000-000000000001',
    ] as string[],
    required: true,
  })
  public ids: string[];

  constructor(data: IDataSourcesIds) {
    this.ids = data.ids;
  }
}
