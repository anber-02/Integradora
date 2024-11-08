import { IsInt, IsArray } from 'class-validator';

export class AssignAptitudToCareerDto {
  @IsInt()
  carreraId: number;

  @IsArray()
  @IsInt({ each: true })
  aptitudesIds: number[];
}
