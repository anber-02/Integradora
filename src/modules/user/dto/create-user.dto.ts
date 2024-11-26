import {
  IsEmail,
  IsOptional,
  IsPhoneNumber,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @MinLength(3)
  @IsString()
  nombre: string;

  @IsEmail()
  email: string;

  @MinLength(8)
  @IsString()
  password: string;

  @IsPhoneNumber()
  num_telefono: string;

  @IsString()
  @IsOptional()
  rol: string;

  @IsString()
  cargo: string;

  @IsString()
  area_trabajo: string;
}
