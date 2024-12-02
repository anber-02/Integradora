import { Transform } from 'class-transformer';
import { IsNumber, IsPositive } from 'class-validator';

export class CreateDocumentoDto {
  @IsNumber()
  @IsPositive()
  @Transform(({ value }) => Number(value))
  empresa_id: number;
}
