import { IsEnum, IsInt, IsOptional, IsString, IsUrl, IsUUID, Min } from 'class-validator';
import { ProductType } from '../../domain/entities/product.type';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsEnum(ProductType)
  productType: ProductType;

  @IsUUID()
  @IsOptional()
  expansionId?: string;

  @IsString()
  @IsOptional()
  language?: string;

  @IsInt()
  @Min(1)
  @IsOptional()
  units?: number;

  @IsString()
  @IsOptional()
  description?: string;

  @IsUrl()
  @IsOptional()
  imageUrl?: string;
}