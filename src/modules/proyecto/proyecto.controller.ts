import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ProyectoService } from './proyecto.service';
import { CreateProyectoDto } from './dto/create-proyecto.dto';
import { UpdateProyectoDto } from './dto/update-proyecto.dto';
import { Auth } from '../auth/decorator/auth.decorator';
import { Role } from '../auth/enums/rol.enum';

@Controller('proyecto')
export class ProyectoController {
  constructor(private readonly proyectoService: ProyectoService) {}

  @Auth(Role.EMPRESA)
  @Post()
  create(@Body() createProyectoDto: CreateProyectoDto) {
    return this.proyectoService.create(createProyectoDto);
  }

  @Get('/')
  findAll(@Query('status') status: string) {
    return this.proyectoService.findAll(status);
  }
  @Get('/empresa/:id')
  findByEmpresa(
    @Param('id') empresa_id: number,
    @Query('status') status: string,
  ) {
    return this.proyectoService.findByEmpresa(empresa_id, status);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.proyectoService.findOne(+id);
  }

  @Patch(':id')
  @Auth(Role.EMPRESA)
  update(
  @Param('id') id: string,
  @Body() body: Partial<CreateProyectoDto>,
) {
  return this.proyectoService.patch(id, body);
}

  @Delete('/empresa/:id')
  remove(@Param('id') id: string) {
    return this.proyectoService.remove(+id);
  }


}
