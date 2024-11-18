import { Injectable } from '@nestjs/common';
import { AssignObservacionToProjectDto } from './dto/assign-observacion-to-project.dto';
// import { UpdateObservacionDto } from './dto/update-observacion.dto';
import { Observacion } from './entities/observacion.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AssignObservacionToEmpresaDto } from './dto/assign-observacion-to-empresa.dto';
import { Proyecto } from '../proyecto/entities/proyecto.entity';
import { Empresa } from '../empresa/entities/empresa.entity';

@Injectable()
export class ObservacionService {
  constructor(
    @InjectRepository(Observacion)
    private observacionRepository: Repository<Observacion>,
    @InjectRepository(Proyecto)
    private proyectoRepository: Repository<Proyecto>,
    @InjectRepository(Empresa)
    private empresaRepository: Repository<Empresa>,
  ) {}

  async assignObservacionToProject(
    assignObservacionToProject: AssignObservacionToProjectDto,
  ) {
    const { project_id, detalle } = assignObservacionToProject;
    const observacion = this.observacionRepository.create({ detalle });
    const project = await this.proyectoRepository.findOneBy({ id: project_id });
    observacion.proyectos = [project];
    this.observacionRepository.save(observacion);
    return observacion;
  }

  async assignObservacionToEmpresa(
    assignObservacionToEmpresa: AssignObservacionToEmpresaDto,
  ) {
    const { empresa_id, detalle } = assignObservacionToEmpresa;
    const observacion = this.observacionRepository.create({ detalle });
    const empresa = await this.empresaRepository.findOneBy({ id: empresa_id });
    observacion.empresas = [empresa];
    this.observacionRepository.save(observacion);
    return observacion;
  }

  findAll() {
    return `This action returns all observacion`;
  }

  findOne(id: number) {
    return `This action returns a #${id} observacion`;
  }

  // update(id: number, updateObservacionDto: UpdateObservacionDto) {
  //   return `This action updates a #${id} observacion`;
  // }

  remove(id: number) {
    return `This action removes a #${id} observacion`;
  }
}
