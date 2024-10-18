import { IsNumber, IsPositive, IsString, Min, MinLength } from "class-validator";

export class CreateTitulacionDto {
    @IsString()
    @MinLength(3)
    nombre:string;

    @IsString()
    @MinLength(3)
    descripcion:string;

    @IsString()
    @MinLength(3)
    tipo:string;
}
