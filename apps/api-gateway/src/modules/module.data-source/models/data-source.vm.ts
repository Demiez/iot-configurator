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
  SecurityPolicyEnum,
} from '~iotcon-models';

@ApiModel({
  name: 'DataSourceViewModel',
  description:
    'DataSource View Model - includes data about dataSource with type-specific information (for instance opcua specific)',
})
export class DataSourceViewModel extends DataSourceBaseModel {
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
  public insiteServerAddress?: string;

  @ApiModelProperty({
    description: 'insite specific - bridge id of insite dataSource (uuid)',
    type: SwaggerDefinitionConstant.STRING,
    example: '00000000-1234-abcd-0000-000000000000' as string,
  })
  public bridgeId?: string;

  @ApiModelProperty({
    description: 'insite specific - log level for performed insite operations',
    type: SwaggerDefinitionConstant.STRING,
    enum: Object.values(InsiteLogLevelEnum),
    example: 'INFO' as string,
  })
  public logLevel?: InsiteLogLevelEnum;

  @ApiModelProperty({
    description: 'mqtt specific - mqtt broker address for mqtt dataSource',
    type: SwaggerDefinitionConstant.STRING,
    example: 'iotcon.transport.mqtt:1883' as string,
  })
  public mqttServerAddress?: string;

  @ApiModelProperty({
    description: 'rmq specific - rmq broker address for rmq dataSource',
    type: SwaggerDefinitionConstant.STRING,
    example: 'amqp://guest:guest@rabbitmq:5672' as string,
  })
  public amqpServerAddress?: string;

  @ApiModelProperty({
    description: 'modbus specific - slave id (uuid)',
    type: SwaggerDefinitionConstant.STRING,
    example: '00000000-1234-abcd-0000-000000000000' as string,
  })
  public slaveId?: string;

  @ApiModelProperty({
    description: 'modbus specific - modbus ip address',
    type: SwaggerDefinitionConstant.STRING,
    example: '172.22.128.1' as string,
  })
  public modbusIpAddress?: string;

  @ApiModelProperty({
    description:
      'opcua specific - server address for opcua server, can use alias',
    type: SwaggerDefinitionConstant.STRING,
    example:
      'opc.tcp://opctest.iotcon.com:46233/DataSource/Monitoring' as string,
  })
  public opcuaServerAddress?: string;

  @ApiModelProperty({
    description:
      'opcua specific - domain address for opcua server, can use alias',
    type: SwaggerDefinitionConstant.STRING,
    example: 'opc.tcp://iotcon:4841' as string,
  })
  public domainName?: string;

  @ApiModelProperty({
    description:
      'opcua specific - message security mode, number directive from 1 - 5',
    type: SwaggerDefinitionConstant.NUMBER,
    example: 1 as number,
  })
  public messageSecurityMode?: number;

  @ApiModelProperty({
    description: 'opcua specific - security policy, which includes algorithm',
    type: SwaggerDefinitionConstant.STRING,
    example: 'BASIC128' as string,
  })
  public securityPolicy?: SecurityPolicyEnum;

  @ApiModelProperty({
    description: 'opcua specific - certificate data in string format',
    type: SwaggerDefinitionConstant.STRING,
    example: 'BASIC128' as string,
  })
  public certificate?: string;

  @ApiModelProperty({
    description: 'wits0 specific - major baud rate',
    type: SwaggerDefinitionConstant.NUMBER,
    example: 9600 as number,
  })
  public baudRate?: number;

  @ApiModelProperty({
    description: 'wits0 specific - number of data bits to be used',
    type: SwaggerDefinitionConstant.NUMBER,
    example: 7 as number,
  })
  public dataBits?: number;

  @ApiModelProperty({
    description: 'wits0 specific - number of stop bits to be used',
    type: SwaggerDefinitionConstant.NUMBER,
    example: 2 as number,
  })
  public stopBits?: number;

