import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';

@Injectable()
export class S3 {
  private s3: AWS.S3;
  private bucketName: string;
  constructor() {
    this.s3 = new AWS.S3({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    });
    this.bucketName = process.env.AWS_BUCKET_NAME;
  }

  // Subir varios archivos
  async uploadFiles(files: Express.Multer.File[]): Promise<any[]> {
    const uploadPromises = files.map((file) => this.uploadFile(file));
    return await Promise.all(uploadPromises);
  }

  // Subir un solo archivo
  async uploadFile(file: Express.Multer.File) {
    const params = {
      Bucket: this.bucketName,
      Key: `uploads/${Date.now()}-${file.originalname}`, // Nombre único para evitar colisiones
      Body: file.buffer,
      ContentType: file.mimetype,
    };

    try {
      const data = await this.s3.upload(params).promise();
      return data; // Devuelve la URL del archivo subido
    } catch (error) {
      console.error('Error al subir archivo a S3', error);
      throw new Error('Error al subir archivo a S3');
    }
  }
}
