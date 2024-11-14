import { Module } from '@nestjs/common';
import { ProyectoService } from './proyecto.service';
import { ProyectoController } from './proyecto.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Proyecto } from './entities/proyecto.entity';
import { AuthModule } from '../auth/auth.module';
import { Habilidad } from '../habilidad/entities/habilidad.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Proyecto, Habilidad]), AuthModule],
  controllers: [ProyectoController],
  providers: [ProyectoService],
})
export class ProyectoModule {}
