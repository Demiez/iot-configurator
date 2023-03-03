import { IWits0Variable } from '../variable.interfaces';

export interface IWits0Subscription {
  sampleRate: number;
  direction: boolean;
  variables: IWits0Variable[];
}

export interface IWits0UniqueFieldQuery {
  dataSourceId: string;
  wits0SampleRate?: number;
  wits0Direction?: boolean;
  databusKey?: string;
}

export interface IWits0Connector {
  wits0SampleRate?: number;
  wits0Direction?: boolean;
}
