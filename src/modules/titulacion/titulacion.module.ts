import { Module } from '@nestjs/common';
import { TitulacionService } from './titulacion.service';
import { TitulacionController } from './titulacion.controller';

@Module({
  controllers: [TitulacionController],
  providers: [TitulacionService],
})
export class TitulacionModule {}
