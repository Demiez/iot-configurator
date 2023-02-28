import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {
  EndiansEnum,
  IVariableModbusData,
  RegisterTypesEnum,
  TypeValuesEnum,
} from '~iotcon-models';

@Schema({ _id: false })
class VariableModbusData implements IVariableModbusData {
  @Prop({ type: String, enum: RegisterTypesEnum, required: true })
  registerType: RegisterTypesEnum;
  @Prop({ type: String, enum: TypeValuesEnum, required: true })
  typeValue: TypeValuesEnum;
  @Prop({ type: String, enum: EndiansEnum, required: true })
  endian: EndiansEnum;
  @Prop({ type: Number, required: true })
  startAddress: number;
}

export const VariableModbusDataSchema =
  SchemaFactory.createForClass(VariableModbusData);
