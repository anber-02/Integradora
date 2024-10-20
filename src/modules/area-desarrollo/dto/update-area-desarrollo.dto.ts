import { PartialType } from '@nestjs/mapped-types';
import { CreateAreaDesarrolloDto } from './create-area-desarrollo.dto';

export class UpdateAreaDesarrolloDto extends PartialType(
  CreateAreaDesarrolloDto,
) {}
