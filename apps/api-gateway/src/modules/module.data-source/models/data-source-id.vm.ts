import {
  ApiModel,
  ApiModelProperty,
  SwaggerDefinitionConstant,
} from 'swagger-express-ts';
import { IDataSourceId } from '~iotcon-models';

@ApiModel({
  name: 'DataSourceIdViewModel',
  description: 'Data Source Model with id only',
})
export class DataSourceIdViewModel {
  @ApiModelProperty({
    description: 'id of dataSource (uuid)',
    type: SwaggerDefinitionConstant.STRING,
    example: '00000000-1234-abcd-0000-000000000000' as string,
    required: true,
  })
  public id: string;

  constructor(data: IDataSourceId) {
    this.id = data.id;
  }
}
