import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './orders.entity';
import { User } from '../users/users.entity';
import { CreateOrderDto } from './dto/create_order.dto';
import { UpdateOrderDto } from './dto/update_order.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
  ) {}

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    const order = this.ordersRepository.create(createOrderDto);
    return this.ordersRepository.save(order);
  }

  async findAll(): Promise<Order[]> {
    return this.ordersRepository.find();
  }

// order.service.ts
async update(id: number, updateOrderDto: UpdateOrderDto): Promise<Order> {
  const order = await this.ordersRepository.findOne({
    where: { id },
    relations: ['user'], // Ensure user relation is fetched
  });

  if (!order) {
    throw new NotFoundException(`Order with ID ${id} not found`);
  }

  // Update status
  if (updateOrderDto.status) {
    order.status = updateOrderDto.status;
  }

  // Update items
  if (updateOrderDto.items) {
    order.items = updateOrderDto.items;
  }

  // Update user
  if (updateOrderDto.userId) {
    const user = await this.ordersRepository.manager.findOne(User, {
      where: { user_id: updateOrderDto.userId },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${updateOrderDto.userId} not found`);
    }
    order.user = user;
  }

  return this.ordersRepository.save(order);
}


  async delete(orderId: number): Promise<{ message: string }> {
    const order = await this.ordersRepository.findOne({ where: { id: orderId } });

    if (!order) {
      throw new NotFoundException(`Order with ID ${orderId} not found`);
    }

    await this.ordersRepository.remove(order);
    return { message: `Order with ID ${orderId} has been deleted` };
  }
}
