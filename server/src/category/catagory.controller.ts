import { Controller, Get } from '@nestjs/common';
import { CategoriesService } from './category.service';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  // Create a GET endpoint to trigger addCategories
  @Get('add')
  async addCategories() {
    return this.categoriesService.addCategories(); // Call the service method to add categories
  }
}
