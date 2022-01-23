import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/auth/schemas/user.schema';
import { Address, AddressSchema } from 'src/user/schemas/address.schema';
import { OrdersController } from './orders.controller';
import { Order, OrderSchema } from './schemas/order.schema';
import {
  ShippingMethod,
  ShippingMethodSchema,
} from './schemas/shippingMethod.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ShippingMethod.name, schema: ShippingMethodSchema },
      { name: Order.name, schema: OrderSchema },
      { name: User.name, schema: UserSchema },
      { name: Address.name, schema: AddressSchema },
    ]),
  ],
  controllers: [OrdersController],
})
export class OrdersModule {}
