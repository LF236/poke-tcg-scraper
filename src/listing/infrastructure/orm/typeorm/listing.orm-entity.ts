import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { ProductOrmEntity } from '../../../../catalog/infrastructure/orm/typeorm/product.orm-entity';

@Entity('listings')
export class ListingOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  marketplace: string;

  @Column({ name: 'external_id' })
  externalId: string;

  @Column()
  title: string;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  price: number;

  @Column()
  currency: string;

  @Column()
  url: string;

  @Column({ default: true })
  availability: boolean;

  @Column({ name: 'seller', nullable: true, type: 'varchar' })
  seller: string | null;

  @Column({ name: 'shipping_cosrt', type: 'decimal', precision: 12, scale: 2, nullable: true })
  shippingCost: number | null;

  @Column({ name: 'product_id', nullable: true, type: 'uuid' })
  productId: string | null;

  @ManyToOne(() => ProductOrmEntity, { nullable: true, onDelete: 'SET NULL' })
  product: ProductOrmEntity | null;

  @CreateDateColumn({ name: 'first_seen_at' })
  firstSeenAt: Date;

  @UpdateDateColumn({ name: 'last_seen_at' })
  lastSeenAt: Date;
}