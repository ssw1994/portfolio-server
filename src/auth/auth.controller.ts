import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/auth-credentials.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signup(@Body() credentials: CreateUserDto): Promise<void> {
    return this.authService.createUser(credentials);
  }

  @Post('/signin')
  signin(@Body() credentials: CreateUserDto): Promise<{ accessToken: string }> {
    return this.authService.signIn(credentials);
  }

  @Post('/test')
  @UseGuards(AuthGuard())
  test(@Req() req) {
    console.log(req);
  }
}
