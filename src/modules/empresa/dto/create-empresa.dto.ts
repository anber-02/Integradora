import { Transform, Type } from 'class-transformer';
import {
  IsBoolean,
  IsEnum,
  IsOptional,
  IsString,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { CreateDireccionDto } from 'src/modules/direccion/dto/create-direccion.dto';
import { Alcance } from '../enums/enums';
import { Status } from '../enums/status.enum';

export class CreateEmpresaDto {
  @IsString()
  @MinLength(5)
  nombre: string;

  @IsString()
  @MinLength(3)
  tipo: string;

  @IsString()
  @MinLength(3)
  giro: string;

  @IsString()
  @MinLength(3)
  razon_social: string;

  @IsString()
  sector: string;

  @ValidateNested()
  @Type(() => CreateDireccionDto)
  direccion: CreateDireccionDto;

  @IsOptional()
  @IsBoolean()
  activo: boolean;

  @IsOptional()
  @IsEnum(Status, {
    message: `status debe ser uno de los siguientes valores: ${Object.values(Status).join(', ')}`,
  })
  status: boolean;

  @IsString()
  @MinLength(5)
  size: string;

  @IsEnum(Alcance, {
    message: `alcance_geografico debe ser uno de los siguientes valores: ${Object.values(Alcance).join(', ')}`,
  })
  @Transform(({ value }) => value?.toLowerCase())
  alcance_geografico: string;

  usuario_id: number;
}
