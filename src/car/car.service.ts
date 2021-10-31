import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CarDTO } from 'src/dto/car.dto';
import { Car } from 'src/entities/car.entity';
import { Category } from 'src/entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CarService {
  public constructor(
    @InjectRepository(Car) private readonly carRepository: Repository<Car>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  public async getAllCars(): Promise<Car[]> {
    return await this.carRepository.find();
  }

  public async getCarById(
    carId: number,
  ): Promise<{ car: Car; categoryName: string }> {
    const car = await this.carRepository.findOne(carId);
    const categoryName = (await this.categoryRepository.findOne(car.categoryId))
      .name;
    return {
      car,
      categoryName,
    };
  }

  public async existsCar(carId: number): Promise<boolean> {
    return !!(await this.carRepository.findOne(carId));
  }

  public async getCategoryName(carId: number): Promise<string> {
    const car = await this.carRepository.findOne(carId);
    return (await this.categoryRepository.findOne(car.categoryId)).name;
  }

  public async deleteCar(carId: number): Promise<void> {
    const car = await this.carRepository.findOne(carId);
    await this.carRepository.delete(car);
  }

  public async createUpdateCar(car: CarDTO): Promise<Car> {
    return await this.carRepository.save(car);
  }
}
