import { Module } from '@nestjs/common';
import { MercadoLibreAdapter } from './infrastructure/adapters/mercadolibre/mercadolibre.adapter';

@Module({
  providers: [MercadoLibreAdapter],
  exports: [MercadoLibreAdapter]
})
export class MarketPlaceModule {}