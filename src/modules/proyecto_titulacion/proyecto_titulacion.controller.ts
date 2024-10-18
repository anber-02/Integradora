import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProyectoTitulacionService } from './proyecto_titulacion.service';
import { CreateProyectoTitulacionDto } from './dto/create-proyecto_titulacion.dto';
import { UpdateProyectoTitulacionDto } from './dto/update-proyecto_titulacion.dto';

@Controller('proyecto-titulacion')
export class ProyectoTitulacionController {
  constructor(private readonly proyectoTitulacionService: ProyectoTitulacionService) {}

  @Post()
  create(@Body() createProyectoTitulacionDto: CreateProyectoTitulacionDto) {
    return this.proyectoTitulacionService.create(createProyectoTitulacionDto);
  }

  @Get()
  findAll() {
    return this.proyectoTitulacionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.proyectoTitulacionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProyectoTitulacionDto: UpdateProyectoTitulacionDto) {
    return this.proyectoTitulacionService.update(+id, updateProyectoTitulacionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.proyectoTitulacionService.remove(+id);
  }
}
