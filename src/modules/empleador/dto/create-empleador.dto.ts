import { IsNumber, IsPositive, IsString, Min, MinLength } from "class-validator";

export class CreateEmpleadorDto {
    @IsString()
    @MinLength(5)
    nombre:string;

    @IsString()
    @MinLength(3)
    cargo:string;

    @IsString()
    @MinLength(3)
    email:string;
    
    @IsString()
    @MinLength(10)
    num_telefono:string;
}
