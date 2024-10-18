import { Module } from '@nestjs/common';
import { EmpleadorService } from './empleador.service';
import { EmpleadorController } from './empleador.controller';

@Module({
  controllers: [EmpleadorController],
  providers: [EmpleadorService],
})
export class EmpleadorModule {}
