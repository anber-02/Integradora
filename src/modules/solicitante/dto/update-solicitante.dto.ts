import { PartialType } from '@nestjs/mapped-types';
import { CreateSolicitanteDto } from './create-solicitante.dto';

export class UpdateSolicitanteDto extends PartialType(CreateSolicitanteDto) {}
