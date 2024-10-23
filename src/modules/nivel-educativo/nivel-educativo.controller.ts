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
import { NivelEducativoService } from './nivel-educativo.service';
import { CreateNivelEducativoDto } from './dto/create-nivel-educativo.dto';
import { UpdateNivelEducativoDto } from './dto/update-nivel-educativo.dto';
import { Auth } from '../auth/decorator/auth.decorator';
import { Role } from '../auth/enums/rol.enum';

@Controller('nivel-educativo')
export class NivelEducativoController {
  constructor(private readonly nivelEducativoService: NivelEducativoService) {}

  @Auth(Role.ADMIN)
  @Post()
  create(@Body() createNivelEducativoDto: CreateNivelEducativoDto) {
    return this.nivelEducativoService.create(createNivelEducativoDto);
  }

  @Get()
  findAll(@Query('tipo') tipo: string) {
    return this.nivelEducativoService.findAll(tipo);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.nivelEducativoService.findOne(+id);
  }

  @Auth(Role.ADMIN)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateNivelEducativoDto: UpdateNivelEducativoDto,
  ) {
    return this.nivelEducativoService.update(+id, updateNivelEducativoDto);
  }

  @Auth(Role.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.nivelEducativoService.remove(+id);
  }
}
