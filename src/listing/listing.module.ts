import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ListingOrmEntity } from './infrastructure/orm/typeorm/listing.orm-entity';
import { PriceObservationOrmEntity } from './infrastructure/orm/typeorm/price-observation.orm-entity';
import { ListingRepositoryPort } from './domain/ports/listing-repository.port';
import { ListingRepository } from './infrastructure/orm/typeorm/listing.repository';
import { PriceObservationRepositoryPort } from './domain/ports/price-observation-repository.port';
import { PriceObservationRepository } from './infrastructure/orm/typeorm/price-observation.repository';
import { SyncMarketplaceListingsUseCase } from './application/use-cases/sync-marketplace-listings.use-case';

@Module({
  imports: [
    TypeOrmModule.forFeature([ListingOrmEntity, PriceObservationOrmEntity])
  ],
  providers: [
    { provide: ListingRepositoryPort, useClass: ListingRepository },
    { provide: PriceObservationRepositoryPort, useClass: PriceObservationRepository },
    SyncMarketplaceListingsUseCase
  ],
  exports: [
    ListingRepositoryPort,
    PriceObservationRepositoryPort,
    SyncMarketplaceListingsUseCase
  ]
})
export class ListingModule {};