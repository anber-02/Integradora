import { Module } from '@nestjs/common';
import { DocumentosService } from './documentos.service';
import { DocumentosController } from './documentos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Documento } from './entities/documento.entity';
import { S3 } from 'src/provider/s3/s3';

@Module({
  imports: [TypeOrmModule.forFeature([Documento])],
  controllers: [DocumentosController],
  providers: [DocumentosService, S3],
})
export class DocumentosModule {}
