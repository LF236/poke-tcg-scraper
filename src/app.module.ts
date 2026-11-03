import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { createObserveModule } from '@nestjs/observe';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatalogModule } from './catalog/catalog.module';
import { ExpansionOrmEntity } from './catalog/infrastructure/orm/typeorm/expansion-orm.entity';
import { ProductOrmEntity } from './catalog/infrastructure/orm/typeorm/product.orm-entity';
import { MarketPlaceModule } from './marketplace/marketplace.module';
import { ListingOrmEntity } from './listing/infrastructure/orm/typeorm/listing.orm-entity';
import { PriceObservationEntity } from './listing/domain/entities/price-observation.entity';
import { ListingModule } from './listing/listing.module';

export const { ObserveModule, ObserveInstrument } = createObserveModule();

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ScheduleModule.forRoot(),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get('DB_HOST', 'localhost'),
        port: config.get<number>('DB_PORT', 5432),
        database: config.get('DB_NAME'),
        username: config.get('DB_USER'),
        password: config.get('DB_PASSWORD'),
        autoLoadEntities: true,
        synchronize: false,
        entities: [
          ExpansionOrmEntity,
          ProductOrmEntity,
          ListingOrmEntity,
          PriceObservationEntity
        ]
      }),
    }),
    CatalogModule,
    MarketPlaceModule,
    ListingModule
  ],

})
export class AppModule {}
