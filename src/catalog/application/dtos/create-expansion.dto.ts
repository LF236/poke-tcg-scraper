import { IsOptional, IsString } from 'class-validator';

export class CreateExpansionDto {
  @IsString()
  name: string;

  @IsString()
  englishName: string;

  @IsString()
  @IsOptional()
  spanishName?: string;

  @IsString()
  @IsOptional()
  releaseDate?: Date;
}