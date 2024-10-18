import { Module } from '@nestjs/common';
import { ProyectoHabilidadService } from './proyecto_habilidad.service';
import { ProyectoHabilidadController } from './proyecto_habilidad.controller';

@Module({
  controllers: [ProyectoHabilidadController],
  providers: [ProyectoHabilidadService],
})
export class ProyectoHabilidadModule {}
