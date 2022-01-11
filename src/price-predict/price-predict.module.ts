import { Module } from '@nestjs/common';
import { PricePredictController } from './price-predict.controller';
import { PricePredictService } from './price-predict.service';

@Module({
  controllers: [PricePredictController],
  providers: [PricePredictService],
})
export class PricePredictModule {}
