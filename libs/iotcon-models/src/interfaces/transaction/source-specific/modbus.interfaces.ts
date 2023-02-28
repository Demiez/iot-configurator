export interface IModbusConnector {
  modbusSampleRate?: number;
  modbusReadBlocksData?: boolean;
}

export interface IModbusUniqueFieldQuery {
  dataSourceId: string;
  modbusSampleRate?: number;
  modbusReadBlocksData?: boolean;
  databusKey?: string;
}
