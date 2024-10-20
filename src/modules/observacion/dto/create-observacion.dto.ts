import { IsString } from 'class-validator';

export class CreateObservacionDto {
  @IsString()
  detalle: string;
}
