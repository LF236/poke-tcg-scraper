import { Injectable } from '@nestjs/common';
import { ProductRepositoryPort } from '../../../domain/ports/product-repository.port';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductOrmEntity } from './product.orm-entity';
import { Repository } from 'typeorm';
import { ProductEntity } from '../../../domain/entities/product.entity';
import { ProductType } from '../../../domain/entities/product.type';

@Injectable()
export class ProductRepository implements ProductRepositoryPort {
  constructor(
    @InjectRepository(ProductOrmEntity)
    private readonly repo: Repository<ProductOrmEntity>
  ) {};

  async findAll(): Promise<ProductEntity[]> {
    const rows = await this.repo
      .createQueryBuilder('product')
      .getMany();
    return rows.map((row) => this.toDomain(row));
  }

  async findById(id: string): Promise<ProductEntity | null> {
    const row = await this.repo
      .createQueryBuilder('product')
      .where('product.id = :id', { id })
      .getOne();
    
    return row ? this.toDomain(row) : null;
  }

  async findByExpansion(expansionId: string): Promise<ProductEntity[]> {
    const rows = await this.repo
      .createQueryBuilder('product')
      .where('product.expansionId = :expansionId', { expansionId })
      .getMany();
    return rows.map((row) => this.toDomain(row));
  }

  async findByType(productType: ProductEntity): Promise<ProductEntity[]> {
    const rows = await this.repo
      .createQueryBuilder('product')
      .where('product.productType = :productType', { productType })
      .getMany();
    return rows.map((row) => this.toDomain(row));
  }

  async save(product: ProductEntity): Promise<ProductEntity> {
    const saved = await this.repo.save(this.toOrm(product));
    return this.toDomain(saved);
  }

  async delete(id: string): Promise<void> {
    await this.repo.delete(id);
  }

  private toDomain(row: ProductOrmEntity) : ProductEntity {
    return new ProductEntity(
      row.id,
      row.name,
      row.productType as ProductType,
      row.expansionId,
      row.language,
      row.units,
      row.description,
      row.imageUrl,
      row.createdAt
    );
  }

  private toOrm(entity: ProductEntity) : ProductOrmEntity {
    const orm = new ProductOrmEntity();
    orm.id = entity.id;
    orm.name = entity.name;
    orm.productType = entity.productType;
    orm.expansionId = entity.expansionId;
    orm.language = entity.language;
    orm.units = entity.units;
    orm.description = entity.description;
    orm.imageUrl = entity.imageUrl;
    return orm;
  }
}