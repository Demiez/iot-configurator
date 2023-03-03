import { IBaseVariable } from '../variable.interfaces';

export interface IMqttConnector {
  mqttTopic?: string;
}

export interface IMqttSettings {
  mqttTopic: string;
}

export interface IMqttInput {
  mqttTopic: string;
  variables: IBaseVariable[];
}
export interface IMqttOutput {
  mqttTopic: string;
  variables: IBaseVariable[];
}

export interface IMqttUniqueFieldQuery {
  mqttTopic: string;
  dataSourceId: string;
  databusKey?: string;
}
