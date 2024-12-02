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
    console.log({ project_id, detalle });
    try {
      const project = await this.proyectoRepository.findOne({
        where: { id: project_id },
      });

      if (!project) {
        throw new Error('Proyecto no encontrado');
      }
      console.log(project);
      // Crear una nueva observación
      const observacion = this.observacionRepository.create({ detalle });

      // Asignar el proyecto a la observación
      observacion.proyectos = [project];

      // Guardar la observación
      await this.observacionRepository.save(observacion);

      return observacion;
    } catch (error) {
      // Manejo de error
      throw new Error(
        `Error al asignar la observación al proyecto: ${error.message}`,
      );
    }
  }

  async assignObservacionToEmpresa(
    assignObservacionToEmpresa: AssignObservacionToEmpresaDto,
  ) {
    const { empresa_id, detalle } = assignObservacionToEmpresa;

    try {
      // Buscar la empresa
      const empresa = await this.empresaRepository.findOne({
        where: { id: empresa_id },
      });

      if (!empresa) {
        throw new Error('Empresa no encontrada');
      }
      // Crear una nueva observación
      const observacion = this.observacionRepository.create({ detalle });

      // Asignar la empresa a la observación
      observacion.empresas = [empresa];

      // Guardar la observación
      await this.observacionRepository.save(observacion);

      return observacion;
    } catch (error) {
      // Manejo de error
      throw new Error(
        `Error al asignar la observación a la empresa: ${error.message}`,
      );
    }
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
