import { TemplateDto, TemplatesDto } from '~iotcon-proto';
import { IIdentifier } from '../core';

export interface ITemplate extends IIdentifier, TemplateDto {}

export interface ITemplates extends TemplatesDto {}
