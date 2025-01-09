// create-order.dto.ts
import { IsString, IsArray, IsNumber } from 'class-validator';

export class CreateOrderDto {
  @IsString()
  userId: string;

  @IsString()
  status: string;

  @IsArray()
  items: {
    menu_item_id: number;  // Menu item ID
    quantity: number;      // Quantity ordered
    total_price: number;   // Total price for the item
  }[];
}
