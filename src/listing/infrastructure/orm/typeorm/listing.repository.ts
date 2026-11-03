import { Injectable } from '@nestjs/common';
import { ListingRepositoryPort } from '../../../domain/ports/listing-repository.port';
import { InjectRepository } from '@nestjs/typeorm';
import { ListingOrmEntity } from './listing.orm-entity';
import { Repository } from 'typeorm';
import { ListingEntity } from '../../../domain/entities/listing.entity';

@Injectable()
export class ListingRepository implements ListingRepositoryPort {
  constructor(
    @InjectRepository(ListingOrmEntity)
    private readonly repo: Repository<ListingOrmEntity>
  ) {}

  async findByExternalId(marketPlace: string, externalId: string): Promise<ListingEntity | null> {
    const row = await this.repo
      .createQueryBuilder('listing')
      .where('listing.marketplace = :marketplace', { marketPlace })
      .andWhere('listing.externalId = :externalId', { externalId })
      .getOne();
    return row ? this.toDomain(row) : null;
  }

  async findByProduct(productId: string): Promise<ListingEntity[]> {
    const rows = await this.repo
      .createQueryBuilder('listing')
      .where('listing.productId = :productId', { productId })
      .getMany();

    return rows.map(this.toDomain);
  }

  async save(listing: ListingEntity) : Promise<ListingEntity> {
    const saved = await this.repo.save(this.toOrm(listing));
    return this.toDomain(saved);
  }

  async updateLastSeen(id: string, price: number, availability: boolean, lastSeenAt: Date) : Promise<void> {
    await this.repo.update(id, { price, availability, lastSeenAt });
  }

  private toDomain(row: ListingOrmEntity) : ListingEntity {
    return new ListingEntity(
      row.id,
      row.marketplace,
      row.externalId,
      row.title,
      Number(row.price),
      row.currency,
      row.url,
      row.availability,
      row.firstSeenAt,
      row.lastSeenAt,
      row.productId,
      row.seller,
      row.shippingCost ? Number(row.shippingCost) : null
    );
  }

  private toOrm(entity: ListingEntity) : ListingOrmEntity {
    const orm = new ListingOrmEntity();
    orm.id = entity.id;
    orm.marketplace = entity.marketplace;
    orm.externalId = entity.externalId;
    orm.title = entity.title;
    orm.price = entity.price;
    orm.currency = entity.currency;
    orm.url = entity.url;
    orm.availability = entity.availability;
    orm.productId = entity.productId;
    orm.seller = entity.seller;
    orm.shippingCost = entity.shippingCost;
    return orm;
  }
}