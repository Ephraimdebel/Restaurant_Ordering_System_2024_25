import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private jwtService: JwtService, private reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean {
      console.log("admin guard")
    const request: Request = context.switchToHttp().getRequest();
    const authorization = request.headers['authorization'];

    if (!authorization) {
      throw new UnauthorizedException('Authorization header not found');
    }

    const token = authorization.replace('Bearer ', '');
    try {
      const user = this.jwtService.verify(token);

      if (user.role.name !== 'Admin') {
        console.log("if admin guard", user.role);
        throw new UnauthorizedException('Access denied: Admins only');
      }

      request.user = user; // Attach user to the request
      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
