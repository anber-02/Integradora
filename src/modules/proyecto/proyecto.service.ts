import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateProyectoDto } from './dto/create-proyecto.dto';
import { UpdateProyectoDto } from './dto/update-proyecto.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Proyecto } from './entities/proyecto.entity';
import { Repository } from 'typeorm';
import { Habilidad } from '../habilidad/entities/habilidad.entity';

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

  findAll() {
    try {
      const Proyecto = this.proyeRepo.find({
        relations: ['carrera', 'habilidades'],
        select: {
          carrera: {
            id: true,
            nombre: true,
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

  async remove(id: number) {
    const Proyecto = await this.proyeRepo.findOne({
      where: {
        id,
      },
    });
    if (!Proyecto) {
      throw new NotFoundException('producto no encontrado');
    }
    await this.proyeRepo.delete(id);
    return {
      Message: 'Se a eliminado',
    };
  }
}
