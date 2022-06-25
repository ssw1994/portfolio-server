import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../../auth/get-user.decorator';
import { User } from '../../auth/schemas/user.schema';
import { CreateAddressDto } from 'src/user/dtos/address.dto';
import { UserService } from 'src/user/user.service';
import { CreateOrderDto } from './dtos/createorder.dto';
import { OrdersService } from './orders.service';
import { Address } from './schemas/address.schema';
import { CreateContactDto } from '../../user/dtos/createcontact.dto';
import { Contact } from './schemas/contacts.schema';

@Controller('orders')
@UseGuards(AuthGuard())
export class OrdersController {
  constructor(
    private orderservice: OrdersService,
    private userservice: UserService,
  ) {}

  @Post('/put')
  putOrder() {}

  @Post('/paymentIntent')
  getPaymentIntent(@Body() order: CreateOrderDto) {
    return this.orderservice.getPaymentIntent(order);
  }

  @Post('/saveaddress')
  saveAddress(
    @Body() address: CreateAddressDto,
    @GetUser() user: User,
  ): Promise<Address> {
    return this.userservice.addAddress(address, user);
  }

  @Post('/savecontact')
  saveContact(
    @Body() contact: CreateContactDto,
    @GetUser() user: User,
  ): Promise<Contact> {
    return this.userservice.createContact(user, contact);
  }
}
