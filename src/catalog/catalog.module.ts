import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ExpansionOrmEntity } from "./infrastructure/orm/typeorm/expansion-orm.entity";
import { ProductOrmEntity } from "./infrastructure/orm/typeorm/product.orm-entity";
import { ExpansionRepositoryPort } from './domain/ports/expansion-repository.port';
import { ExpansionRepository } from "./infrastructure/orm/typeorm/expansion.repository";
import { ProductRepositoryPort } from './domain/ports/product-repository.port';
import { ProductRepository } from './infrastructure/orm/typeorm/product.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ExpansionOrmEntity,
      ProductOrmEntity
    ])
  ],
  providers: [
    { provide: ExpansionRepositoryPort, useClass: ExpansionRepository },
    { provide: ProductRepositoryPort, useClass: ProductRepository }
  ],
  exports: [
    ExpansionRepositoryPort,
    ProductRepositoryPort
  ]
})
export class CatalogModule {}