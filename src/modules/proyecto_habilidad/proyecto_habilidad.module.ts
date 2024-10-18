import { Module } from '@nestjs/common';
import { ProyectoHabilidadService } from './proyecto_habilidad.service';
import { ProyectoHabilidadController } from './proyecto_habilidad.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProyectoHabilidad } from './entities/proyecto_habilidad.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProyectoHabilidad])],
  controllers: [ProyectoHabilidadController],
  providers: [ProyectoHabilidadService],
})
export class ProyectoHabilidadModule {}
