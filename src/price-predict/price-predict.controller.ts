import { Body, Controller, Inject, Post } from '@nestjs/common';
import { PricePredictService } from './price-predict.service';

@Controller('price-predict')
export class PricePredictController {
  public constructor(
    @Inject(PricePredictService)
    private readonly pricePredictService: PricePredictService,
  ) {}

  @Post()
  public async pricePredictForBook(@Body() data: any): Promise<number> {
    return 1;
  }
}
