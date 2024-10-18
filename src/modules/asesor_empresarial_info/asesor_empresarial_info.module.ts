import { Module } from '@nestjs/common';
import { AsesorEmpresarialInfoService } from './asesor_empresarial_info.service';
import { AsesorEmpresarialInfoController } from './asesor_empresarial_info.controller';

@Module({
  controllers: [AsesorEmpresarialInfoController],
  providers: [AsesorEmpresarialInfoService],
})
export class AsesorEmpresarialInfoModule {}
