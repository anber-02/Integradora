import { PartialType } from '@nestjs/mapped-types';
import { CreateProyectoHabilidadDto } from './create-proyecto_habilidad.dto';

export class UpdateProyectoHabilidadDto extends PartialType(CreateProyectoHabilidadDto) {}
