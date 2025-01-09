import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MenuItem } from './menu_items.entity';
import { CreateMenuItemDto } from './dto/create_menu_item.dto';
import { Category } from '../category/category.entity';

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(MenuItem)
    private menuRepository: Repository<MenuItem>,

    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}
  async createMenuItem(createMenuItemDto: CreateMenuItemDto): Promise<MenuItem> {
    const { categoryId, ...menuData } = createMenuItemDto;

    const category = await this.categoryRepository.findOne({ where: { id: categoryId } });
    if (!category) {
      throw new NotFoundException(`Category with ID ${categoryId} not found`);
    }

    const menuItem = this.menuRepository.create({ ...menuData, category });
    return this.menuRepository.save(menuItem);
  }

  async getMenuItems(categoryId: number): Promise<MenuItem[]> {
    return this.menuRepository.find({
      where: {
        category: { id: categoryId }, // Query using the 'category' relation
      },
      relations: ['category'], // Make sure to load the 'category' relation
    });
  }

  async deleteMenuItem(id: number): Promise<{ message: string }> {
    const menuItem = await this.menuRepository.findOne({ where: { id } });
    if (!menuItem) {
      throw new NotFoundException(`Menu item with ID ${id} not found`);
    }
    await this.menuRepository.remove(menuItem);
    return { message: `Menu item with ID ${id} has been deleted` };
  }
  
  async updateMenuItem(
    id: number,
    updateMenuItemDto: Partial<CreateMenuItemDto>,
  ): Promise<MenuItem> {
    const menuItem = await this.menuRepository.findOne({
      where: { id },
      relations: ['category'],
    });
  
    if (!menuItem) {
      throw new NotFoundException(`Menu item with ID ${id} not found`);
    }
  
    if (updateMenuItemDto.categoryId) {
      const category = await this.categoryRepository.findOne({
        where: { id: updateMenuItemDto.categoryId },
      });
      if (!category) {
        throw new NotFoundException(`Category with ID ${updateMenuItemDto.categoryId} not found`);
      }
      menuItem.category = category;
    }
  
    Object.assign(menuItem, updateMenuItemDto);
    return this.menuRepository.save(menuItem);
  }
  
}
// INSERT INTO categories (name) VALUES ('Burgers'), ('Drinks'), ('Desserts');
