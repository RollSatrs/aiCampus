import { Body, Controller, Get, HttpCode, HttpStatus, Post, UseGuards, Request } from '@nestjs/common';

import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }
  @Post('register')
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto)
  }


  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto.email, dto.password)
  }
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  profile(@Request() req){
    return req.user
  }
}
