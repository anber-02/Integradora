import { Module } from '@nestjs/common';
import { AsesorEmpresarialInfoService } from './asesor_empresarial_info.service';
import { AsesorEmpresarialInfoController } from './asesor_empresarial_info.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AsesorEmpresarialInfo } from './entities/asesor_empresarial_info.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AsesorEmpresarialInfo])],
  controllers: [AsesorEmpresarialInfoController],
  providers: [AsesorEmpresarialInfoService],
})
export class AsesorEmpresarialInfoModule {}
