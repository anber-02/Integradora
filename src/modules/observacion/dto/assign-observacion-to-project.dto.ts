import { IsInt, IsNumber, IsPositive, IsString } from 'class-validator';

export class AssignObservacionToProjectDto {
  @IsString()
  detalle: string;

  @IsPositive()
  @IsInt()
  @IsNumber()
  project_id: number;
}
