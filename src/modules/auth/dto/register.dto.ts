import { Transform } from 'class-transformer';
import { IsEmail, IsPhoneNumber, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @Transform(({ value }) => value.trim())
  @MinLength(3)
  @IsString()
  nombre: string;

  @IsEmail()
  email: string;

  @Transform(({ value }) => value.trim())
  @MinLength(8)
  @IsString()
  password: string;

  @IsPhoneNumber()
  num_telefono: string;
}
