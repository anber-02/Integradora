import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EmpleadorService } from './empleador.service';
import { CreateEmpleadorDto } from './dto/create-empleador.dto';
import { UpdateEmpleadorDto } from './dto/update-empleador.dto';

@Controller('empleador')
export class EmpleadorController {
  constructor(private readonly empleadorService: EmpleadorService) {}

  @Post()
  create(@Body() createEmpleadorDto: CreateEmpleadorDto) {
    return this.empleadorService.create(createEmpleadorDto);
  }

  @Get()
  findAll() {
    return this.empleadorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.empleadorService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEmpleadorDto: UpdateEmpleadorDto) {
    return this.empleadorService.update(+id, updateEmpleadorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.empleadorService.remove(+id);
  }
}
