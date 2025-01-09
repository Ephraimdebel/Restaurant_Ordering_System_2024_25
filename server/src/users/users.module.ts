// users/users.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users.entity';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { RoleModule } from '../roles/role.module';  // Import RoleModule to resolve RoleRepository
import { Role } from 'src/roles/role.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Role]),  // Make sure the User repository is injected
    RoleModule,  // Ensure RoleModule is imported to access RoleRepository
  ],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
