import { Injectable } from '@nestjs/common';
import { CreateProyectoHabilidadDto } from './dto/create-proyecto_habilidad.dto';
import { UpdateProyectoHabilidadDto } from './dto/update-proyecto_habilidad.dto';

@Injectable()
export class ProyectoHabilidadService {
  create(createProyectoHabilidadDto: CreateProyectoHabilidadDto) {
    return 'This action adds a new proyectoHabilidad';
  }

  findAll() {
    return `This action returns all proyectoHabilidad`;
  }

  findOne(id: number) {
    return `This action returns a #${id} proyectoHabilidad`;
  }

  update(id: number, updateProyectoHabilidadDto: UpdateProyectoHabilidadDto) {
    return `This action updates a #${id} proyectoHabilidad`;
  }

  remove(id: number) {
    return `This action removes a #${id} proyectoHabilidad`;
  }
}
