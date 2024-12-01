import { IsEnum } from 'class-validator';
import { Status } from '../enums/status.enum';

export class UpdateProjectStatusDto {
  @IsEnum(Status)
  status: Status;
}
