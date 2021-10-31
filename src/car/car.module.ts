import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Car } from 'src/entities/car.entity';
import { Category } from 'src/entities/category.entity';
import { CarController } from './car.controller';
import { CarService } from './car.service';

@Module({
  imports: [TypeOrmModule.forFeature([Car, Category])],
  controllers: [CarController],
  providers: [CarService],
})
export class CarModule {}
