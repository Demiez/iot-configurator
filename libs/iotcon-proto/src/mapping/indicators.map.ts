import { IndicatorsDto } from '../proto/indicator';
import { mapIndicator } from './indicator.map';

export function mapIndicators(indicatorsDto: IndicatorsDto) {
  const { indicators } = indicatorsDto;

  indicators.forEach((indicator) => mapIndicator(indicator));
}
