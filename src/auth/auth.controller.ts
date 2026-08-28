import { Controller, Post, Body, HttpCode, HttpStatus, Get, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginDto) {
    const user = await this.authService.validateUser(loginDto);
    const data = await this.authService.login(user);
    
    return {
      statusCode: HttpStatus.OK,
      message: 'Logged in successfully',
      data,
    };
  }

  // Example of a protected route
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return {
      statusCode: HttpStatus.OK,
      message: 'Profile retrieved successfully',
      data: req.user,
    };
  }
}

