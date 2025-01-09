import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthPayloadDto } from 'src/auth/dto/auth.dto';
import { User } from 'src/users/users.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService,
        @InjectRepository(User)
        private userReposiotry: Repository<User>,
    ) { }
    async validateUser({ email, password }: AuthPayloadDto) {
        const finduser = await this.userReposiotry.findOneBy({ email });
        if (!finduser) {
          return null;
        }
      
        const isPasswordValid = await bcrypt.compare(password, finduser.password);
      
        // Check if password is valid
        console.log(email,password)
        if (isPasswordValid) {
          const { password, ...userWithoutPassword } = finduser;
          return this.jwtService.sign({
            ...userWithoutPassword,
            role: finduser.role, // Include role in JWT payload
          });
        }
      
        return null;
      }
      

        // Compare hashed password

    }

