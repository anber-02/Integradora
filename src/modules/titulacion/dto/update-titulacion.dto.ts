import { PartialType } from '@nestjs/mapped-types';
import { CreateTitulacionDto } from './create-titulacion.dto';

export class UpdateTitulacionDto extends PartialType(CreateTitulacionDto) {}
