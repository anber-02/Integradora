import { IsNumber, IsPositive, IsString, Min, MinLength } from "class-validator";

export class CreateProyectoTitulacionDto {
    @IsNumber()
    @IsPositive()
    @Min(1)
    proyecto_id:number;

    @IsNumber()
    @IsPositive()
    @Min(1)
    proyecto_empresa_id:number;

    @IsNumber()
    @IsPositive()
    @Min(1)
    titulacion_id:number;
}
