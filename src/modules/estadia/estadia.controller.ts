import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EstadiaService } from './estadia.service';
import { CreateEstadiaDto } from './dto/create-estadia.dto';
import { UpdateEstadiaDto } from './dto/update-estadia.dto';

@Controller('estadia')
export class EstadiaController {
  constructor(private readonly estadiaService: EstadiaService) {}

  @Post()
  create(@Body() createEstadiaDto: CreateEstadiaDto) {
    return this.estadiaService.create(createEstadiaDto);
  }

  @Get()
  findAll() {
    return this.estadiaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.estadiaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEstadiaDto: UpdateEstadiaDto) {
    return this.estadiaService.update(+id, updateEstadiaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.estadiaService.remove(+id);
  }
}
