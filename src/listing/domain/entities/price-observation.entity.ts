export class PriceObservationEntity {
  constructor(
    public readonly id: string,
    public readonly listingId: string,
    public readonly price: number,
    public readonly currency: string,
    public readonly observedAt: Date,
    public readonly shippingCost: number | null
  ) {}
}