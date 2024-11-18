import { PartialType } from '@nestjs/mapped-types';
import { AssignObservacionToProjectDto } from './assign-observacion-to-project.dto';

export class UpdateObservacionDto extends PartialType(
  AssignObservacionToProjectDto,
) {}
