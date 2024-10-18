import { IsNumber, IsPositive, IsString, Min, MinLength } from "class-validator";

export class CreateAsesorEmpresarialInfoDto {
    @IsString()
    @MinLength(3)
    nombre:string;
    @IsString()
    @MinLength(5)
    email:string;
    @IsString()
    @MinLength(3)
    num_telefono:string;
    @IsString()
    @MinLength(3)
    area:string;
    @IsString()
    @MinLength(3)
    cargo:string;
    @IsNumber()
    @Min(1)
    proyecto_id:number;
}
