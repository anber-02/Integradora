import { Controller, Get, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/archivo1',
        filename: (req, file, cb) => {
          cb(null, file.originalname.split('.')[0] + '_' + Date.now() + '.pdf')
        },
      }),
    })
  )
  @Post('file')
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return { msg: `Archivo ${file.filename} cargado correctamente` };
  }
  
}
