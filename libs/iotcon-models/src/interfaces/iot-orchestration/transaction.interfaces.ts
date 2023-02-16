import {
  ModulesConfigsDto,
  ModulesIdsDto,
  OperationDto,
  TransactionCompleteDto,
  TransactionDto,
} from '~iotcon-proto';
import { OperationModesEnum } from '../../enums';
import { IIdentifier } from '../core';

export interface IOperation extends IIdentifier, OperationDto {
  mode: OperationModesEnum;
}

export interface ITransaction extends TransactionDto {}

export interface ITransactionComplete extends TransactionCompleteDto {}

export interface IModulesIds extends ModulesIdsDto {}

export interface IModulesConfigs extends ModulesConfigsDto {}
