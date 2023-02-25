import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Indicator, IndicatorDocument } from '../../module.db/schemas';

@Injectable()
export class IndicatorRepository {
  constructor(
    @InjectModel(Indicator.name)
    private indicatorModel: Model<IndicatorDocument>,
  ) {}

  public async checkIfIndicatorExistsByName(name: string): Promise<boolean> {
    const indicator = await this.indicatorModel
      .findOne({
        name,
      })
      .collation({ locale: 'en', strength: 2 });

    return !!indicator;
  }
}
