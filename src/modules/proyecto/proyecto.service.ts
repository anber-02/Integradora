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

@Injectable()
export class ProyectoService {
  constructor(
    @InjectRepository(Proyecto)
    private proyeRepo: Repository<Proyecto>,
  ) {}

  async create(createProyectoDto: CreateProyectoDto) {
    try {
      const Proyecto = this.proyeRepo.create(createProyectoDto);
      await this.proyeRepo.save(Proyecto);
      return Proyecto;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  findAll() {
    try {
      const Proyecto = this.proyeRepo.find();
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
