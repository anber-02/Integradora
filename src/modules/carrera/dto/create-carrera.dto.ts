import { IsNumber, IsPositive, IsString, Min, MinLength } from "class-validator";

export class CreateCarreraDto {
    @IsString()
    @MinLength(5)
    nombre:string;

    @IsString()
    @MinLength(5)
    clave:string;

    @IsString()
    @MinLength(5)
    descripcion:string;
}
