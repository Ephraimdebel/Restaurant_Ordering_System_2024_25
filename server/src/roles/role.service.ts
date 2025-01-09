import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './role.entity';
import { CreateRoleDto } from './dto/create_role.dto';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
  ) {}

  // Create a role
  async create(): Promise<Role[]> {

    const roles = [
        { name: 'admin' },
        { name: 'user' },
        { name: 'staff' },
      ];
    const role = this.roleRepository.create(roles); // Create a new role entity
    return this.roleRepository.save(role); // Save to the database
  }

  // Other methods can be added here for retrieving roles, etc.
}
