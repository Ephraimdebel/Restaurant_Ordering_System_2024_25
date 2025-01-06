// users/users.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users.entity';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),  // Make sure the User repository is injected
  ],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
