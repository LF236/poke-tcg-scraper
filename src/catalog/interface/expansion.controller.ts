import { Body, Controller, Get, Param, ParseUUIDPipe, Post } from '@nestjs/common';
import { CreateExpansionUseCase } from '../application/use-cases/create-expansion.use-case';
import { GetExpansionUseCase } from '../application/use-cases/get-expansion.use-case';
import { GetExpansionsUseCase } from '../application/use-cases/get-expansions.use-case';
import { CreateExpansionDto } from '../application/dtos/create-expansion.dto';

@Controller('expansions')
export class ExpansionController {
  constructor(
    private readonly createExpansion: CreateExpansionUseCase,
    private readonly getExpansions: GetExpansionsUseCase,
    private readonly getExpansion: GetExpansionUseCase
  ) {}

  @Post()
  create(
    @Body() dto: CreateExpansionDto
  ) {
    return this.createExpansion.execute(dto);
  }

  @Get()
  getAll() {
    return this.getExpansions.execute();
  }

  @Get(':id')
  findOne(
    @Param('id', ParseUUIDPipe) id: string
  ) {
    return this.getExpansion.execute(id);
  }
}