import { IDefaultRmqSettings, IMqttSettings } from '~iotcon-models';

export type JoinConnectionDefaultSettingsType = IMqttSettings &
  IDefaultRmqSettings;
