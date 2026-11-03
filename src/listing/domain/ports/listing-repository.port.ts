import { ListingEntity } from "../entities/listing.entity";

export abstract class ListingRepositoryPort {
  abstract findByExternalId(marketPlace: string, externalId: string) : Promise<ListingEntity | null>;
  abstract findByProduct(productId: string) : Promise<ListingEntity[]>;
  abstract save(listing: ListingEntity) : Promise<ListingEntity>;
  abstract updateLastSeen(id: string, price: number, availability: boolean, lastSeenAt: Date) : Promise<void>;
}