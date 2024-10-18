import { Module } from '@nestjs/common';
import { HabilidadService } from './habilidad.service';
import { HabilidadController } from './habilidad.controller';

@Module({
  controllers: [HabilidadController],
  providers: [HabilidadService],
})
export class HabilidadModule {}
