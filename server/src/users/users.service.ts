import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';
import { CreateUserDto } from './dto/CreateUser.dto';
import { UpdateUserDto } from './dto/UpdateUser.dto';
import { Role } from '../roles/role.entity';
import * as bcrypt from 'bcrypt';
import { Order } from 'src/orders/orders.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,

  ) {}


  async create(createUserDto: CreateUserDto): Promise<User> {
    const { name, email, password, phoneNumber, roleId } = createUserDto;

    const effectiveRoleId = roleId || 3;

    const role = await this.roleRepository.findOne({ where: { id: effectiveRoleId } });
    if (!role) throw new Error('Role not found');


    // console.log(createUserDto)
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = this.userRepository.create({
      name,
      email,
      password: hashedPassword,
      phoneNumber,
      role,
    });

    return this.userRepository.save(newUser);
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(user_id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { user_id } });
    if (!user) throw new NotFoundException(`User with ID ${user_id} not found`);
    return user;
  }

  async update(user_id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const { name, email, password, phoneNumber, roleId } = updateUserDto;

    const user = await this.findOne(user_id);
    if (roleId) {
      const role = await this.roleRepository.findOne({ where: { id: roleId } });
      if (!role) throw new NotFoundException(`Role with ID ${roleId} not found`);
      user.role = role;
    }

    if (password) {
      user.password = await bcrypt.hash(password, 10);
    }

    Object.assign(user, { name, email, phoneNumber });
    return this.userRepository.save(user);
  }

  async delete(user_id: number): Promise<{ message: string }> {
    const user = await this.findOne(user_id);
  
    // Soft delete the user
    await this.userRepository.softRemove(user);
  
    return { message: `User with ID ${user_id} has been soft deleted` };
  }
  
}
