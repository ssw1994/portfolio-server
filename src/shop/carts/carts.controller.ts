import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../../auth/get-user.decorator';
import { User } from '../../auth/schemas/user.schema';
import { Product } from '../products/schemas/product.schema';
import { CartsService } from './carts.service';
import { UpdateCartItemQuantityDto } from './dtos/update_cart_item_quantity.dto';
import { Cart } from './schemas/cart.schema';
import { CartItem } from './schemas/cartItem.schema';

@UseGuards(AuthGuard())
@Controller('carts')
export class CartsController {
  constructor(private cartservice: CartsService) {}

  @Get()
  getCartItems(@GetUser() user: User): Promise<Product[]> {
    return this.cartservice.getCartItems(user);
  }

  @Patch('/add/:id')
  addToCart(@Param('id') id: string, @GetUser() user: User) {
    return this.cartservice.addToCart(id, user);
  }

  @Post("/update/quantity")
  async updateQuantity(@Body() updateQuanityPayload:UpdateCartItemQuantityDto):Promise<CartItem>{
    return this.cartservice.updateQuantity(updateQuanityPayload)
  }

  @Delete("/delete/:id")
  async removeFromCart(@GetUser() user:User,@Param('id') id:string){
    return this.cartservice.removeFromCart(user,id);
  }
}
