import { IsNumber, IsPositive, IsString, Min, MinLength } from "class-validator";

export class CreateHabilidadDto {
    @IsString()
    @MinLength(5)
    nombre:string;
}
