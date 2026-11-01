export class MarketPlaceProductEntity {
  constructor(
    public readonly externalId: string,
    public readonly title: string,
    public readonly price: number,
    public readonly currency: string,
    public readonly url: string,
    public readonly marketplace: string,
    public readonly seller: string | null,
    public readonly shippingCost: number | null,
    public readonly availability: boolean,
    public readonly imageUrl: string | null
  ) {};
}