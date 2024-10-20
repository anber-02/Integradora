import { Module } from '@nestjs/common';
import { SolicitanteService } from './solicitante.service';
import { SolicitanteController } from './solicitante.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Solicitante } from './entities/solicitante.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Solicitante])],
  controllers: [SolicitanteController],
  providers: [SolicitanteService],
})
export class SolicitanteModule {}
