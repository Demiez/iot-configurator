import {
  DataSourceTypesEnum,
  IIndicatorModule,
  IndicatorModuleDataModel,
} from '~iotcon-models';
import { keys, pick } from 'lodash';
import {
  ApiModel,
  ApiModelProperty,
  SwaggerDefinitionConstant,
} from 'swagger-express-ts';

@ApiModel({
  name: 'IndicatorModuleRequestModel',
  description: 'Model for Indicator sensor or publisher module',
})
export class IndicatorModuleRequestModel extends IndicatorModuleDataModel {
  @ApiModelProperty({
    description: 'id of indicator module (uuid)',
    type: SwaggerDefinitionConstant.STRING,
    example: '00000000-1234-abcd-0000-000000000000' as string,
  })
  public id?: string;

  @ApiModelProperty({
    description: 'id of dataSource (uuid)',
    type: SwaggerDefinitionConstant.STRING,
    example: '00000000-1234-abcd-0000-000000000000' as string,
    required: true,
  })
  public dataSourceId: string;

  @ApiModelProperty({
    description: 'name of connector variable to be linked to indicator',
    type: SwaggerDefinitionConstant.STRING,
    example: 'Position' as string,
    required: true,
  })
  public variableName: string;

  @ApiModelProperty({
    description: 'Unit of Measurement (only UOM_unitless available)',
    type: SwaggerDefinitionConstant.STRING,
    example: 'UOM_unitless' as string,
    required: true,
  })
  public uom: string = undefined;

  @ApiModelProperty({
    description: 'Unit of Class (only UOC_none available)',
    type: SwaggerDefinitionConstant.STRING,
    example: 'UOC_none' as string,
    required: true,
  })
  public uoc: string = undefined;

  @ApiModelProperty({
    description: 'declaration for primary module',
    type: SwaggerDefinitionConstant.BOOLEAN,
    example: false as boolean,
  })
  public isPrimary?: boolean = undefined;

  @ApiModelProperty({
    description: 'dataSource type for primary module',
    type: SwaggerDefinitionConstant.STRING,
    enum: Object.values(DataSourceTypesEnum),
    example: 'MQTT' as string,
  })
  public dataSourceType?: DataSourceTypesEnum = undefined;

  // connector specific fields
  @ApiModelProperty({
    description: 'mqtt specific - mqtt topic',
    type: SwaggerDefinitionConstant.STRING,
    example: 'Iotcon/Indicators' as string,
  })
  public mqttTopic?: string;

  @ApiModelProperty({
    description: 'insite specific - record name',
    type: SwaggerDefinitionConstant.STRING,
    example: 'iotcon_record' as string,
  })
  public record?: string;

  @ApiModelProperty({
    description: 'insite specific - descriptor name',
    type: SwaggerDefinitionConstant.STRING,
    example: 'iotcon_descriptor' as string,
  })
  public descriptor?: string;

  @ApiModelProperty({
    description: 'insite specific - well based boolean info',
    type: SwaggerDefinitionConstant.STRING,
    example: true as boolean,
  })
  public isWellBased?: boolean;

  constructor(body: IIndicatorModule) {
    super(body);
    const pickedBody = pick(body, keys(body));

    Object.assign(this, pickedBody);
  }
}
