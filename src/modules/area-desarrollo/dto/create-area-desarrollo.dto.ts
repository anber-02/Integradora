import { IsString } from 'class-validator';

export class CreateAreaDesarrolloDto {
  @IsString()
  nombre: string;

  @IsString()
  descripcion: string;
}
