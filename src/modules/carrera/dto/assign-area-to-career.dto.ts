// src/carreras/dto/assign-area-to-career.dto.ts
import { IsInt, IsArray } from 'class-validator';

export class AssignAreaToCareerDto {
  @IsInt()
  carreraId: number;

  @IsArray()
  @IsInt({ each: true })
  areaDesarrolloIds: number[];
}
