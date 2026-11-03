import dotenv from 'dotenv';
dotenv.config();
import { DataSource } from 'typeorm';
import { ExpansionOrmEntity } from './src/catalog/infrastructure/orm/typeorm/expansion-orm.entity';
import { ProductOrmEntity } from './src/catalog/infrastructure/orm/typeorm/product.orm-entity';
import { ListingOrmEntity } from './src/listing/infrastructure/orm/typeorm/listing.orm-entity';
import { PriceObservationEntity } from './src/listing/domain/entities/price-observation.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  synchronize: false,
  entities: [
    ExpansionOrmEntity,
    ProductOrmEntity,
    ListingOrmEntity,
    PriceObservationEntity
  ],
  migrations: ['src/database/migrations/*.ts']
});