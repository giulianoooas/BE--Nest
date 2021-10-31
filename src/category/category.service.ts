import { Injectable } from '@nestjs/common';
import { HttpErrorByCode } from '@nestjs/common/utils/http-error-by-code.util';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryDTO } from 'src/dto/category.dto';
import { Car } from 'src/entities/car.entity';
import { Category } from 'src/entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  public constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @InjectRepository(Car)
    private readonly carRepository: Repository<Car>,
  ) {}

  public async getAllCategories(): Promise<Category[]> {
    try {
      return await this.categoryRepository.find();
    } catch (error) {}
  }

  public async getAllCarOfCategory(categoryId: number): Promise<Car[]> {
    try {
      return await this.carRepository.find({
        where: {
          categoryId,
        },
      });
    } catch (error) {}
  }

  public async deleteCategory(categoryId: number): Promise<Category[]> {
    try {
      const category = await this.categoryRepository.findOne(categoryId);
      await this.categoryRepository.remove(category);
      return await this.categoryRepository.find();
    } catch (error) {}
  }

  public async createUpdateCategory(category: CategoryDTO): Promise<Category> {
    try {
      return await this.categoryRepository.save(category);
    } catch (error) {}
  }
}
