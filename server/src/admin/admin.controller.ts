import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './guards/jwt.guard';
import { RolesGuard } from './guards/roles.guard';
import { Roles } from '../auth/decorator/roles.deocrator';

@Controller('admin')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AdminController {
  @Get('dashboard')
  @Roles('admin') // Protect this route for admin only
  getAdminDashboard() {
    return { message: 'Welcome to the Admin Dashboard!' };
  }
}
