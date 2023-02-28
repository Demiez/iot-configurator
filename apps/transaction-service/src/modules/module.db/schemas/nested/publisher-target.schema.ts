import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { DataSourceTypesEnum, IPublisherTarget } from '~iotcon-models';

@Schema({ _id: false })
class PublisherTarget implements IPublisherTarget {
  @Prop({ type: String, required: true })
  publisherId: string;
  @Prop({ type: String, enum: DataSourceTypesEnum, required: true })
  type: DataSourceTypesEnum;
}

export const PublisherTargetSchema =
  SchemaFactory.createForClass(PublisherTarget);
