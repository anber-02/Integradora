import {
  IsArray,
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  MinLength,
} from 'class-validator';
import { Status } from '../enums/status.enum';
import { Transform } from 'class-transformer';

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

  @IsOptional()
  @IsEnum(Status, {
    message:
      'El estado debe ser uno de los siguientes valores: ' +
      Object.values(Status).join(', '),
  })
  @Transform(({ value }) => value?.toLowerCase())
  status: string;
}
