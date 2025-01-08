
import { AuthModule } from './auth/auth.module';
import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { CategoriesModule } from './category/category.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    CategoriesModule
  ],
})
export class AppModule {}


//npm run typeorm -- migration:generate "db/migrations/NewMigrations"