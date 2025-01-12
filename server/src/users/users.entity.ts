import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, DeleteDateColumn } from 'typeorm';
import { Role } from '../roles/role.entity';
import { Order } from 'src/orders/orders.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  user_id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  phoneNumber: string;

  @ManyToOne(() => Role, (role) => role.users, { eager: true })
  // @defaultValue({ id: 2 })
  role: Role;

  @CreateDateColumn()
  created_at: Date;

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];

  @DeleteDateColumn()
  deletedAt: Date;
}
