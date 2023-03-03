export abstract class ConnectorBaseModel {
  public _id: string;
  public dataSourceId: string;
  public databusKey: string;

  constructor(id: string, dataSourceId: string, databusKey?: string) {
    this._id = id;
    this.dataSourceId = dataSourceId;
    this.databusKey = databusKey;
  }
}
