import { Module } from '@nestjs/common';
import { HabilidadService } from './habilidad.service';
import { HabilidadController } from './habilidad.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Habilidad } from './entities/habilidad.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Habilidad]), AuthModule],
  controllers: [HabilidadController],
  providers: [HabilidadService],
})
export class HabilidadModule {}
