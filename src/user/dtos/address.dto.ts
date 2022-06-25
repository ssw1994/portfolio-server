import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateAddressDto {
  @IsOptional()
  @IsString()
  _id: string;

  @IsOptional()
  @IsString()
  userId: string;

  @IsNotEmpty()
  @IsString()
  country: string;

  @IsNotEmpty()
  @IsString()
  state: string;

  @IsNotEmpty()
  @IsString()
  city: string;

  @IsNotEmpty()
  postal_code: string | number;

  @IsOptional()
  street_number: string;

  @IsOptional()
  @IsString()
  street_name: string;

  @IsBoolean()
  @IsOptional()
  isCurrentAddress: boolean;

  @IsString()
  countryName: string;

  @IsString()
  stateName: string;

  @IsString()
  @IsNotEmpty()
  addressType: string;

  @IsString()
  @IsOptional()
  landMark: string;
}
