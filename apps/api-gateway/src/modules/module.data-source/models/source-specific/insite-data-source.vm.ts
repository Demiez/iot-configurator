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
  InsiteLogLevelEnum,
} from '~iotcon-models';

@ApiModel({
  name: 'InsiteDataSourceViewModel',
  description: 'Insite DataSource View Model',
})
export class InsiteDataSourceViewModel extends DataSourceBaseModel {
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
  public insiteServerAddress: string = undefined;

  @ApiModelProperty({ type: SwaggerDefinitionConstant.STRING })
  public bridgeId: string = undefined;

  @ApiModelProperty({
    type: SwaggerDefinitionConstant.STRING,
    enum: Object.values(InsiteLogLevelEnum),
  })
  public logLevel: InsiteLogLevelEnum = undefined;

  constructor(body: IDataSource) {
    super();
    const pickedBody = pick(body, keys(this));

    Object.assign(this, pickedBody);
  }
}
