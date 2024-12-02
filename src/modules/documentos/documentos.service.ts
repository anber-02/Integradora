import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Documento } from './entities/documento.entity';
import { Repository } from 'typeorm';
import { S3 } from 'src/provider/s3/s3';

@Injectable()
export class DocumentosService {
  constructor(
    @InjectRepository(Documento)
    private readonly documentoRepository: Repository<Documento>,
    private readonly s3Provider: S3,
  ) {}

  async uploadFiles(files: Express.Multer.File[], empresaId: number) {
    const documentos: Documento[] = [];

    for (const file of files) {
      // Subir archivo a S3
      const fileUrl = await this.s3Provider.uploadFile(file);

      // Crear una entrada en la base de datos con la URL del archivo
      const documento = this.documentoRepository.create({
        nombre_archivo: file.originalname, // Nombre original del archivo
        tipo_archivo: file.mimetype, // Tipo de archivo (PDF, etc.)
        url: fileUrl.Location, // La URL de S3
        empresa_id: empresaId, // Relacionar con la empresa
      });

      // Guardar el documento en la base de datos
      await this.documentoRepository.save(documento);
      documentos.push(documento);
    }

    return documentos; // Retorna los documentos creados
  }
}
