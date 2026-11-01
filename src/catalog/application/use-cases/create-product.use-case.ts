import { Injectable } from '@nestjs/common';
import { ProductRepositoryPort } from '../../domain/ports/product-repository.port';
import { CreateProductDto } from '../dtos/create-product.dto';
import { ProductEntity } from '../../domain/entities/product.entity';
import { randomUUID } from 'crypto';

@Injectable()
export class CreateProductUseCase {
  constructor(
    private readonly productRepository: ProductRepositoryPort
  ) {}

  async execute(input: CreateProductDto) : Promise<ProductEntity> {
    const product = new ProductEntity(
      randomUUID(),
      input.name,
      input.productType,
      input.expansionId ?? null,
      input.language ?? null,
      input.units ?? null,
      input.description ?? null,
      input.imageUrl ?? null,
      new Date()
    );

    return this.productRepository.save(product);
  }
}