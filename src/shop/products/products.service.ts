import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../../auth/schemas/user.schema';
import { CreateProductDto } from './dtos/create-product.dto';
import { ProductFilterDto } from './dtos/product-filter.dto';
import { Product, ProductDocument } from './schemas/product.schema';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  async getProducts(): Promise<Product[]> {
    const products = await this.productModel.find();
    return products;
  }

  async filterProducts(filterDto: ProductFilterDto) {}

  async createProduct(
    productDto: CreateProductDto,
    user: User,
  ): Promise<Product> {
    try {
      const {
        product_name,
        product_price,
        about_product,
        category,
      } = productDto;
      const product = new this.productModel({
        product_name,
        product_price,
        about_product,
        category,
      });
      product.save();
      return product;
    } catch (error) {
      console.error(error);
    }
  }
}
