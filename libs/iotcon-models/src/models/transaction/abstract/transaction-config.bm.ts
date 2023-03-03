import { ModuleTypesEnum } from '../../../enums';

export abstract class TransactionConfigBaseModel {
  public moduleType: ModuleTypesEnum;
  public moduleClass: string;
  public moduleConfig: string;
  public version: number;
  public databusKey: string;
  public sourceName: string;
  public isPrimary: boolean;

  public moduleId?: string;
  public moduleName?: string;
  public groupId?: string;
  public description?: string;
  public mqttServerAddress?: string;
}
