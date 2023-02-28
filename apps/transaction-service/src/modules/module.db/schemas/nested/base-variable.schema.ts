import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IBaseVariable, IVariableModbusData } from '~iotcon-models';
import { VariableModbusDataSchema } from './variable-modbus-data.schema';

@Schema({ _id: false })
class BaseVariable implements IBaseVariable {
  @Prop({ type: String })
  indicatorKey?: string;
  @Prop({ type: String })
  variableName?: string;
  @Prop({ type: String })
  uom?: string;
  @Prop({ type: String })
  uoc?: string;
  @Prop({ type: VariableModbusDataSchema })
  modbusData?: IVariableModbusData;
  @Prop({ type: String })
  variableId?: string;
}

export const BaseVariableSchema = SchemaFactory.createForClass(BaseVariable);
