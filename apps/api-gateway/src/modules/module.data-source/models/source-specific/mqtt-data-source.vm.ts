import { keys, pick } from 'lodash';
import {
  ApiModel,
  ApiModelProperty,
  SwaggerDefinitionConstant,
} from 'swagger-express-ts';
import {
  DataSourceBaseModel,
  DataSourceTypesEnum,
  IDataSource,
} from '~iotcon-models';

@ApiModel({
  name: 'MqttDataSourceViewModel',
  description: 'Mqtt DataSource View Model',
})
export class MqttDataSourceViewModel extends DataSourceBaseModel {
  @ApiModelProperty({ type: SwaggerDefinitionConstant.STRING })
  public id: string = undefined;

  @ApiModelProperty({ type: SwaggerDefinitionConstant.STRING })
  public name: string = undefined;

  @ApiModelProperty({ type: SwaggerDefinitionConstant.NUMBER })
  public port: number = undefined;

  @ApiModelProperty({
    type: SwaggerDefinitionConstant.STRING,
    enum: Object.values(DataSourceTypesEnum),
  })
  public type: DataSourceTypesEnum = undefined;

  @ApiModelProperty({ type: SwaggerDefinitionConstant.BOOLEAN })
  public isDefault: boolean = undefined;

  @ApiModelProperty({ type: SwaggerDefinitionConstant.BOOLEAN })
  public isPrimary: boolean = undefined;

  @ApiModelProperty({ type: SwaggerDefinitionConstant.STRING })
  public mqttServerAddress: string = undefined;

  constructor(body: IDataSource) {
    super();
    const pickedBody = pick(body, keys(this));

    Object.assign(this, pickedBody);
  }
}
