import { keys, pick } from 'lodash';
import {
  ApiModel,
  ApiModelProperty,
  SwaggerDefinitionConstant,
} from 'swagger-express-ts';
import {
  DataSourceTypesBaseModel,
  DataSourceTypesEnum,
  IDataSource,
  InsiteLogLevelEnum,
  SecurityPolicyEnum,
} from '~iotcon-models';

@ApiModel({
  name: 'DataSourceRequestModel',
  description: 'Generic DataSource Model for DataSource creation',
})
export class DataSourceRequestModel extends DataSourceTypesBaseModel {
  @ApiModelProperty({
    description: 'id of dataSource (uuid)',
    type: SwaggerDefinitionConstant.STRING,
    example: '00000000-1234-abcd-0000-000000000000' as string,
    required: true,
  })
  public id: string = undefined;

  @ApiModelProperty({
    description: 'unique name of dataSource',
    type: SwaggerDefinitionConstant.STRING,
    example: 'Rmq DataSource' as string,
    required: true,
  })
  public name: string = undefined;

  @ApiModelProperty({
    description: 'port number',
    type: SwaggerDefinitionConstant.NUMBER,
    example: 7040 as number,
    required: true,
  })
  public port: number = undefined;

  @ApiModelProperty({
    description: 'type of dataSource',
    type: SwaggerDefinitionConstant.STRING,
    enum: Object.values(DataSourceTypesEnum),
    example: 'INSITE' as string,
    required: true,
  })
  public type: DataSourceTypesEnum = undefined;

  @ApiModelProperty({
    description: 'identifies dataSource as default',
    type: SwaggerDefinitionConstant.BOOLEAN,
    example: true as boolean,
    required: true,
  })
  public isDefault: boolean = undefined;

  @ApiModelProperty({
    description:
      'identifies dataSource as primary, that will be selected automatically from available spectre',
    type: SwaggerDefinitionConstant.BOOLEAN,
    example: true as boolean,
    required: true,
  })
  public isPrimary: boolean = undefined;

  @ApiModelProperty({
    description:
      'insite specific - server address for insite, can be provided as alias or as standard numerical ip label',
    type: SwaggerDefinitionConstant.STRING,
    example: '172.22.128.1' as string,
  })
  public insiteServerAddress?: string = undefined;

  @ApiModelProperty({
    description: 'insite specific - bridge id of insite dataSource (uuid)',
    type: SwaggerDefinitionConstant.STRING,
    example: '00000000-1234-abcd-0000-000000000000' as string,
  })
  public bridgeId?: string = undefined;

  @ApiModelProperty({
    description: 'insite specific - log level for performed insite operations',
    type: SwaggerDefinitionConstant.STRING,
    enum: Object.values(InsiteLogLevelEnum),
    example: 'INFO' as string,
  })
  public logLevel?: InsiteLogLevelEnum = undefined;

  @ApiModelProperty({
    description: 'mqtt specific - mqtt broker address for mqtt dataSource',
    type: SwaggerDefinitionConstant.STRING,
    example: 'iotcon.transport.mqtt:1883' as string,
  })
  public mqttServerAddress?: string = undefined;

  @ApiModelProperty({
    description: 'rmq specific - rmq broker address for rmq dataSource',
    type: SwaggerDefinitionConstant.STRING,
    example: 'amqp://guest:guest@rabbitmq:5672' as string,
  })
  public amqpServerAddress?: string = undefined;

  @ApiModelProperty({
    description: 'modbus specific - slave id (uuid)',
    type: SwaggerDefinitionConstant.STRING,
    example: '00000000-1234-abcd-0000-000000000000' as string,
  })
  public slaveId?: string = undefined;

  @ApiModelProperty({
    description: 'modbus specific - modbus ip address',
    type: SwaggerDefinitionConstant.STRING,
    example: '172.22.128.1' as string,
  })
  public modbusIpAddress?: string = undefined;

