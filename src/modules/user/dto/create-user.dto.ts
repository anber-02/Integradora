import { IsEmail, IsPhoneNumber, IsString, MinLength } from 'class-validator'

export class CreateUserDto {
  @MinLength(3)
  @IsString()
  nombre: string

  @IsEmail()
  email: string

  @MinLength(8)
  @IsString()
  password: string

  @IsPhoneNumber()
  num_telefono: string
}
