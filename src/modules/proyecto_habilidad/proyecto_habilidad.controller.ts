import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProyectoHabilidadService } from './proyecto_habilidad.service';
import { CreateProyectoHabilidadDto } from './dto/create-proyecto_habilidad.dto';
import { UpdateProyectoHabilidadDto } from './dto/update-proyecto_habilidad.dto';

@Controller('proyecto-habilidad')
export class ProyectoHabilidadController {
  constructor(private readonly proyectoHabilidadService: ProyectoHabilidadService) {}

  @Post()
  create(@Body() createProyectoHabilidadDto: CreateProyectoHabilidadDto) {
    return this.proyectoHabilidadService.create(createProyectoHabilidadDto);
  }

  @Get()
  findAll() {
    return this.proyectoHabilidadService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.proyectoHabilidadService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProyectoHabilidadDto: UpdateProyectoHabilidadDto) {
    return this.proyectoHabilidadService.update(+id, updateProyectoHabilidadDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.proyectoHabilidadService.remove(+id);
  }
}
