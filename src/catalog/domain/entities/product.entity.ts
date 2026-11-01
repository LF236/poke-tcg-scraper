import { ProductType } from './product.type.js';

export class ProductEntity {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly productType: ProductType,
    public readonly expansionId: string | null,
    public readonly language: string | null,
    public readonly units: number | null,
    public readonly description: string | null,
    public readonly imageUrl: string | null,
    public readonly createdAt: Date
  ) {};
}