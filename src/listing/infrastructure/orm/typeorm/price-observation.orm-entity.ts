import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ListingOrmEntity } from './listing.orm-entity';

@Entity('price_observations')
export class PriceObservationOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'listing_id' })
  listingId: string;

  @ManyToOne(() => ListingOrmEntity, { onDelete: 'CASCADE' })
  listing: ListingOrmEntity;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  price: number;

  @Column()
  currency: string;

  @Column({ name: 'shipping_cost', type: 'decimal', precision: 12, scale: 2, nullable: true })
  shippingCost: number | null;

  @CreateDateColumn({ name: 'observed_at' })
  observedAt: Date;
}