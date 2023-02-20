import { keys, pick } from 'lodash';
import {
  ApiModel,
  ApiModelProperty,
  SwaggerDefinitionConstant,
} from 'swagger-express-ts';
import { DataSourceTypesEnum, IIndicator } from '~iotcon-models';
import { IndicatorModuleRequestModel } from './indicator-module.rm';

@ApiModel({
  name: 'IndicatorViewModel',
  description:
    'Indicator View Model - includes data about sensor and publishers',
})
export class IndicatorViewModel implements IIndicator {
  @ApiModelProperty({
    description: 'id of indicator (uuid)',
    type: SwaggerDefinitionConstant.STRING,
    example: '00000000-1234-abcd-0000-000000000000' as string,
  })
  public id?: string;

  @ApiModelProperty({
    description: 'unique name of indicator',
    type: SwaggerDefinitionConstant.STRING,
    example: 'opcua indicator' as string,
    required: true,
  })
  public name: string;

  @ApiModelProperty({
    description: 'description of indicator',
    type: SwaggerDefinitionConstant.STRING,
    example: 'Indicator gathers data for dimensional positioning' as string,
  })
  public description: string;

  @ApiModelProperty({
    description: 'group of indicator',
    type: SwaggerDefinitionConstant.STRING,
    example: 'opcua-indicators' as string,
  })
  public group: string;

  @ApiModelProperty({
    description:
      'lowercase string values for tagging indicators to improve filtering',
    type: SwaggerDefinitionConstant.ARRAY,
    itemType: SwaggerDefinitionConstant.STRING,
    example: ['opcua', 'positioning'] as string[],
  })
  public tags: string[];

  @ApiModelProperty({
    description: 'type of dataSource',
    type: SwaggerDefinitionConstant.STRING,
    enum: Object.values(DataSourceTypesEnum),
    example: 'INSITE' as string,
    required: true,
  })
  public type: DataSourceTypesEnum;

  @ApiModelProperty({
    description:
      'identifies dataSource as primary, that will be selected automatically from available spectre',
    type: SwaggerDefinitionConstant.BOOLEAN,
    example: true as boolean,
    required: true,
  })
  public isPrimary: boolean;

  @ApiModelProperty({
    description: 'sensor module data',
    model: 'IndicatorModuleRequestModel',
    required: true,
  })
  public sensor: IndicatorModuleRequestModel;

  @ApiModelProperty({
    description:
      'array of publisher modules, empty value is allowed for default publishing only',
    type: SwaggerDefinitionConstant.ARRAY,
    model: 'IndicatorModuleRequestModel',
    required: true,
  })
  public publishers: IndicatorModuleRequestModel[];

  constructor(indicator: IIndicator) {
    const pickedBody = pick(indicator, keys(indicator));

    Object.assign(this, pickedBody);
  }
}
