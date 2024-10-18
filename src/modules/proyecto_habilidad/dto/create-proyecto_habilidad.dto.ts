import { IsNumber, IsPositive, IsString, Min, MinLength } from "class-validator";

export class CreateProyectoHabilidadDto {
    @IsNumber()
    @Min(1)
    habilidad_id:number;

    @IsNumber()
    @Min(1)
    proyecto_id:number;
}
