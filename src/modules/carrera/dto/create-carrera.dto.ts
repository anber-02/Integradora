import {
  IsEnum,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { NivelEducativo } from '../enums/nivel-educativo.enum';
import { Transform } from 'class-transformer';

export class CreateCarreraDto {
  @IsString()
  @MinLength(5)
  nombre: string;

  @IsString()
  @MaxLength(5)
  nomenclatura: string;

  @IsString()
  descripcion: string;

  @IsEnum(NivelEducativo, {
    message:
      'El nivel educativo debe ser uno de los siguientes valores: ' +
      Object.values(NivelEducativo).join(', '),
  })
  @Transform(({ value }) => value?.toLowerCase())
  nivel_educativo: string;

  @IsString()
  @IsOptional()
  icon?: string; // Para almacenar la URL de la imagen

  @IsString()
  @IsOptional()
  image_url?: string; // Para almacenar la URL de la imagen
}
