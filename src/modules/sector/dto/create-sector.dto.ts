import {   IsString, MinLength } from "class-validator";


export class CreateSectorDto {
    @IsString()
    @MinLength(3)
    nombre:string;
}
