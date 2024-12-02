import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  UploadedFiles,
  Put,
  Param,
} from '@nestjs/common';
import { DocumentosService } from './documentos.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { CreateDocumentoDto } from './dto/create-documento.dto';

@Controller('documentos')
export class DocumentosController {
  constructor(private readonly documentosService: DocumentosService) {}

  @Post('upload/:empresaId')
  @UseInterceptors(FilesInterceptor('files', 3))
  async uploadDocuments(
    @Param('empresaId') empresaId: number,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    // Llamar al servicio de documentos para subir los archivos a S3 y guardar la URL en la base de datos
    const documentos = await this.documentosService.uploadFiles(
      files,
      empresaId,
    );
    return documentos; // Retorna los documentos guardados en la base de datos
  }
  // Ruta para que el administrador valide los documentos
  @Put(':documentId/status')
  async validateDocument(
    @Param('documentId') documentId: number,
    @Body() body: CreateDocumentoDto,
  ) {
    return this.documentosService.updateStatus(documentId, body);
  }
}
