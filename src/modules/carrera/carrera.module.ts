import { Module } from '@nestjs/common';
import { CarreraService } from './carrera.service';
import { CarreraController } from './carrera.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Carrera } from './entities/carrera.entity';
import { ImagesModule } from 'src/shared/images/images.module';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Module({
  imports: [
    TypeOrmModule.forFeature([Carrera]),
    // MULTER
    MulterModule.register({
      storage: diskStorage({
        destination: '../../uploads',
        filename: (req, file, cb) => {
          console.log(file);
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const extension = file.originalname.split('.').pop();
          cb(null, file.fieldname + '-' + uniqueSuffix + '.' + extension);
        },
      }),
    }),
    ImagesModule,
  ],
  controllers: [CarreraController],
  providers: [CarreraService],
})
export class CarreraModule {}
