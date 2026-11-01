import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductRepositoryPort } from '../../domain/ports/product-repository.port';
import { ProductEntity } from '../../domain/entities/product.entity';

@Injectable()
export class GetProductUseCase {
  constructor(
    private readonly productRepository: ProductRepositoryPort
  ) {}

  async execute(id: string) : Promise<ProductEntity> {
    const product = await this.productRepository.findById(id);
    if(!product) throw new NotFoundException(`Product with id ${id} not found`);
    return product;
  }
}