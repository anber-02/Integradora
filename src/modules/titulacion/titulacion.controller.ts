import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TitulacionService } from './titulacion.service';
import { CreateTitulacionDto } from './dto/create-titulacion.dto';
import { UpdateTitulacionDto } from './dto/update-titulacion.dto';

@Controller('titulacion')
export class TitulacionController {
  constructor(private readonly titulacionService: TitulacionService) {}

  @Post()
  create(@Body() createTitulacionDto: CreateTitulacionDto) {
    return this.titulacionService.create(createTitulacionDto);
  }

  @Get()
  findAll() {
    return this.titulacionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.titulacionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTitulacionDto: UpdateTitulacionDto) {
    return this.titulacionService.update(+id, updateTitulacionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.titulacionService.remove(+id);
  }
}
