import {
  ApiModel,
  ApiModelProperty,
  SwaggerDefinitionConstant,
} from 'swagger-express-ts';
import { BaseFieldErrorViewModel } from './base-field-error.vm';

@ApiModel({
  name: 'FieldIsBadModel',
  description: 'Generic model used for model fields validation',
})
export class FieldIsBadModel extends BaseFieldErrorViewModel {
  @ApiModelProperty({
    description: 'field name',
    type: SwaggerDefinitionConstant.STRING,
    example: 'dataSourceId' as string,
    required: true,
  })
  public field: string;

  @ApiModelProperty({
    description: 'code of error',
    type: SwaggerDefinitionConstant.STRING,
    example: 'INVALID_INPUT_PARAMS' as string,
    required: true,
  })
  public errorCode: string;

  @ApiModelProperty({
    description: 'message, which explains error',
    type: SwaggerDefinitionConstant.STRING,
    example: 'INVALID_INPUT_PARAMS' as string,
  })
  public message?: string;

  constructor(field: string, message?: string) {
    super();
    this.field = field;
    this.message = message;
  }
}
