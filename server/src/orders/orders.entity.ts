import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from 'src/users/users.entity';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.orders, { eager: true })
  
  @JoinColumn({ name: 'user_id' })  // Ensures the column is linked as a foreign key
  user: User;

  @Column({
    type: 'enum',
    enum: ['Pending', 'Preparing', 'Delivered','Cancelled'],
    default: 'Pending',
  })
  status: string;

  @CreateDateColumn()
  created_at: Date;

  @Column('json')
  items: {
    menu_item_id: number;
    name: string;
    description: string;
    price: number;
    quantity: number;
    total_price: number;
  }[];

  @Column('json')
  payment: {
    amount: number;
    payment_method: string;
    status: string;
  };
}
