import { IsString } from 'class-validator';

export class CreateAreaDesarrolloDto {
  @IsString()
  area: string;
}
