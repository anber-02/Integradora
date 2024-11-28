import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ProyectoService } from './proyecto.service';
import { CreateProyectoDto } from './dto/create-proyecto.dto';
import { UpdateProyectoDto } from './dto/update-proyecto.dto';
import { Auth } from '../auth/decorator/auth.decorator';
import { Role } from '../auth/enums/rol.enum';

@Controller('proyecto')
export class ProyectoController {
  constructor(private readonly proyectoService: ProyectoService) {}

  @Auth(Role.EMPRESA)
  @Post()
  create(@Body() createProyectoDto: CreateProyectoDto) {
    return this.proyectoService.create(createProyectoDto);
  }

  @Get('/')
  findAll(@Query('status') status: string) {
    return this.proyectoService.findAll(status);
  }
  @Get('/empresa/:id')
  findByEmpresa(
    @Param('id') empresa_id: number,
    @Query('status') status: string,
  ) {
    return this.proyectoService.findByEmpresa(empresa_id, status);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.proyectoService.findOne(+id);
  }

  @Patch('/empresa/:empresaId/:proyectoId')
  update(
    @Param('empresaId') empresaId: string,
    @Param('proyectoId') proyectoId: string,
    @Body() updateProyectoDto: UpdateProyectoDto,
  ) {
    return this.proyectoService.update(+empresaId, updateProyectoDto);
  }

  @Auth(Role.EMPRESA)
  @Delete('/empresa/:empresaId/:proyectoId')
  remove(
    @Param('empresaId') empresaId: string,
    @Param('proyectoId') proyectoId: string,
  ) {
    return this.proyectoService.remove(+empresaId, +proyectoId);
  }
}
