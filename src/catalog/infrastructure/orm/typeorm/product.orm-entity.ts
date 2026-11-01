import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ExpansionOrmEntity } from './expansion-orm.entity';

@Entity('products')
export class ProductOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ name: 'product_type' })
  productType: string;

  @ManyToOne(() => ExpansionOrmEntity, { nullable: true, onDelete: 'SET NULL' })
  expansion: ExpansionOrmEntity | null;

  @Column({ name: 'expansion_id', nullable: true, type: 'uuid' })
  expansionId: string | null;

  @Column({ nullable: true, type: 'varchar' })
  language: string | null;

  @Column({ nullable: true, type: 'int' })
  units: number | null;

  @Column({ nullable: true, type: 'text' })
  description: string | null;

  @Column({ name: 'image_url', nullable: true, type: 'varchar' })
  imageUrl: string | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}