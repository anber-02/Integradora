import { Module } from '@nestjs/common';
import { NivelEducativoService } from './nivel-educativo.service';
import { NivelEducativoController } from './nivel-educativo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NivelEducativo } from './entities/nivel-educativo.entity';
import { CarreraModule } from '../carrera/carrera.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([NivelEducativo]),
    CarreraModule,
    AuthModule,
  ],
  controllers: [NivelEducativoController],
  providers: [NivelEducativoService],
})
export class NivelEducativoModule {}
