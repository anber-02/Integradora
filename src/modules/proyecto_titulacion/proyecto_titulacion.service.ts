import { Injectable } from '@nestjs/common';
import { CreateProyectoTitulacionDto } from './dto/create-proyecto_titulacion.dto';
import { UpdateProyectoTitulacionDto } from './dto/update-proyecto_titulacion.dto';

@Injectable()
export class ProyectoTitulacionService {
  create(createProyectoTitulacionDto: CreateProyectoTitulacionDto) {
    return 'This action adds a new proyectoTitulacion';
  }

  findAll() {
    return `This action returns all proyectoTitulacion`;
  }

  findOne(id: number) {
    return `This action returns a #${id} proyectoTitulacion`;
  }

  update(id: number, updateProyectoTitulacionDto: UpdateProyectoTitulacionDto) {
    return `This action updates a #${id} proyectoTitulacion`;
  }

  remove(id: number) {
    return `This action removes a #${id} proyectoTitulacion`;
  }
}
