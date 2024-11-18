import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { ObservacionService } from './observacion.service';
import { AssignObservacionToProjectDto } from './dto/assign-observacion-to-project.dto';
// import { UpdateObservacionDto } from './dto/update-observacion.dto';
import { AssignObservacionToEmpresaDto } from './dto/assign-observacion-to-empresa.dto';

@Controller('observacion')
export class ObservacionController {
  constructor(private readonly observacionService: ObservacionService) {}

  @Post('/project')
  assignObservacionToProject(
    @Body() assignObservacionToProject: AssignObservacionToProjectDto,
  ) {
    return this.observacionService.assignObservacionToProject(
      assignObservacionToProject,
    );
  }

  @Post('/empresa')
  assignObservacionToEmpresa(
    @Body() assignObservacionToEmpresa: AssignObservacionToEmpresaDto,
  ) {
    return this.observacionService.assignObservacionToEmpresa(
      assignObservacionToEmpresa,
    );
  }

  @Get()
  findAll() {
    return this.observacionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.observacionService.findOne(+id);
  }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateObservacionDto: UpdateObservacionDto,
  // ) {
  //   return this.observacionService.update(+id, updateObservacionDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.observacionService.remove(+id);
  }
}
