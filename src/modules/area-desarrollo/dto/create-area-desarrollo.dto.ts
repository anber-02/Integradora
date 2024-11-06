import { IsNumber, IsString } from 'class-validator';

export class CreateAreaDesarrolloDto {
  @IsString()
  area: string;

  @IsNumber()
  carrera_id: number;
}
