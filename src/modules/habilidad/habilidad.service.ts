import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateHabilidadDto } from './dto/create-habilidad.dto';
import { UpdateHabilidadDto } from './dto/update-habilidad.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Habilidad } from './entities/habilidad.entity';
import { Repository } from 'typeorm';

@Injectable()
export class HabilidadService {
  constructor(
    @InjectRepository(Habilidad)
    private habiRepo: Repository<Habilidad>,
  ) {}

  async create(createHabilidadDto: CreateHabilidadDto) {
    try {
      const Habilidad = this.habiRepo.create(createHabilidadDto);
      await this.habiRepo.save(Habilidad);
      return Habilidad;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  findAll() {
    try {
      const Habilidad = this.habiRepo.find();
      return Habilidad;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findOne(id: number) {
    const Habilidad = await this.habiRepo.findOne({
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
      const Habilidad = await this.habiRepo.preload({
        id,
        ...updateHabilidadDto,
      });
      await this.habiRepo.save(Habilidad);
      return Habilidad;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async remove(id: number) {
    const Habilidad = await this.habiRepo.findOne({
      where: {
        id,
      },
    });
    if (!Habilidad) {
      throw new NotFoundException('habilidad no encontrado');
    }
    await this.habiRepo.delete(id);
    return {
      Message: 'Se a eliminado',
    };
  }
}
