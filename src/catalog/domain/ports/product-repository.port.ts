import { ProductEntity } from '../entities/product.entity';

export abstract class ProductRepositoryPort {
  abstract findAll(): Promise<ProductEntity[]>;
  abstract findById(id: string): Promise<ProductEntity | null>;
  abstract findByExpansion(expansionId: string): Promise<ProductEntity[]>;
  abstract findByType(productType: ProductEntity): Promise<ProductEntity[]>;
  abstract save(product: ProductEntity): Promise<ProductEntity>;
  abstract delete(id: string): Promise<void>;
}