import { MarketPlaceProductEntity } from '../entities/marketplace-product.entity';

export abstract class MarketPlaceAdapterPort {
  abstract search(query: string) : Promise<MarketPlaceProductEntity[]>;
  abstract getProduct(externalId: string) : Promise<MarketPlaceProductEntity | null>;
}