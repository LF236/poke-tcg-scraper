import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('expansions')
export class ExpansionOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ name: 'english_name' })
  englishName: string;

  @Column({ name: 'spanish_name', type: 'text', nullable: true })
  spanishName: string | null;

  @Column({ name: 'release_date', type: 'date', nullable: true })
  releaseDate: Date | null;

  @Column({ name: 'created_at' })
  createdAt: Date;
}