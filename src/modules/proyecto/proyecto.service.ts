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

  async patch(proyectoId: string, body: Partial<CreateProyectoDto>) {
    try {
      const proyecto = await this.proyeRepo.findOne({
        where: { id: parseInt(proyectoId) },
        relations: ['habilidades'],
      });
  
      if (!proyecto) {
        throw new NotFoundException('Proyecto no encontrado');
      }
  
      Object.assign(proyecto, body);
  
      if ('habilidades_ids' in body) {
        const nuevasHabilidades = await this.habilidadRepo.findByIds(body.habilidades_ids);
        proyecto.habilidades = nuevasHabilidades;
      }
  
      await this.proyeRepo.save(proyecto);
      return proyecto;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
  

  // public async findBy({
  //   key,
  //   value,
  // }: {
  //   key: keyof CreateProyectoDto;
  //   value: any;
  // }) {
  //   try {
  //     const user = await this.proyeRepo.find({
  //       where: { [key]: value },
  //     });

  //     return user;
  //   } catch (error) {
  //     throw new InternalServerErrorException(error);
  //   }
  // }
}
