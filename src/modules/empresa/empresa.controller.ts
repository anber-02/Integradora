import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { EmpresaService } from './empresa.service';
import { CreateEmpresaDto } from './dto/create-empresa.dto';
import { UpdateEmpresaDto } from './dto/update-empresa.dto';
import { GetUser } from '../auth/decorator/get-user.decorator';
import { Role } from '../auth/enums/rol.enum';
import { Auth } from '../auth/decorator/auth.decorator';
import { UpdateDireccionDto } from '../direccion/dto/update-direccion.dto';

@Controller('empresa')
export class EmpresaController {
  constructor(private readonly empresaService: EmpresaService) {}

  @Auth(Role.EMPRESA)
  @Post()
  create(@Body() createEmpresaDto: CreateEmpresaDto, @GetUser() user) {
    createEmpresaDto.usuario_id = user.sub;
    return this.empresaService.create(createEmpresaDto);
  }

  @Auth(Role.EMPRESA)
  @Patch('/direccion/:id')
  updateAddress(
    @Param('id') id: string,
    @Body() updateDireccionDto: UpdateDireccionDto,
  ) {
    return this.empresaService.updateAdress(+id, updateDireccionDto);
  }

  @Auth(Role.ADMIN)
  @Get('estadisticas')
  async obtenerEstadisticas() {
    return this.empresaService.obtenerEstadisticas();
  }

  @Auth(Role.ADMIN, Role.EMPRESA)
  @Get()
  findAll(@GetUser() user) {
    if (user.rol === Role.EMPRESA) {
      return this.empresaService.findEmpresasByUser(user.sub); // Solo devuelve la empresa asociada con el id del usuario
    }
    return this.empresaService.findAll();
  }

  @Auth(Role.ADMIN)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.empresaService.findOne(+id);
  }

  @Auth(Role.EMPRESA)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEmpresaDto: UpdateEmpresaDto) {
    return this.empresaService.update(+id, updateEmpresaDto);
  }

  @Auth(Role.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.empresaService.remove(+id);
  }
}
