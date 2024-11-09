import { Controller, Get, Body, Patch, Param } from '@nestjs/common';
import { DireccionService } from './direccion.service';
import { UpdateDireccionDto } from './dto/update-direccion.dto';

@Controller('direccion')
export class DireccionController {
  constructor(private readonly direccionService: DireccionService) {}

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.direccionService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDireccionDto: UpdateDireccionDto,
  ) {
    return this.direccionService.update(+id, updateDireccionDto);
  }
}
