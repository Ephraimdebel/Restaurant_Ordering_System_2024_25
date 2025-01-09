import { Category } from "src/category/category.entity";
import { MenuItem } from "src/menu/menu_items.entity";
// import { OrderItem } from "src/orders/order_items.entity";
import { Order } from "src/orders/orders.entity";
import { Payment } from "src/payments/payment.entity";
import { Role } from "src/roles/role.entity";
import { User } from "src/users/users.entity";
import { DataSource, DataSourceOptions } from "typeorm";

export const dataSourceOptions: DataSourceOptions = {
   type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'ephraim',
        password: 'ephraim',
        database: 'webproject',
        entities: [User, Role, Category, MenuItem, Order, Payment],
        migrations:['dist/db/migrations/*.js'],
        
}

const dataSource = new DataSource(dataSourceOptions)

export default dataSource