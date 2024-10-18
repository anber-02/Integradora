import { Module } from '@nestjs/common';
import { EmpleadorService } from './empleador.service';
import { EmpleadorController } from './empleador.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Empleador } from './entities/empleador.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Empleador])],
  controllers: [EmpleadorController],
  providers: [EmpleadorService],
})
export class EmpleadorModule {}
