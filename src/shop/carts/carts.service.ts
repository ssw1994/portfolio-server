import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../../auth/schemas/user.schema';
import { Product } from '../products/schemas/product.schema';
import { Cart, CartDocument } from './schemas/cart.schema';
import * as mongoose from 'mongoose';
import { CartItem, CartItemDocument } from './schemas/cartItem.schema';
import { UpdateCartItemQuantityDto } from './dtos/update_cart_item_quantity.dto';

@Injectable()
export class CartsService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Cart.name) private cartModel: Model<CartDocument>,
    @InjectModel(CartItem.name) private cartItemModel: Model<CartItemDocument>,
  ) {}

  async getCartTotal(user: User) {}

  async getCartItems(user: User): Promise<Array<Product>> {
    const res = await this.cartItemModel.aggregate([
      { $match: { cartId: user.cartId } },
      {
        $lookup: {
          from: 'products',
          foreignField: '_id',
          localField: 'productId',
          as: 'products',
        },
      },
      {
        $replaceRoot: {
          newRoot: {
            $mergeObjects: [{ $arrayElemAt: ['$products', 0] }, '$$ROOT'],
          },
        },
      },
      { $project: { products: 0 } },
    ]);
    return res;
  }

  async addToCart(productId: string, user: User) {
    const cartItem = await this.cartItemModel.find({
      cartId: user.cartId,
      productId: productId,
    });

    if (cartItem && cartItem.length > 0) {
      throw new BadRequestException({
        message: 'Product already exists in cart',
      });
    }

    const newCartItem = new this.cartItemModel({
      productId: productId,
      cartId: user.cartId,
      quantity: 1,
      discount: 0,
    });

    const cartItemSaveResponse = await newCartItem.save();

    await this.cartModel.findByIdAndUpdate(user.cartId, {
      $push: {
        products: cartItemSaveResponse._id,
      },
    });
    return await this.cartModel.findById(user.cartId);
  }

  async updateQuantity(
    updateQuantityPayload: UpdateCartItemQuantityDto,
  ): Promise<CartItem> {
    const { cartItemId, quantity } = updateQuantityPayload;
    const response = await this.cartItemModel.findByIdAndUpdate(cartItemId, {
      quantity: quantity,
    });
    return response;
  }

  async removeFromCart(user: User, cartItemId: string): Promise<CartItem> {
    await this.cartModel.updateOne(
      { _id: user.cartId },
      { $pull: { products: cartItemId } },
    );
    const response = await this.cartItemModel.findByIdAndDelete(cartItemId);
    return response;
  }

  async assignNewCartToUser(user: User) {
    const cartDoc = new this.cartModel({ products: [] });
    const doc = await cartDoc.save();
    const _id = user._id;
    return this.userModel.findByIdAndUpdate(_id, { cartId: doc._id });
  }
}
