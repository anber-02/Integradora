import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateCarreraDto {
  @IsString()
  @MinLength(5)
  nombre: string;

  @IsString()
  @MaxLength(5)
  nomenclatura: string;

  @IsString()
  descripcion: string;

  @IsString()
  nivel_educativo: string;

  @IsString()
  @IsOptional()
  imageUrl?: string; // Para almacenar la URL de la imagen
}
