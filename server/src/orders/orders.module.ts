import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './orders.entity';
// import { OrderItem } from './order_items.entity';
import { Payment } from '../payments/payment.entity'; // Assuming Payment entity is already defined
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { User } from '../users/users.entity';
import { MenuItem } from '../menu/menu_items.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order, User, MenuItem, Payment])],
  providers: [OrderService],
  controllers: [OrderController],
})
export class OrdersModule {}
