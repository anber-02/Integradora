import { PartialType } from '@nestjs/mapped-types';
import { CreateAsesorEmpresarialInfoDto } from './create-asesor_empresarial_info.dto';

export class UpdateAsesorEmpresarialInfoDto extends PartialType(CreateAsesorEmpresarialInfoDto) {}
