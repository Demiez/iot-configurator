import { SchemaDto, SchemasDto } from '~iotcon-proto';
import { IIdentifier } from '../core';

export interface ISchema extends IIdentifier, SchemaDto {}

export interface ISchemas extends SchemasDto {}
