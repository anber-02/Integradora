import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AptitudesService } from './aptitudes.service';
import { CreateAptitudeDto } from './dto/create-aptitude.dto';
import { UpdateAptitudeDto } from './dto/update-aptitude.dto';

@Controller('aptitudes')
export class AptitudesController {
  constructor(private readonly aptitudesService: AptitudesService) {}

  @Post()
  create(@Body() createAptitudeDto: CreateAptitudeDto) {
    return this.aptitudesService.create(createAptitudeDto);
  }

  @Get()
  findAll() {
    return this.aptitudesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.aptitudesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAptitudeDto: UpdateAptitudeDto,
  ) {
    return this.aptitudesService.update(+id, updateAptitudeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.aptitudesService.remove(+id);
  }
}
