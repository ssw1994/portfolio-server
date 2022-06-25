import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/auth/schemas/user.schema';
import { OrdersController } from './orders.controller';
import { Order, OrderSchema } from './schemas/order.schema';
import {
  ShippingMethod,
  ShippingMethodSchema,
} from './schemas/shippingMethod.schema';
import { OrdersService } from './orders.service';
import { AuthModule } from '../../auth/auth.module';
import { CartsModule } from '../carts/carts.module';
import { Address, AddressSchema } from './schemas/address.schema';
import { UserModule } from 'src/user/user.module';
import { Contact, ContactSchema } from './schemas/contacts.schema';
import { Cart, CartSchema } from '../carts/schemas/cart.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ShippingMethod.name, schema: ShippingMethodSchema },
      { name: Address.name, schema: AddressSchema },
      { name: Order.name, schema: OrderSchema },
      { name: Contact.name, schema: ContactSchema },
      { name: Cart.name, schema: CartSchema },
    ]),
    AuthModule,
    CartsModule,
    UserModule,
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
