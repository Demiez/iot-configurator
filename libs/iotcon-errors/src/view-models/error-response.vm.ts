import {
  ApiModel,
  ApiModelProperty,
  SwaggerDefinitionConstant,
} from 'swagger-express-ts';

@ApiModel({
  name: 'ErrorViewModel',
  description: 'Basic error view model',
})
class ErrorViewModel {
  @ApiModelProperty({
    description: 'gRPC error code',
    type: SwaggerDefinitionConstant.NUMBER,
    example: 5 as number,
    required: true,
  })
  public code: number;

  @ApiModelProperty({
    description:
      'description details of error, can consist of errorCode + errorMessage, if emerged during rpc',
    type: SwaggerDefinitionConstant.STRING,
    example: 'RECORD_NOT_FOUND/Record not found' as string,
    required: true,
  })
  public details: string;

  @ApiModelProperty({
    description: 'time in string format, when error emerged',
    type: SwaggerDefinitionConstant.STRING,
    example: '22-01-2023 19:11:44' as string,
    required: true,
  })
  public timestamp: string;

  @ApiModelProperty({
    description: 'code of error',
    type: SwaggerDefinitionConstant.STRING,
    example: 'INVALID_INPUT_PARAMS' as string,
    required: true,
  })
  public errorCode: string;
}

@ApiModel({
  name: 'ErrorResponseViewModel',
  description: 'Basic representation error response',
})
export class ErrorResponseViewModel {
  @ApiModelProperty({
    description: 'Error data',
    model: 'ErrorViewModel',
    required: true,
  })
  public result: ErrorViewModel;

  @ApiModelProperty({
    description: 'error message',
    type: SwaggerDefinitionConstant.STRING,
    example: 'Record not found' as string,
    required: true,
  })
  public message: string;

  @ApiModelProperty({
    description: 'Http status code',
    type: SwaggerDefinitionConstant.NUMBER,
    example: 404 as number,
    required: true,
  })
  public code: number;
}
