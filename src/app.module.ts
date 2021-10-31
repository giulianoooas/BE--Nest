import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarModule } from './car/car.module';
import { CategoryModule } from './category/category.module';
import { CommentModule } from './comment/comment.module';
import { Car } from './entities/car.entity';
import { Category } from './entities/category.entity';
import { CommentCar } from './entities/comment.entity';

@Module({
  imports: [
    CarModule,
    CategoryModule,
    CommentModule,
    TypeOrmModule.forFeature([Car, Category, CommentCar]),
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '1234',
      database: 'postgres',
      autoLoadEntities: true,
      synchronize: true,
      entities: ['dist/**/*.entity{.ts,.js}'],
    }),
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
