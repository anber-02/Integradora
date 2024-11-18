import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateHabilidadDto } from './dto/create-habilidad.dto';
import { UpdateHabilidadDto } from './dto/update-habilidad.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Habilidad } from './entities/habilidad.entity';
import { Like, Repository } from 'typeorm';

@Injectable()
export class HabilidadService {
  constructor(
    @InjectRepository(Habilidad)
    private habilidadRepo: Repository<Habilidad>,
  ) {}

  async create(createHabilidadDto: CreateHabilidadDto) {
    try {
      const Habilidad = this.habilidadRepo.create(createHabilidadDto);
      await this.habilidadRepo.save(Habilidad);
      return Habilidad;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  findAll(nombre: string) {
    try {
      const Habilidad = this.habilidadRepo.find({
        where: {
          nombre: Like(`%${nombre}%`),
        },
      });
      return Habilidad;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findOne(id: number) {
    const Habilidad = await this.habilidadRepo.findOne({
      where: {
        id,
      },
    });
    if (!Habilidad) {
      throw new NotFoundException('habilidad no encontrado');
    }

    return Habilidad;
  }

  async update(id: number, updateHabilidadDto: UpdateHabilidadDto) {
    try {
      const Habilidad = await this.habilidadRepo.preload({
        id,
        ...updateHabilidadDto,
      });
      await this.habilidadRepo.save(Habilidad);
      return Habilidad;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async remove(id: number) {
    const Habilidad = await this.habilidadRepo.findOne({
      where: {
        id,
      },
    });
    if (!Habilidad) {
      throw new NotFoundException('habilidad no encontrado');
    }
    await this.habilidadRepo.delete(id);
    return {
      Message: 'Se a eliminado',
    };
  }
}
