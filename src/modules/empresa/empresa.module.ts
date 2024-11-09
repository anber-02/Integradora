import { Module } from '@nestjs/common';
import { EmpresaService } from './empresa.service';
import { EmpresaController } from './empresa.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Empresa } from './entities/empresa.entity';
import { AuthModule } from '../auth/auth.module';
import { DireccionModule } from '../direccion/direccion.module';

@Module({
  imports: [TypeOrmModule.forFeature([Empresa]), AuthModule, DireccionModule],
  controllers: [EmpresaController],
  providers: [EmpresaService],
})
export class EmpresaModule {}
