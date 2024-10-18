import { IsNumber, IsOptional , IsDate , IsPositive, IsString, Min, MinLength } from "class-validator";

export class CreateEstadiaDto {

    @IsNumber()
    @Min(1)
    titulacion_id:number;

}
