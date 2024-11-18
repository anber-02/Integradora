import { IsInt, IsNumber, IsPositive, IsString } from 'class-validator';

export class AssignObservacionToEmpresaDto {
  @IsString()
  detalle: string;

  @IsPositive()
  @IsInt()
  @IsNumber()
  empresa_id: number;
}
