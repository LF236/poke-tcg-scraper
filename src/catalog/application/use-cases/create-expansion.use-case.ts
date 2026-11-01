import { Injectable } from '@nestjs/common';
import { ExpansionRepositoryPort } from '../../domain/ports/expansion-repository.port';
import { CreateExpansionDto } from '../dtos/create-expansion.dto';
import { ExpansionEntity } from '../../domain/entities/expansion.entity';
import { randomUUID } from 'crypto';

@Injectable()
export class CreateExpansionUseCase {
  constructor(
    private readonly expansionRepository: ExpansionRepositoryPort
  ) {}

  async execute(input: CreateExpansionDto) : Promise<ExpansionEntity> {
    const expansion = new ExpansionEntity(
      randomUUID(),
      input.name,
      input.englishName,
      input.spanishName ?? null,
      input.releaseDate ?? null,
      new Date()
    );
    return this.expansionRepository.save(expansion);
  }
}