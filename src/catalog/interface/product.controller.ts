import { Body, Controller, Get, Param, ParseUUIDPipe, Post } from '@nestjs/common';
import { CreateProductUseCase } from '../application/use-cases/create-product.use-case';
import { GetProductsUseCase } from '../application/use-cases/get-products.use-case';
import { GetProductUseCase } from '../application/use-cases/get-product.use-case';
import { CreateProductDto } from '../application/dtos/create-product.dto';

@Controller('products')
export class ProductController {
  constructor(
    private readonly createProduct: CreateProductUseCase,
    private readonly getProducts: GetProductsUseCase,
    private readonly getProduct: GetProductUseCase
  ) {}

  @Post()
  create(
    @Body() dto: CreateProductDto
  ) {
    return this.createProduct.execute(dto);
  }

  @Get()
  findAll() {
    return this.getProducts.execute();
  }

  @Get(':id')
  findOne(
    @Param('id', ParseUUIDPipe) id: string
  ) {
    return this.getProduct.execute(id);
  }
}