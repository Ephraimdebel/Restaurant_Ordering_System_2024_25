import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './category.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  // This method adds categories to the database
  async addCategories(): Promise<Category[]> {
    const categories = [
      { name: 'Burgers' },
      { name: 'Drinks' },
      { name: 'Desserts' },
      { name: 'Cakes' },  // Corrected the typo in 'cake'
    ];

    // Create new category entities and save them to the database
    const newCategories = this.categoryRepository.create(categories); // This maps each object to a Category entity
    return this.categoryRepository.save(newCategories); // Save the categories to the database
  }
}
