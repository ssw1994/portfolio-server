import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CartsService } from '../carts/carts.service';
import { CreateOrderDto } from './dtos/createorder.dto';
import { Order, OrderDocument } from './schemas/order.schema';
import * as stripe from 'stripe';
import { Address, AddressDocument } from './schemas/address.schema';
import { CreateAddressDto } from 'src/user/dtos/address.dto';
import { User } from 'src/auth/schemas/user.schema';
import { Cart, CartDocument } from '../carts/schemas/cart.schema';
@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
    @InjectModel(Address.name) private addressModel: Model<AddressDocument>,
    @InjectModel(Cart.name) private cartModel: Model<CartDocument>,
    private cartService: CartsService,
  ) {}
  putOrder(orderDetails: CreateOrderDto) {
    const { cartId, shipping_method, address, contact } = orderDetails;

    const orderDoc = new this.orderModel({
      cartId,
      shipping_method,
      address,
      contact,
    });

    return orderDoc.save();
  }

  async getPaymentIntent(order: CreateOrderDto) {
    const orderDoc = await this.putOrder(order);
    const stripeApi = new stripe.Stripe(
      'sk_test_51Kb3EcSIWAAUtzpKXmIsuxDg80QumNZ5oDIbeRVbwToxmZ8tKsM9zlxEp2RmmZzvRr2EOzP2fEr9ZSk0JPMd40GE00lvlASP9q',
      { apiVersion: null, typescript: true },
    );

    const paymentIntent = await stripeApi.paymentIntents.create({
      amount: 100,
      currency: 'inr',
      confirm: true,
      payment_method: 'Card',
    });

    return { clientSecret: paymentIntent.client_secret, orderDoc };
  }
}
