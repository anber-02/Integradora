import { IsNumber, IsString, Min, MinLength } from 'class-validator';

export class CreateDireccionDto {
  @IsString()
  @MinLength(5)
  calle: string;
  @IsString()
  @MinLength(1)
  num_interior: string;
  @IsString()
  @MinLength(1)
  num_exterior: string;
  @IsString()
  @MinLength(5)
  colonia: string;
  @IsString()
  @MinLength(5)
  municipio: string;
  @IsString()
  @MinLength(5)
  estado: string;
  @IsString()
  @MinLength(5)
  pais: string;
  @IsNumber()
  @Min(6)
  codigo_postal: number;
}
