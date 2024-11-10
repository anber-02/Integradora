import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  InternalServerErrorException,
  Query,
  UploadedFiles,
  UploadedFile,
} from '@nestjs/common';
import { CarreraService } from './carrera.service';
import { CreateCarreraDto } from './dto/create-carrera.dto';
import { UpdateCarreraDto } from './dto/update-carrera.dto';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { ImagesService } from 'src/shared/images/images.service';
import { Auth } from '../auth/decorator/auth.decorator';
import { Role } from '../auth/enums/rol.enum';
import { AssignAptitudToCareerDto } from './dto/assign-aptitud-to-career.dto';
import { AssignAreaToCareerDto } from './dto/assign-area-to-career.dto';

@Controller('carrera')
export class CarreraController {
  constructor(
    private readonly carreraService: CarreraService,
    private readonly imageService: ImagesService,
  ) {}

  @Auth(Role.ADMIN)
  @Post()
  @UseInterceptors(FilesInterceptor('images'))
  async create(
    @Body() createCarreraDto: CreateCarreraDto,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    try {
      if (files) {
        const iconResult = await this.imageService.uploadImage(files[0].path);
        const imageResult = await this.imageService.uploadImage(files[1].path);
        createCarreraDto.icon = iconResult.secure_url; // Almacena la URL en el DTO
        createCarreraDto.image_url = imageResult.secure_url; // Almacena la URL en el DTO
      }

      return this.carreraService.create(createCarreraDto);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  @Get()
  findAll(@Query('nivel_educativo') nivelEducativo: string) {
    let niveles: string[] = [];

    if (!nivelEducativo) return this.carreraService.findAll(niveles);

    if (nivelEducativo.includes('/')) {
      niveles = nivelEducativo.split('/');
    } else {
      niveles = [nivelEducativo];
    }
    return this.carreraService.findAll(niveles);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.carreraService.findOne(+id);
  }

  @Auth(Role.ADMIN)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCarreraDto: UpdateCarreraDto) {
    return this.carreraService.update(+id, updateCarreraDto);
  }

  @Auth(Role.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.carreraService.remove(+id);
  }

  // Ruta para asignar aptitudes a una carrera
  @Auth(Role.ADMIN)
  @Post('assign-aptitudes')
  async assignAptitudes(
    @Body() assignAptitudesToCareerDto: AssignAptitudToCareerDto,
  ) {
    return this.carreraService.assignAptitudesToCareer(
      assignAptitudesToCareerDto,
    );
  }
  // Ruta para asignar areas de desarrollo a una carrera
  @Auth(Role.ADMIN)
  @Post('assign-areas')
  async assignAreas(@Body() assignAreaToCareerDto: AssignAreaToCareerDto) {
    return this.carreraService.assignAreasToCareer(assignAreaToCareerDto);
  }

  // Endpoint para actualizar solo el icono de la carrera
  @Auth(Role.ADMIN)
  @Patch(':id/icon')
  @UseInterceptors(FileInterceptor('icon', { dest: './uploads' })) // El campo se llama 'icon'
  async updateIcon(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File, // Recibe el archivo cargado
  ) {
    try {
      if (file) {
        const iconResult = await this.imageService.uploadImage(file.path);
        return this.carreraService.update(+id, { icon: iconResult.secure_url });
      }
      throw new InternalServerErrorException('No se ha cargado ninguna imagen');
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  // Endpoint para actualizar solo la imagen de la carrera
  @Auth(Role.ADMIN)
  @Patch(':id/image')
  @UseInterceptors(FileInterceptor('image', { dest: './uploads' })) // El campo se llama 'image'
  async updateImage(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File, // Recibe el archivo cargado
  ) {
    try {
      if (file) {
        const imageResult = await this.imageService.uploadImage(file.path);
        return this.carreraService.update(+id, {
          image_url: imageResult.secure_url,
        });
      }
      throw new InternalServerErrorException('No se ha cargado ninguna imagen');
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
