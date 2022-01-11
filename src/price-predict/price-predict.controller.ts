import { Controller, Get, Inject, Post } from '@nestjs/common';
import { PricePredictService } from './price-predict.service';

@Controller('price-predict')
export class PricePredictController {
  public constructor(
    @Inject(PricePredictService)
    private readonly pricePredictService: PricePredictService,
  ) {}

  @Post()
  public async pricePredictForBook(): Promise<number> {
    return 1;
  }
}
