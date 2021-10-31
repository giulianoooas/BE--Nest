import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CarDTO } from 'src/dto/car.dto';
import { Car } from 'src/entities/car.entity';
import { CarService } from './car.service';

@Controller('cars')
export class CarController {
  public constructor(
    @Inject(CarService) private readonly carService: CarService,
  ) {}

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

  @Delete(':carId')
  async deleteCar(@Param('carId') carId: number): Promise<void> {
    return this.carService.deleteCar(carId);
  }

  @Get(':carId/category-name')
  async categoryName(@Param('carId') carId: number): Promise<string> {
    return this.carService.getCategoryName(carId);
  }

  @Post()
  async createCar(@Body() car: CarDTO): Promise<Car> {
    return this.carService.createUpdateCar(car);
  }

  @Put(':carId/edit')
  async updateCar(
    @Body() car: CarDTO,
    @Param('carId') carId: number,
  ): Promise<Car> {
    return this.carService.createUpdateCar(car);
  }
}
