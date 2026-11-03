import { Injectable } from '@nestjs/common';
import { PriceObservationRepositoryPort } from '../../../domain/ports/price-observation-repository.port';
import { InjectRepository } from '@nestjs/typeorm';
import { PriceObservationOrmEntity } from './price-observation.orm-entity';
import { Repository } from 'typeorm';
import { PriceObservationEntity } from '../../../domain/entities/price-observation.entity';

@Injectable()
export class PriceObservationRepository implements PriceObservationRepositoryPort {
  constructor(
    @InjectRepository(PriceObservationOrmEntity)
    private readonly repo: Repository<PriceObservationOrmEntity>
  ) {}

  async save(observation: PriceObservationEntity): Promise<PriceObservationEntity> {
    const saved = await this.repo.save(this.toOrm(observation));
    return this.toDomain(saved);
  }

  async findByListing(listingId: string): Promise<PriceObservationEntity[]> {
    const rows = await this.repo
      .createQueryBuilder('obs')
      .where('obs.listingId = :listingId', { listingId })
      .orderBy('obs.observedAt', 'DESC')
      .getMany();
    return rows.map(this.toDomain);
  }

  async findLatestByListing(listingId: string): Promise<PriceObservationEntity | null> {
    const row = await this.repo
      .createQueryBuilder('obs')
      .where('obs.listingId = :listingId', { listingId })
      .orderBy('obs.observedAt', 'DESC')
      .getOne();
    return row ? this.toDomain(row) : null;
  }

  private toDomain(row: PriceObservationOrmEntity) : PriceObservationEntity {
    return new PriceObservationEntity(
      row.id,
      row.listingId,
      Number(row.price),
      row.currency,
      row.observedAt,
      row.shippingCost ? Number(row.shippingCost) : null
    );
  }

  private toOrm(entity: PriceObservationEntity) : PriceObservationOrmEntity {
    const orm = new PriceObservationOrmEntity();
    orm.id = entity.id;
    orm.listingId = entity.listingId;
    orm.price = entity.price;
    orm.currency = entity.currency;
    orm.shippingCost = entity.shippingCost;
    return orm;
  }
}