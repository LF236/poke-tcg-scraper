import { PriceObservationEntity } from "../entities/price-observation.entity";

export abstract class PriceObservationRepositoryPort {
  abstract save(observation: PriceObservationEntity) : Promise<PriceObservationEntity>;
  abstract findByListing(listingId: string) : Promise<PriceObservationEntity[]>;
  abstract findLatestByListing(listingId: string) : Promise<PriceObservationEntity | null>;
}