import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { Contact } from 'src/shop/orders/schemas/contacts.schema';
import { User } from '../auth/schemas/user.schema';
import { Address } from '../shop/orders/schemas/address.schema';
import { CreateAddressDto } from './dtos/address.dto';
import { CreateContactDto } from './dtos/createcontact.dto';
import { UserService } from './user.service';

@UseGuards(AuthGuard())
@Controller('user')
export class UserController {
  constructor(private userservice: UserService) {}

  @Get()
  getUser(@GetUser() user: User): Promise<User> {
    return this.userservice.getLoggedInUserDetails(user);
  }

  @Post('/address/add')
  async addAddress(
    @Body() address: CreateAddressDto,
    @GetUser() user: User,
  ): Promise<Address> {
    return this.userservice.addAddress(address, user);
  }

  @Get('/address')
  async getExitingUserAddresses(@GetUser() user: User) {
    return this.userservice.getExitingUserAddresses(user);
  }

  @Post('/contact/add')
  async addContact(
    @GetUser() user: User,
    @Body() contact: CreateContactDto,
  ): Promise<Contact> {
    return this.userservice.createContact(user, contact);
  }
}
