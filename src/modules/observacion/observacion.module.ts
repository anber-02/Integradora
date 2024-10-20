import { Module } from '@nestjs/common';
import { ObservacionService } from './observacion.service';
import { ObservacionController } from './observacion.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Observacion } from './entities/observacion.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Observacion])],
  controllers: [ObservacionController],
  providers: [ObservacionService],
})
export class ObservacionModule {}
