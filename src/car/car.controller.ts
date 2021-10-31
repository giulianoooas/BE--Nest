import { Controller, Get, Inject, Param } from '@nestjs/common';
import { Car } from 'src/entities/car.entity';
import { CarService } from './car.service';

@Controller('cars')
export class CarController {
  public constructor(@Inject() private readonly carService: CarService) {}

  @Get()
  async getAllCars(): Promise<Car[]> {
    return this.carService.getAllCars();
  }

  @Get(':carId')
  async getCarById(
    @Param('carId') carId: number,
  ): Promise<{ car: Car; categoryName: string }> {
    return this.carService.getCarById(carId);
  }

  @Get(':carId/exists')
  async existsCar(@Param('carId') carId: number): Promise<boolean> {
    return this.carService.existsCar(carId);
  }
}
