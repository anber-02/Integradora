import { Module } from '@nestjs/common';
import { DocumentosService } from './documentos.service';
import { DocumentosController } from './documentos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Documento } from './entities/documento.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Documento])],
  controllers: [DocumentosController],
  providers: [DocumentosService],
})
export class DocumentosModule {}
