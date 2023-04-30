export interface IInsiteUniqueFieldsQuery {
  record: string;
  descriptor: string;
  isWellBased: boolean;
  databusKey?: string;
  dataSourceId?: string;
}

export interface IMqttUniqueFieldQuery {
  mqttTopic: string;
  dataSourceId: string;
  databusKey?: string;
}
