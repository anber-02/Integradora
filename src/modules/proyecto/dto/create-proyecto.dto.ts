import {
  IsArray,
  IsInt,
  IsNumber,
  IsString,
  Min,
  MinLength,
} from 'class-validator';

export class CreateProyectoDto {
  @IsString()
  @MinLength(3)
  nombre: string;

  @IsString()
  @MinLength(3)
  descripcion: string;

  @IsNumber()
  @Min(1)
  participantes_requeridos: number;

  @IsArray()
  @IsInt({ each: true })
  habilidades_ids: number[];

  @IsNumber()
  @Min(1)
  empresa_id: number;

  @IsNumber()
  @Min(1)
  carrera_id: number;
}
