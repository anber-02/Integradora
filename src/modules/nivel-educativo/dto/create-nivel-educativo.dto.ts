import { IsString, MinLength } from 'class-validator';

export class CreateNivelEducativoDto {
  @IsString()
  @MinLength(3)
  nombre: string;

  @IsString()
  @MinLength(3)
  descripcion: string;

  @IsString()
  @MinLength(3)
  tipo: string;
}
