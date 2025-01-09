import { TypeOrmModule } from '@nestjs/typeorm';
import { MenuModule } from './menu/menu.module';
import { OrdersModule } from './orders/orders.module';
import { AuthModule } from './auth/auth.module';
import { ReservationsModule } from './reservations/reservations.module';
import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { PaymentModule } from './payments/payments.module';
import { User } from './users/users.entity';
import { Role } from './roles/role.entity';
import { Category } from './category/category.entity';
import { MenuItem } from './menu/menu_items.entity';
import { Order } from './orders/orders.entity';
import { Payment } from './payments/payment.entity';
import { RoleModule } from './roles/role.module';
import { CategoriesModule } from './category/category.module';
import { ConfigModule } from '@nestjs/config';
import { dataSourceOptions } from '../db/data-source';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forRoot(dataSourceOptions),
    ConfigModule.forRoot({
      isGlobal: true, // Makes the configuration globally available
    }),
    PaymentModule,
    UsersModule,
    TypeOrmModule.forFeature([User, Role, Category, MenuItem, Order, Payment]),
    MenuModule,
    OrdersModule,
    ReservationsModule,
    RoleModule,
    CategoriesModule
  ],

})
export class AppModule {}


//npm run typeorm -- migration:generate "db/migrations/NewMigrations"


// {
//   type: 'mysql',
//   host: 'localhost',
//   port: 3306,
//   username: 'ephraim',
//   password: 'ephraim',
//   database: 'webproject',
//   entities: [User, Role, Category, MenuItem, Order, Payment],
//   synchronize: true,}