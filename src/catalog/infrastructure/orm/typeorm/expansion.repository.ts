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
    return rows.map((row) => this.toDomain(row));
  }

  async findById(id: string): Promise<ExpansionEntity | null> {
    const row = await this.repo
      .createQueryBuilder('expansion')
      .where('expansion.id = :id', { id })
      .getOne();

    return row ? this.toDomain(row) : null;
  }

  async save(expansion: ExpansionEntity) : Promise<ExpansionEntity> {
    const saved = await this.repo.save(this.toOrm(expansion));
    return this.toDomain(saved);
  }

  async delete(id: string) : Promise<void> {
    await this.repo.delete(id);
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
    orm.id = entity.id;
    orm.name = entity.name;
    orm.englishName = entity.englishName;
    orm.spanishName = entity.spanishName;
    orm.releaseDate = entity.releaseDate;
    orm.createdAt = entity.createdAt;
    return orm;
  }
}