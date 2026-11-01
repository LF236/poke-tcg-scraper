export class ExpansionEntity {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly englishName: string,
    public readonly spanishName: string | null,
    public readonly releaseDate: Date | null,
    public readonly createdAt: Date
  ) {};
}