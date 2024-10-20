import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ObservacionService } from './observacion.service';
import { CreateObservacionDto } from './dto/create-observacion.dto';
import { UpdateObservacionDto } from './dto/update-observacion.dto';

@Controller('observacion')
export class ObservacionController {
  constructor(private readonly observacionService: ObservacionService) {}

  @Post()
  create(@Body() createObservacionDto: CreateObservacionDto) {
    return this.observacionService.create(createObservacionDto);
  }

  @Get()
  findAll() {
    return this.observacionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.observacionService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateObservacionDto: UpdateObservacionDto,
  ) {
    return this.observacionService.update(+id, updateObservacionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.observacionService.remove(+id);
  }
}
