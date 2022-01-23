import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../../auth/get-user.decorator';
import { User } from '../../auth/schemas/user.schema';
import { CreateProductDto } from './dtos/create-product.dto';
import { ProductsService } from './products.service';
import { Product } from './schemas/product.schema';

@Controller('products')
export class ProductsController {
  constructor(private productservice: ProductsService) {}

  @Get()
  async getProducts(): Promise<Product[]> {
    return this.productservice.getProducts();
  }

  @UseGuards(AuthGuard())
  @Post('/create')
  async createProduct(
    @Body() productDto: CreateProductDto,
    @GetUser() user: User,
  ): Promise<Product> {
    return this.productservice.createProduct(productDto, user);
  }
}
