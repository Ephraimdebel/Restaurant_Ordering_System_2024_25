import {
    Controller,
    Post,
    Body,
    UseInterceptors,
    UploadedFile,
    Get,
    Param,
  } from '@nestjs/common';
  import { MenuService } from './menu.service';
  import { CreateMenuItemDto } from './dto/create_menu_item.dto';
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
      // Add the image URL to the DTO
      const imageUrl = `http://localhost:3000/uploads/${image.filename}`;
      return this.menuService.createMenuItem({ ...createMenuItemDto, imageUrl });
    }
    @Get(':id')
    async getMenuItems(@Param('id') id: number) {
      return this.menuService.getMenuItems(id);
    }
  }
  