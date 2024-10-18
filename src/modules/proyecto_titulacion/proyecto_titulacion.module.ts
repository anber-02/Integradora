import { Module } from '@nestjs/common';
import { ProyectoTitulacionService } from './proyecto_titulacion.service';
import { ProyectoTitulacionController } from './proyecto_titulacion.controller';

@Module({
  controllers: [ProyectoTitulacionController],
  providers: [ProyectoTitulacionService],
})
export class ProyectoTitulacionModule {}
