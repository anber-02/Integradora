import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AreaDesarrolloService } from './area-desarrollo.service';
import { CreateAreaDesarrolloDto } from './dto/create-area-desarrollo.dto';
import { UpdateAreaDesarrolloDto } from './dto/update-area-desarrollo.dto';

@Controller('area-desarrollo')
export class AreaDesarrolloController {
  constructor(private readonly areaDesarrolloService: AreaDesarrolloService) {}

  @Post()
  create(@Body() createAreaDesarrolloDto: CreateAreaDesarrolloDto) {
    return this.areaDesarrolloService.create(createAreaDesarrolloDto);
  }

  @Get()
  findAll() {
    return this.areaDesarrolloService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.areaDesarrolloService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAreaDesarrolloDto: UpdateAreaDesarrolloDto,
  ) {
    return this.areaDesarrolloService.update(+id, updateAreaDesarrolloDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.areaDesarrolloService.remove(+id);
  }
}
