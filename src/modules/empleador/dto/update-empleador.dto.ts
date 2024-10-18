import { PartialType } from '@nestjs/mapped-types';
import { CreateEmpleadorDto } from './create-empleador.dto';

export class UpdateEmpleadorDto extends PartialType(CreateEmpleadorDto) {}
