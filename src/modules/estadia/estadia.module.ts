import { Module } from '@nestjs/common';
import { EstadiaService } from './estadia.service';
import { EstadiaController } from './estadia.controller';

@Module({
  controllers: [EstadiaController],
  providers: [EstadiaService],
})
export class EstadiaModule {}
