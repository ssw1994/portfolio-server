import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

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
}
