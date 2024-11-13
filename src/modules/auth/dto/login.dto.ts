import { Transform } from 'class-transformer';
import { MinLength, IsString, IsEmail } from 'class-validator';

export class LoginDto {
  @IsString()
  @IsEmail()
  email: string;

  @Transform(({ value }) => value.trim())
  @IsString()
  @MinLength(8)
  pass: string;
}
