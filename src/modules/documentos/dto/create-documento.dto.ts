import { IsEnum } from 'class-validator';
import { Status } from '../enums/status.enum';

export class CreateDocumentoDto {
  @IsEnum(Status)
  status: Status;
}
