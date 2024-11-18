import { Module } from '@nestjs/common';
import { ObservacionService } from './observacion.service';
import { ObservacionController } from './observacion.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Observacion } from './entities/observacion.entity';
import { Empresa } from '../empresa/entities/empresa.entity';
import { Proyecto } from '../proyecto/entities/proyecto.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Observacion, Empresa, Proyecto])],
  controllers: [ObservacionController],
  providers: [ObservacionService],
})
export class ObservacionModule {}
