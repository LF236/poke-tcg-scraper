import { Injectable, Logger } from '@nestjs/common';
import { MarketPlaceAdapterPort } from '../../../domain/ports/marketplace-adapter.port';
import { ConfigService } from '@nestjs/config';
import { MarketPlaceProductEntity } from '../../../domain/entities/marketplace-product.entity';
import axios from 'axios';

const BASE_URL = 'https://api.mercadolibre.com';
const SITE_ID = 'MLM';

@Injectable()
export class MercadoLibreAdapter implements MarketPlaceAdapterPort {
  private readonly logger = new Logger(MercadoLibreAdapter.name);

  constructor(
    private readonly config: ConfigService
  ) {}

  async search(query: string) : Promise<MarketPlaceProductEntity[]> {
    try {
      const response = await axios.get(`${BASE_URL}/sites/${SITE_ID}/search`, {
        params: {
          q: query,
          limit: 50
        }
      });
      return response.data.results.map(this.toEntity);
    } catch (error: any) {
      this.logger.error(`Error searching products in MercadoLibre: ${error.message}`);
      return [];
    }
  }

  async getProduct(externalId: string) : Promise<MarketPlaceProductEntity | null> {
    try {
      const response = await axios.get(`${BASE_URL}/items/${externalId}`);
      return this.toEntity(response.data);
    } catch (error: any) {
      this.logger.error(`Error getting product ${externalId} from MercadoLibre: ${error.message}`);
      return null;
    }
  }

  private toEntity(item: any) : MarketPlaceProductEntity {
    return new MarketPlaceProductEntity(
      item.id,
      item.title,
      item.price,
      item.currency_id,
      item.permalink,
      'mercadolibre',
      item.seller?.id?.toString() ?? null,
      item.shipping?.free_shipping ? 0 : null,
      item.available_quantity > 0,
      item.thumbnail ?? null,
    )
  }
}