// users.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';
import { CreateUserDto } from './dto/CreateUser.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { name, email, password, phoneNumber, roleId } = createUserDto;
    try {
      

      // Hash the password
      const saltRounds = 10; // You can configure this in your environment
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      // Create a new user with hashed password
      const newUser = this.userRepository.create({
        name,
        email,
        password: hashedPassword,
        phoneNumber,
      });

      // Save to the database
      return await this.userRepository.save(newUser);
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new Error('Email already exists');
      }
      throw error;
    }
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(user_id: number): Promise<User> {
    return this.userRepository.findOne({ where: { user_id } });
  }
}
