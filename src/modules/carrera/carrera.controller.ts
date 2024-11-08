import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  InternalServerErrorException,
} from '@nestjs/common';
import { CarreraService } from './carrera.service';
import { CreateCarreraDto } from './dto/create-carrera.dto';
import { UpdateCarreraDto } from './dto/update-carrera.dto';
import { FileInterceptor } from '@nestjs/platform-express';
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
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createCarreraDto: CreateCarreraDto,
  ) {
    try {
      if (file) {
        console.log(file.path);
        const result = await this.imageService.uploadImage(file.path); // Sube la imagen a Cloudinary
        createCarreraDto.imageUrl = result.secure_url; // Almacena la URL en el DTO
      }

      return this.carreraService.create(createCarreraDto);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
  @Get()
  findAll() {
    return this.carreraService.findAll();
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
  @Post('assign-aptitudes')
  async assignAptitudes(
    @Body() assignAptitudesToCareerDto: AssignAptitudToCareerDto,
  ) {
    return this.carreraService.assignAptitudesToCareer(
      assignAptitudesToCareerDto,
    );
  }
  // Ruta para asignar areas de desarrollo a una carrera
  @Post('assign-areas')
  async assignAreas(@Body() assignAreaToCareerDto: AssignAreaToCareerDto) {
    return this.carreraService.assignAreasToCareer(assignAreaToCareerDto);
  }
}
