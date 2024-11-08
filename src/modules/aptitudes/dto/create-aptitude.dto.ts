import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAptitudeDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsNotEmpty()
  descripcion: string;
}
