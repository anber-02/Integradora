import { Module } from '@nestjs/common';
import { NivelEducativoService } from './nivel-educativo.service';
import { NivelEducativoController } from './nivel-educativo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NivelEducativo } from './entities/nivel-educativo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([NivelEducativo])],
  controllers: [NivelEducativoController],
  providers: [NivelEducativoService],
})
export class NivelEducativoModule {}
