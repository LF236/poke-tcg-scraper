export class ListingEntity {
  constructor(
    public readonly id: string,
    public readonly marketplace: string,
    public readonly externalId: string,
    public readonly title: string,
    public readonly price: number,
    public readonly currency: string,
    public readonly url: string,
    public readonly availability: boolean,
    public readonly firstSeenAt: Date,
    public readonly lastSeenAt: Date,
    public readonly productId: string | null,
    public readonly seller: string | null,
    public readonly shippingCost: number | null
  ) {}
}