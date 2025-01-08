import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Category } from '../category/category.entity';

@Entity('menu_items')
export class MenuItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('text')
  description: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column({ nullable: true }) // New column for the image URL
  imageUrl: string;

  @ManyToOne(() => Category, category => category.menu_items)
  @JoinColumn({ name: 'categoryId' })  // Foreign key to Category
  category: Category; // Relation to the Category entity

  @Column({ nullable: true })
  branchId: number;
}
