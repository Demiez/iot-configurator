import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  PublisherDocument,
  Sensor,
  SensorDocument,
} from '../../module.db/schemas';
import { IInsiteUniqueFieldsQuery, IMqttUniqueFieldQuery } from '../interfaces';

@Injectable()
export class TransactionRepository {
  constructor(
    @InjectModel(Sensor.name)
    private SensorModel: Model<SensorDocument>,
    @InjectModel(Sensor.name)
    private PublisherModel: Model<PublisherDocument>,
  ) {}

  public async getInsiteConnectorByUniqueFields<T>(
    dataSourceId: string,
    record: string,
    descriptor: string,
    isWellBased: boolean,
    isSensor: boolean = true,
    databusKey?: string,
  ): Promise<T> {
    const searchQuery: IInsiteUniqueFieldsQuery = {
      record,
      descriptor,
      isWellBased,
      dataSourceId,
    };

    if (databusKey) {
      searchQuery.databusKey = databusKey;
    }

    if (isSensor) {
      return (await this.SensorModel.findOne(searchQuery)) as unknown as T;
    } else {
      return (await this.PublisherModel.findOne(searchQuery)) as unknown as T;
    }
  }

  public async getMqttConnectorByUniqueFields<T>(
    dataSourceId: string,
    mqttTopic: string,
    isSensor: boolean = true,
    databusKey?: string,
  ): Promise<T> {
    const searchQuery: IMqttUniqueFieldQuery = {
      mqttTopic,
      dataSourceId,
    };

    if (databusKey) {
      searchQuery.databusKey = databusKey;
    }

    if (isSensor) {
      return (await this.SensorModel.findOne(searchQuery)) as unknown as T;
    } else {
      return (await this.PublisherModel.findOne(searchQuery)) as unknown as T;
    }
  }
}
