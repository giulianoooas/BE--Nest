import { Injectable } from '@nestjs/common';
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

  public async getAllCategory(): Promise<Category[]> {
    return await this.categoryRepository.find();
  }

  public async getAllCarOfCategory(categoryId: number): Promise<Car[]> {
    return await this.carRepository.find({
      where: {
        categoryId,
      },
    });
  }

  public async deleteCategory(categoryId: number): Promise<Category[]> {
    const category = await this.categoryRepository.findOne(categoryId);
    await this.categoryRepository.remove(category);
    return await this.categoryRepository.find();
  }

  public async createUpdateCategory(category: CategoryDTO): Promise<Category> {
    return await this.categoryRepository.save(category);
  }
}
