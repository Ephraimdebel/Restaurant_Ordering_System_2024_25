import { Module } from '@nestjs/common';
import { CategoriesService } from './category.service';
import { CategoriesController } from './catagory.controller'; // If you have a controller
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Category])], // Import Category entity here
  providers: [CategoriesService],
  controllers: [CategoriesController], // Add controller if you have it
})
export class CategoriesModule {}
