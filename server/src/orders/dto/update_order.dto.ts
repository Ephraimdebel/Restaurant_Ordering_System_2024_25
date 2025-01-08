// update_order.dto.ts
import { IsOptional, IsString, IsArray, IsEnum } from 'class-validator';

export class UpdateOrderDto {
  @IsOptional()
  @IsString()
  @IsEnum(['Pending', 'Preparing', 'Delivered', 'Cancelled'])
  status?: string;

  @IsOptional()
  @IsArray()
  items?: {
    menu_item_id: number;
    name: string;
    description: string;
    price: number;
    quantity: number;
    total_price: number;
  }[];

  @IsOptional()
  userId?: number; // User ID is optional
}
