import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Order } from '../orders/orders.entity';

@Entity('payments')
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Order, (order) => order.payment)
  order: Order;

  @Column('decimal', { precision: 10, scale: 2 })
  amount: number;

  @Column()
  payment_method: string;

  @Column()
  phoneNumber: number;

  @Column()
  status: string;
}
