import { Injectable, NotFoundException } from '@nestjs/common';
import { ExpansionRepositoryPort } from '../../domain/ports/expansion-repository.port';
import { ExpansionEntity } from '../../domain/entities/expansion.entity';

@Injectable()
export class GetExpansionUseCase {
  constructor(
    private readonly expansionRepository: ExpansionRepositoryPort
  ) {}

  async execute(id: string) : Promise<ExpansionEntity> {
    const expansion = await this.expansionRepository.findById(id);
    if(!expansion) throw new NotFoundException(`Expansion with id ${id} not found`);
    return expansion;
  }
}