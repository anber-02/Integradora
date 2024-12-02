import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { DocumentosService } from './documentos.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { CreateDocumentoDto } from './dto/create-documento.dto';

@Controller('documentos')
export class DocumentosController {
  constructor(private readonly documentosService: DocumentosService) {}

  @Post()
  @UseInterceptors(FilesInterceptor('files', 3))
  async uploadDocuments(
    @UploadedFiles() files: Express.Multer.File[],
    @Body() body: CreateDocumentoDto,
  ) {
    // Llamar al servicio de documentos para subir los archivos a S3 y guardar la URL en la base de datos
    const documentos = await this.documentosService.uploadFiles(
      files,
      body.empresa_id,
    );
    return documentos; // Retorna los documentos guardados en la base de datos
  }
}
