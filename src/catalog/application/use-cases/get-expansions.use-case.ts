import { Injectable } from '@nestjs/common';
import { ExpansionRepositoryPort } from '../../domain/ports/expansion-repository.port';
import { ExpansionEntity } from '../../domain/entities/expansion.entity';

@Injectable()
export class GetExpansionsUseCase {
  constructor(
    private readonly expansionRepository: ExpansionRepositoryPort
  ) {}

  async execute() : Promise<ExpansionEntity[]> {
    return this.expansionRepository.findAll();
  }
}