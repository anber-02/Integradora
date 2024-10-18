import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AsesorEmpresarialInfoService } from './asesor_empresarial_info.service';
import { CreateAsesorEmpresarialInfoDto } from './dto/create-asesor_empresarial_info.dto';
import { UpdateAsesorEmpresarialInfoDto } from './dto/update-asesor_empresarial_info.dto';

@Controller('asesor-empresarial-info')
export class AsesorEmpresarialInfoController {
  constructor(private readonly asesorEmpresarialInfoService: AsesorEmpresarialInfoService) {}

  @Post()
  create(@Body() createAsesorEmpresarialInfoDto: CreateAsesorEmpresarialInfoDto) {
    return this.asesorEmpresarialInfoService.create(createAsesorEmpresarialInfoDto);
  }

  @Get()
  findAll() {
    return this.asesorEmpresarialInfoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.asesorEmpresarialInfoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAsesorEmpresarialInfoDto: UpdateAsesorEmpresarialInfoDto) {
    return this.asesorEmpresarialInfoService.update(+id, updateAsesorEmpresarialInfoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.asesorEmpresarialInfoService.remove(+id);
  }
}
