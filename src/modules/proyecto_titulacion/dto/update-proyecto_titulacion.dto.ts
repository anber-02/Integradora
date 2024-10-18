import { PartialType } from '@nestjs/mapped-types';
import { CreateProyectoTitulacionDto } from './create-proyecto_titulacion.dto';

export class UpdateProyectoTitulacionDto extends PartialType(CreateProyectoTitulacionDto) {}