  @ApiModelProperty({
    description: 'wits0 specific - parity for wits0 server serial setup',
    type: SwaggerDefinitionConstant.NUMBER,
    example: 0 as number,
  })
  public parity?: number;

  @ApiModelProperty({
    description: 'wits0 specific - seconds number for read timeout',
    type: SwaggerDefinitionConstant.NUMBER,
    example: 1 as number,
  })
  public readTimeoutSeconds?: number;

  @ApiModelProperty({
    description: 'wits0 specific - interval number for heartbeat',
    type: SwaggerDefinitionConstant.NUMBER,
    example: 30 as number,
  })
  public heartBeatInterval?: number;

  @ApiModelProperty({
    description: 'wits0 specific - value of heartbeat',
    type: SwaggerDefinitionConstant.STRING,
    example: '&&\n0111-9999\n!!' as string,
  })
  public heartBeatValue?: string;

  @ApiModelProperty({
    description: 'wits0 specific - packet header data',
    type: SwaggerDefinitionConstant.STRING,
    example: '&&' as string,
  })
  public packetHeader?: string;

  @ApiModelProperty({
    description: 'wits0 specific - packet footer data',
    type: SwaggerDefinitionConstant.STRING,
    example: '!!' as string,
  })
  public packetFooter?: string;

  @ApiModelProperty({
    description: 'wits0 specific - line separator specific characters',
    type: SwaggerDefinitionConstant.STRING,
    example: '\r\n' as string,
  })
  public lineSeparator?: string;

  @ApiModelProperty({
    description: 'wits0 specific - raw data output',
    type: SwaggerDefinitionConstant.BOOLEAN,
    example: false as boolean,
  })
  public outputRaw?: boolean;

  constructor(dataSource: IDataSource) {
    super();
    const pickedBody = pick(dataSource, keys(this));

    Object.assign(this, pickedBody);

    switch (this.type) {
      case DataSourceTypesEnum.INSITE: {
        const { insiteServerAddress, bridgeId, logLevel } = dataSource;

        this.insiteServerAddress = insiteServerAddress;
        this.bridgeId = bridgeId;
        this.logLevel = logLevel;

        break;
      }
      case DataSourceTypesEnum.MQTT: {
        this.mqttServerAddress = dataSource.mqttServerAddress;

        break;
      }
      case DataSourceTypesEnum.RMQ: {
        this.amqpServerAddress = dataSource.amqpServerAddress;

        break;
      }
      case DataSourceTypesEnum.MODBUS: {
        const { slaveId, modbusIpAddress } = dataSource;

        this.slaveId = slaveId;
        this.modbusIpAddress = modbusIpAddress;

        break;
      }
      case DataSourceTypesEnum.OPCUA: {
        const {
          opcuaServerAddress,
          domainName,
          messageSecurityMode,
          securityPolicy,
          certificate,
        } = dataSource;

        this.opcuaServerAddress = opcuaServerAddress;
        this.domainName = domainName;
        this.messageSecurityMode = messageSecurityMode;
        this.securityPolicy = securityPolicy;
        this.certificate = certificate;

        break;
      }
      case DataSourceTypesEnum.WITS0: {
        const {
          baudRate,
          dataBits,
          stopBits,
          parity,
          readTimeoutSeconds,
          heartBeatInterval,
          heartBeatValue,
          packetHeader,
          packetFooter,
          lineSeparator,
          outputRaw,
        } = dataSource;

        this.baudRate = baudRate;
        this.dataBits = dataBits;
        this.stopBits = stopBits;
        this.parity = parity;
        this.readTimeoutSeconds = readTimeoutSeconds;
        this.heartBeatInterval = heartBeatInterval;
        this.heartBeatValue = heartBeatValue;
        this.packetHeader = packetHeader;
        this.packetFooter = packetFooter;
        this.lineSeparator = lineSeparator;
        this.outputRaw = !!outputRaw;

        break;
      }
    }
  }
}
