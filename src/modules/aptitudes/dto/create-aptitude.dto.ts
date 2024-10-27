import { IsString } from 'class-validator';

export class CreateAptitudeDto {
  @IsString()
  aptitud: string;
}
