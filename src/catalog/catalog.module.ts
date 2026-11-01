import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ExpansionOrmEntity } from "./infrastructure/orm/typeorm/expansion-orm.entity";
import { ProductOrmEntity } from "./infrastructure/orm/typeorm/product.orm-entity";
import { ExpansionRepositoryPort } from './domain/ports/expansion-repository.port';
import { ExpansionRepository } from "./infrastructure/orm/typeorm/expansion.repository";
import { ProductRepositoryPort } from './domain/ports/product-repository.port';
import { ProductRepository } from './infrastructure/orm/typeorm/product.repository';
import { ExpansionController } from './interface/expansion.controller';
import { CreateExpansionUseCase } from './application/use-cases/create-expansion.use-case';
import { GetExpansionsUseCase } from './application/use-cases/get-expansions.use-case';
import { GetExpansionUseCase } from './application/use-cases/get-expansion.use-case';
import { ProductController } from "./interface/product.controller";
import { CreateProductUseCase } from "./application/use-cases/create-product.use-case";
import { GetProductsUseCase } from "./application/use-cases/get-products.use-case";
import { GetProductUseCase } from "./application/use-cases/get-product.use-case";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ExpansionOrmEntity,
      ProductOrmEntity
    ])
  ],
  controllers: [ExpansionController, ProductController],
  providers: [
    { provide: ExpansionRepositoryPort, useClass: ExpansionRepository },
    { provide: ProductRepositoryPort, useClass: ProductRepository },
    CreateExpansionUseCase,
    GetExpansionsUseCase,
    GetExpansionUseCase,
    CreateProductUseCase,
    GetProductsUseCase,
    GetProductUseCase
  ],
  exports: [
    ExpansionRepositoryPort,
    ProductRepositoryPort
  ]
})
export class CatalogModule {}