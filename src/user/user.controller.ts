import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/schemas/user.schema';
import { UserService } from './user.service';

@UseGuards(AuthGuard())
@Controller('user')
export class UserController {
  constructor(private userservice: UserService) {}

  @Get()
  getUser(@GetUser() user: User): Promise<User> {
    return this.userservice.getLoggedInUserDetails(user);
  }
}
