import { Injectable } from '@nestjs/common';
import { ProductRepositoryPort } from '../../domain/ports/product-repository.port';
import { ProductEntity } from '../../domain/entities/product.entity';

@Injectable()
export class GetProductsUseCase {
  constructor(
    private readonly productRepository: ProductRepositoryPort
  ) {}

  async execute() : Promise<ProductEntity[]> {
    return this.productRepository.findAll();
  }
}