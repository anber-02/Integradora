import { Module } from '@nestjs/common';
import { TitulacionService } from './titulacion.service';
import { TitulacionController } from './titulacion.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Titulacion } from './entities/titulacion.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Titulacion])],
  controllers: [TitulacionController],
  providers: [TitulacionService],
})
export class TitulacionModule {}
