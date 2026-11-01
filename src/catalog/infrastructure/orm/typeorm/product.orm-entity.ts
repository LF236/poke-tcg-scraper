import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ExpansionOrmEntity } from './expansion-orm.entity.js';

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

  @Column({ name: 'expansion_id', nullable: true })
  expansionId: string | null;

  @Column({ nullable: true })
  language: string | null;

  @Column({ nullable: true })
  units: number | null;

  @Column({ nullable: true })
  description: string | null;

  @Column({ name: 'image_url', nullable: true })
  imageUrl: string | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}