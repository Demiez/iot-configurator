import {
  DataSourceTypesEnum,
  IIndicatorModule,
  IndicatorModuleDataModel,
  IVariableModbusData,
  RmqExchangeTypesEnum,
  SubscriptionModesEnum,
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

  @ApiModelProperty({
    description: 'opcua specific - mode for subscription',
    type: SwaggerDefinitionConstant.STRING,
    enum: Object.values(SubscriptionModesEnum),
    example: 'POLLING' as string,
  })
  public subscriptionMode?: SubscriptionModesEnum;

  @ApiModelProperty({
    description: 'rmq specific - exchange name',
    type: SwaggerDefinitionConstant.STRING,
    example: 'iotcon.indicator.data' as string,
  })
  public exchangeName?: string;

  @ApiModelProperty({
    description: 'rmq specific - type of exchange for connector',
    type: SwaggerDefinitionConstant.STRING,
    enum: Object.values(RmqExchangeTypesEnum),
    example: 'direct' as string,
  })
  public exchangeType?: RmqExchangeTypesEnum;

  @ApiModelProperty({
    description: 'rmq specific - durable setting',
    type: SwaggerDefinitionConstant.BOOLEAN,
    example: true as boolean,
  })
  public exchangeDurable?: boolean;

  @ApiModelProperty({
    description: 'rmq specific - routing key title',
    type: SwaggerDefinitionConstant.STRING,
    example: 'indicator-data-rmq' as string,
  })
  public routingKey?: string;

  @ApiModelProperty({
    description: 'modbus specific - sample rate',
    type: SwaggerDefinitionConstant.NUMBER,
    example: 2000 as number,
  })
  public modbusSampleRate?: number;

  @ApiModelProperty({
    description: 'modbus specific - should data be read by blocks',
    type: SwaggerDefinitionConstant.BOOLEAN,
    example: true as boolean,
  })
  public modbusReadBlocksData?: boolean;

  @ApiModelProperty({
    description: 'modbus specific - modbus data for variable',
    model: 'VariableModbusDataViewModel',
  })
  public modbusData?: IVariableModbusData;

  @ApiModelProperty({
    description: 'wits0 specific - sample rate',
    type: SwaggerDefinitionConstant.NUMBER,
    example: 2000 as number,
  })
  public wits0SampleRate?: number;

  @ApiModelProperty({
    description: 'wits0 specific - direction',
    type: SwaggerDefinitionConstant.BOOLEAN,
    example: true as boolean,
  })
  public wits0Direction?: boolean;

  @ApiModelProperty({
    description:
      'wits0 specific - encoding for data positioning, servers instead of variableName with semicolon delimiter',
    type: SwaggerDefinitionConstant.STRING,
    example: 'record=1;item=1' as string,
  })
  public variableId?: string;

  constructor(body: IIndicatorModule) {
    super(body);
    const pickedBody = pick(body, keys(body));

    Object.assign(this, pickedBody);
  }
}
