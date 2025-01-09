import { Body, Controller, Get, HttpException, Post, Req, UseGuards } from '@nestjs/common';
import { AuthPayloadDto } from 'src/auth/dto/auth.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from './guards/local.guard';
import { Request } from 'express';
import { JwtAuthGuard } from './guards/jwt.guard';
import { AdminGuard } from 'src/auth/guards/admin.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('login')
    @UseGuards(LocalAuthGuard)
    login(@Req() req: Request) {

    return { token: req.user }; // `req.user` should be the token after LocalAuthGuard successfully validates the user
    }
    @Get('status')
    @UseGuards(JwtAuthGuard)
    status(@Req() req:Request){
        console.log("inside status code")
        // console.log(req.user)
        return req.user
    }

    @Get('admin-status')
    @UseGuards(AdminGuard) // Protect this route for admins only
    adminStatus(@Req() req: Request) {
      return { message: 'Welcome, Admin!', user: req.user };
    }
}


