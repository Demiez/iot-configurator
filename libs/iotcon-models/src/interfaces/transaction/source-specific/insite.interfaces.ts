export interface IInsiteConnector {
  record?: string;
  descriptor?: string;
  isWellBased?: boolean;
}

export interface IInsiteUniqueFieldsQuery {
  record: string;
  descriptor: string;
  isWellBased: boolean;
  databusKey?: string;
  dataSourceId?: string;
}
