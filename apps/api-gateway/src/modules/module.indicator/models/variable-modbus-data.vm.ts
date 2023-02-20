import {
  ApiModel,
  ApiModelProperty,
  SwaggerDefinitionConstant,
} from 'swagger-express-ts';
import {
  EndiansEnum,
  IVariableModbusData,
  RegisterTypesEnum,
  TypeValuesEnum,
} from '~iotcon-models';

@ApiModel({
  name: 'VariableModbusDataViewModel',
  description: 'Model for modbus data representation for variable',
})
export class VariableModbusDataViewModel implements IVariableModbusData {
  @ApiModelProperty({
    description: 'register type of modbus data',
    type: SwaggerDefinitionConstant.STRING,
    enum: Object.values(RegisterTypesEnum),
    example: 'COILS' as string,
    required: true,
  })
  registerType: RegisterTypesEnum;

  @ApiModelProperty({
    description: 'value type of modbus data accepted by system',
    type: SwaggerDefinitionConstant.STRING,
    enum: Object.values(TypeValuesEnum),
    example: 'INT32' as string,
    required: true,
  })
  typeValue: TypeValuesEnum;

  @ApiModelProperty({
    description: 'endian variant for modbus data',
    type: SwaggerDefinitionConstant.STRING,
    enum: Object.values(EndiansEnum),
    example: 'BIG' as string,
    required: true,
  })
  endian: EndiansEnum;

  @ApiModelProperty({
    description: 'start address for data',
    type: SwaggerDefinitionConstant.NUMBER,
    example: 1 as number,
    required: true,
  })
  startAddress: number;
}
