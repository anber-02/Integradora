import { PartialType } from '@nestjs/mapped-types';
import { CreateAptitudeDto } from './create-aptitude.dto';

export class UpdateAptitudeDto extends PartialType(CreateAptitudeDto) {}
