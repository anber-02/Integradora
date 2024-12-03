import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateProyectoDto } from './dto/create-proyecto.dto';
import { UpdateProyectoDto } from './dto/update-proyecto.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Proyecto } from './entities/proyecto.entity';
import { In, Repository } from 'typeorm';
import { Habilidad } from '../habilidad/entities/habilidad.entity';
import { Status } from './enums/status.enum';

@Injectable()
export class ProyectoService {
  constructor(
    @InjectRepository(Proyecto)
    private proyeRepo: Repository<Proyecto>,
    @InjectRepository(Habilidad)
    private habilidadRepo: Repository<Habilidad>,
  ) {}

  async create(createProyectoDto: CreateProyectoDto) {
    try {
      const proyecto = this.proyeRepo.create(createProyectoDto);
      const habilidades = await this.habilidadRepo.findByIds(
        createProyectoDto.habilidades_ids,
      );
      if (habilidades.length !== createProyectoDto.habilidades_ids.length) {
        throw new NotFoundException(
          'Una o más habilidades no fueron encontradas',
        );
      }

      proyecto.habilidades = habilidades;

      await this.proyeRepo.save(proyecto);
      return proyecto;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  findAll(status: string) {
    try {
      const Proyecto = this.proyeRepo.find({
        where: { status },
        relations: ['carrera', 'habilidades', 'empresa'],
        select: {
          carrera: {
            id: true,
            nombre: true,
          },
          habilidades: {
            id: true,
            nombre: true,
          },
          empresa: {
            id: true,
            nombre: true,
          },
        },
      });
      return Proyecto;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
  findByEmpresa(empresa_id: number, status: string) {
    try {
      const Proyecto = this.proyeRepo.find({
        where: {
          empresa: { id: empresa_id },
          ...(status ? { status } : {}),
        },
        relations: ['carrera', 'habilidades'],
        select: {
          carrera: {
            id: true,
            nombre: true,
            nivel_educativo: true,
          },
          habilidades: {
            id: true,
            nombre: true,
          },
        },
      });
      return Proyecto;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findOne(id: number) {
    const Proyecto = await this.proyeRepo.findOne({
      where: {
        id,
      },
    });
    if (!Proyecto) {
      throw new NotFoundException('producto no encontrado');
    }

    return Proyecto;
  }

  async update(id: number, updateProyectoDto: UpdateProyectoDto) {
    try {
      const Proyecto = await this.proyeRepo.preload({
        id,
        ...updateProyectoDto,
      });
      await this.proyeRepo.save(Proyecto);
      return Proyecto;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async remove(empresaId: number, proyectoId: number) {
    // Buscar el proyecto relacionado con la empresa (se usa `empresaId` y `proyectoId`)
    const proyecto = await this.proyeRepo.findOne({
      where: {
        id: proyectoId,
        empresa_id: empresaId, // Verifica que proyecto pertenece a esa empresa
      },
    });

    if (!proyecto) {
      throw new NotFoundException('Proyecto no encontrado para esta empresa');
    }

    // Eliminar las relaciones de la tabla intermedia proyecto_habilidades (sin entidad creada)
    // await this.proyeRepo.query(
    //   `DELETE FROM proyecto_habilidad WHERE proyectoId = $1 AND empresaId = $2`,
    //   [proyectoId, empresaId],
    // );

    // Eliminar el proyecto
    await this.proyeRepo.delete(proyectoId);

    return {
      message: 'Proyecto y sus relaciones han sido eliminados correctamente',
    };
  }

  async changeStatus(id: number, status: Status) {
    const project = await this.proyeRepo.findOne({
      where: { id },
    });

    if (!project) {
      throw new Error(`Proyecto con ID ${id} no encontrado.`);
    }

    project.status = status;
    await this.proyeRepo.save(project);
    return project;
  }

  async patch(proyectoId: number, body: Partial<CreateProyectoDto>) {
    try {
      const proyecto = await this.proyeRepo.findOne({
        where: { id: proyectoId },
        relations: ['habilidades'],
      });

      if (!proyecto) {
        throw new NotFoundException('Proyecto no encontrado');
      }

      Object.assign(proyecto, body);

      if ('habilidades_ids' in body) {
        // Si el proyecto ya tiene habilidades, las eliminamos
        proyecto.habilidades = []; // Limpia las habilidades existentes

        // Buscar las nuevas habilidades por sus ids
        const nuevasHabilidades = await this.habilidadRepo.find({
          where: {
            id: In(body.habilidades_ids),
          },
        });

        // Asignar las nuevas habilidades al proyecto
        proyecto.habilidades = nuevasHabilidades;
      }

      await this.proyeRepo.save(proyecto);
      return proyecto;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
