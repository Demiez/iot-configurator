import { SchemaDto, SchemasDto } from '~iotcon-proto';
import { ModuleTypesEnum } from '../../enums';
import { IIdentifier } from '../core';

export interface ISchema extends IIdentifier, SchemaDto {
  type: ModuleTypesEnum;
}

export interface ISchemas extends SchemasDto {}