  @ApiModelProperty({
    description:
      'opcua specific - server address for opcua server, can use alias',
    type: SwaggerDefinitionConstant.STRING,
    example:
      'opc.tcp://opctest.iotcon.com:46233/DataSource/Monitoring' as string,
  })
  public opcuaServerAddress?: string = undefined;

  @ApiModelProperty({
    description:
      'opcua specific - domain address for opcua server, can use alias',
    type: SwaggerDefinitionConstant.STRING,
    example: 'opc.tcp://iotcon:4841' as string,
  })
  public domainName?: string = undefined;

  @ApiModelProperty({
    description:
      'opcua specific - message security mode, number directive from 1 - 5',
    type: SwaggerDefinitionConstant.NUMBER,
    example: 1 as number,
  })
  public messageSecurityMode?: number = undefined;

  @ApiModelProperty({
    description: 'opcua specific - security policy, which includes algorithm',
    type: SwaggerDefinitionConstant.STRING,
    example: 'BASIC128' as string,
  })
  public securityPolicy?: SecurityPolicyEnum = undefined;

  @ApiModelProperty({
    description: 'opcua specific - certificate data in string format',
    type: SwaggerDefinitionConstant.STRING,
    example: 'BASIC128' as string,
  })
  public certificate?: string = undefined;

  @ApiModelProperty({
    description: 'wits0 specific - major baud rate',
    type: SwaggerDefinitionConstant.NUMBER,
    example: 9600 as number,
  })
  public baudRate?: number = undefined;

  @ApiModelProperty({
    description: 'wits0 specific - number of data bits to be used',
    type: SwaggerDefinitionConstant.NUMBER,
    example: 7 as number,
  })
  public dataBits?: number = undefined;

  @ApiModelProperty({
    description: 'wits0 specific - number of stop bits to be used',
    type: SwaggerDefinitionConstant.NUMBER,
    example: 2 as number,
  })
  public stopBits?: number = undefined;

  @ApiModelProperty({
    description: 'wits0 specific - parity for wits0 server serial setup',
    type: SwaggerDefinitionConstant.NUMBER,
    example: 0 as number,
  })
  public parity?: number = undefined;

  @ApiModelProperty({
    description: 'wits0 specific - seconds number for read timeout',
    type: SwaggerDefinitionConstant.NUMBER,
    example: 1 as number,
  })
  public readTimeoutSeconds?: number = undefined;

  @ApiModelProperty({
    description: 'wits0 specific - interval number for heartbeat',
    type: SwaggerDefinitionConstant.NUMBER,
    example: 30 as number,
  })
  public heartBeatInterval?: number = undefined;

  @ApiModelProperty({
    description: 'wits0 specific - value of heartbeat',
    type: SwaggerDefinitionConstant.STRING,
    example: '&&\n0111-9999\n!!' as string,
  })
  public heartBeatValue?: string = undefined;

  @ApiModelProperty({
    description: 'wits0 specific - packet header data',
    type: SwaggerDefinitionConstant.STRING,
    example: '&&' as string,
  })
  public packetHeader?: string = undefined;

  @ApiModelProperty({
    description: 'wits0 specific - packet footer data',
    type: SwaggerDefinitionConstant.STRING,
    example: '!!' as string,
  })
  public packetFooter?: string = undefined;

  @ApiModelProperty({
    description: 'wits0 specific - line separator specific characters',
    type: SwaggerDefinitionConstant.STRING,
    example: '\r\n' as string,
  })
  public lineSeparator?: string = undefined;

  @ApiModelProperty({
    description: 'wits0 specific - raw data output',
    type: SwaggerDefinitionConstant.BOOLEAN,
    example: false as boolean,
  })
  public outputRaw?: boolean = undefined;

  constructor(body: IDataSource) {
    super();
    const pickedBody = pick(body, keys(body));

    Object.assign(this, pickedBody);
  }
}
