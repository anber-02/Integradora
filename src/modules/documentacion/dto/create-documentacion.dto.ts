import { IsNumber, IsOptional , IsDate , IsPositive, IsString, Min, MinLength } from "class-validator";

export class CreateDocumentacionDto {
    @IsString()
    @MinLength(5)
    nombre_archivo:string;

    @IsString()
    @MinLength(5)
    tipo_archivo:string;

    @IsDate()
    @IsOptional()
    fecha_subida: Date;
    
    @IsString()
    @MinLength(3)
    url: string;

    @IsNumber()
    @IsPositive()
    empresa_id: number;
}
