import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type ProductDocument = Product & Document;

@Schema()
export class Product {
  @Prop()
  product_name: string;

  @Prop()
  product_price: number;

  @Prop()
  brand_name: number;

  @Prop()
  category: string;

  @Prop()
  model_number: string;

  @Prop()
  about_product: string;

  @Prop()
  product_description: string;

  @Prop()
  technical_details: string;

  @Prop()
  product_images: [{ image: string; name: string; id: string }];

  @Prop()
  colors: string[];
}

export const ProductSchema = SchemaFactory.createForClass(Product);
