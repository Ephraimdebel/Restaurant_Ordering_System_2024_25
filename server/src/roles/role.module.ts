// roles/role.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './role.entity';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Role])],  // Inject RoleRepository
  providers: [RoleService],  // Provide RoleService
  controllers: [RoleController],
})
export class RoleModule {}
