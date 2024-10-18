import { Module } from '@nestjs/common';
import { EstadiaService } from './estadia.service';
import { EstadiaController } from './estadia.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Estadia } from './entities/estadia.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Estadia])],
  controllers: [EstadiaController],
  providers: [EstadiaService],
})
export class EstadiaModule {}
