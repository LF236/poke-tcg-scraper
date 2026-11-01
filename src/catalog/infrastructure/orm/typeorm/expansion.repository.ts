import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ExpansionRepositoryPort } from '../../../domain/ports/expansion-repository.port';
import { Repository } from 'typeorm';
import { ExpansionEntity } from '../../../domain/entities/expansion.entity';
import { ExpansionOrmEntity } from './expansion-orm.entity';

@Injectable()
export class ExpansionRepository implements ExpansionRepositoryPort {
  constructor(
    @InjectRepository(ExpansionOrmEntity)
    private readonly repo: Repository<ExpansionOrmEntity>
  ) {}

  async findAll(): Promise<ExpansionEntity[]> {
    const rows = await this.repo
      .createQueryBuilder('expansion')
      .getMany();


  }

  private toDomain(row: ExpansionOrmEntity) : ExpansionEntity {
    return new ExpansionEntity(
      row.id,
      row.name,
      row.englishName,
      row.spanishName,
      row.releaseDate,
      row.createdAt
    );
  }

  private toOrm(entity: ExpansionEntity) : ExpansionOrmEntity {
    const orm = new ExpansionOrmEntity();
  }
}