import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { HabilidadService } from './habilidad.service';
import { CreateHabilidadDto } from './dto/create-habilidad.dto';
import { UpdateHabilidadDto } from './dto/update-habilidad.dto';
import { Auth } from '../auth/decorator/auth.decorator';
import { Role } from '../auth/enums/rol.enum';

@Controller('habilidad')
export class HabilidadController {
  constructor(private readonly habilidadService: HabilidadService) {}

  @Auth(Role.ADMIN)
  @Post()
  create(@Body() createHabilidadDto: CreateHabilidadDto) {
    return this.habilidadService.create(createHabilidadDto);
  }

  @Auth(Role.ADMIN, Role.EMPRESA)
  @Get()
  findAll() {
    return this.habilidadService.findAll();
  }

  @Auth(Role.ADMIN, Role.EMPRESA)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.habilidadService.findOne(+id);
  }

  @Auth(Role.ADMIN, Role.EMPRESA)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateHabilidadDto: UpdateHabilidadDto,
  ) {
    return this.habilidadService.update(+id, updateHabilidadDto);
  }

  @Auth(Role.ADMIN, Role.EMPRESA)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.habilidadService.remove(+id);
  }
}
