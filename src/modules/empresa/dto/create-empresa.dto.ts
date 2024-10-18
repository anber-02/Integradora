import { IsBoolean, IsNumber, IsPositive, IsString, Min, MinLength } from "class-validator";

export class CreateEmpresaDto {
    @IsString()
    @MinLength(5)
    nombre:string;

    @IsString()
    @MinLength(3)
    tipo:string;

    @IsString()
    @MinLength(3)
    giro:string;

    @IsString()
    @IsPositive()
    @MinLength(3)
    razon_social:string;

    @IsNumber()
    @IsPositive()
    @Min(1)
    empleador_id:number;

    @IsNumber()
    @IsPositive()
    @Min(1)
    sector_id:number;

    @IsNumber()
    @IsPositive()
    @Min(1)
    direccion_id:number;

    @IsBoolean()
    verificada:boolean;

    @IsString()
    @MinLength(5)
    size:string;
    
    @IsString()
    @MinLength(5)
    ubicacion:string;
}
