import { ExpansionEntity } from '../entities/expansion.entity.js';

export abstract class ExpansionRepositoryPort {
  abstract findAll(): Promise<ExpansionEntity[]>;
  abstract findById(id: string): Promise<ExpansionEntity | null>;
  abstract save(expansion: ExpansionEntity) : Promise<ExpansionEntity>;
  abstract delete(id: string) : Promise<void>;
}