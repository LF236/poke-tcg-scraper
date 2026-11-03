import { Injectable, Logger } from '@nestjs/common';
import { ListingRepositoryPort } from '../../domain/ports/listing-repository.port';
import { PriceObservationRepositoryPort } from '../../domain/ports/price-observation-repository.port';
import { MarketPlaceProductEntity } from '../../../marketplace/domain/entities/marketplace-product.entity';
import { PriceObservationEntity } from '../../domain/entities/price-observation.entity';
import { randomUUID } from 'crypto';
import { ListingEntity } from '../../domain/entities/listing.entity';

@Injectable()
export class SyncMarketplaceListingsUseCase {
  private readonly logger = new Logger(SyncMarketplaceListingsUseCase.name);

  constructor(
    private readonly listingRepository: ListingRepositoryPort,
    private readonly priceObservationRepository: PriceObservationRepositoryPort
  ) {}

  async execute(products: MarketPlaceProductEntity[]) : Promise<void> {
    for (const product of products) {
      await this.syncOne(product);
    }
  }

  private async syncOne(product: MarketPlaceProductEntity) : Promise<void> {
    const now = new Date();

    const existing = await this.listingRepository.findByExternalId(
      product.marketplace,
      product.externalId
    );

    if(existing) {
      await this.listingRepository.updateLastSeen(
        existing.id,
        existing.price,
        existing.availability,
        now
      );
      await this.recordObservation(existing.id, product, now);
      this.logger.debug(`Update listing ${existing.id}`);
    } else {
      const listing = new ListingEntity(
        randomUUID(),
        product.marketplace,
        product.externalId,
        product.title,
        product.price,
        product.currency,
        product.url,
        product.availability,
        now,
        now,
        null,
        product.seller,
        product.shippingCost
      );
      
      const saved = await this.listingRepository.save(listing);
      await this.recordObservation(saved.id, product, now);
      this.logger.debug(`Created listing ${saved.id}`);
    }
  }

  private async recordObservation(
    listingId: string,
    product: MarketPlaceProductEntity,
    now: Date
  ): Promise<void> {
    const observation = new PriceObservationEntity(
      randomUUID(),
      listingId,
      product.price,
      product.currency,
      now,
      product.shippingCost
    );

    await this.priceObservationRepository.save(observation);
  }

}