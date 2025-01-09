import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  UploadedFile,
  Get,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import { MenuService } from './menu.service';
import { CreateMenuItemDto } from './dto/create_menu_item.dto';
import { UpdateMenuItemDto } from './dto/update_menu_item.dto'; // Add a DTO for updating
import { FileInterceptor } from '@nestjs/platform-express';
import { multerConfig, fileFilter } from '../utils/multer.config';

@Controller('menu')
export class MenuController {
  constructor(private menuService: MenuService) {}

  @Post('create')
  @UseInterceptors(FileInterceptor('image', { storage: multerConfig.storage, fileFilter }))
  async createMenuItem(
    @Body() createMenuItemDto: CreateMenuItemDto,
    @UploadedFile() image: Express.Multer.File,
  ) {
    const imageUrl = `http://localhost:3000/uploads/${image.filename}`;
    return this.menuService.createMenuItem({ ...createMenuItemDto, imageUrl });
  }

  @Get(':id')
  async getMenuItems(@Param('id') id: number) {
    return this.menuService.getMenuItems(id);
  }

  @Delete(':id')
  async deleteMenuItem(@Param('id') id: number) {
    return this.menuService.deleteMenuItem(id);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('image', { storage: multerConfig.storage, fileFilter }))
  async updateMenuItem(
    @Param('id') id: number,
    @Body() updateMenuItemDto: UpdateMenuItemDto,
    @UploadedFile() image?: Express.Multer.File,
  ) {
    const imageUrl = image ? `http://localhost:3000/uploads/${image.filename}` : undefined;
    return this.menuService.updateMenuItem(id, { ...updateMenuItemDto, imageUrl });
  }
}
