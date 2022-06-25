import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  product_name: string;

  @IsNumber()
  @IsNotEmpty()
  product_price: number;

  @IsString()
  @IsNotEmpty()
  about_product: string;

  @IsString()
  @IsNotEmpty()
  category: string;

  @IsNumber()
  stock_quantity: number;

  @IsArray()
  colors: string[];

  @IsArray()
  images: Array<{ image: string; name: string; id: string }>;
}
