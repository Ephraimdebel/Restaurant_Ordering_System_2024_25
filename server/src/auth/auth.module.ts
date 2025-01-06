import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from 'src/auth/strategy/local.strategy';
import { JwtStrategy } from './strategy/jwt.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/users.entity';
import { AdminGuard } from 'src/auth/guards/admin.guard';
import { RolesGuard } from './guards/role.guard';

@Module({

  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule,
    JwtModule.register(
      { 
        secret: 'abc123',
        signOptions: { expiresIn: '1h' }
       }
    )
  ],
  controllers: [AuthController],
  providers: [AuthService,LocalStrategy,JwtStrategy,AdminGuard]
})
export class AuthModule {}
