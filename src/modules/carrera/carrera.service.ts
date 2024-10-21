import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateCarreraDto } from './dto/create-carrera.dto';
import { UpdateCarreraDto } from './dto/update-carrera.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Carrera } from './entities/carrera.entity';

@Injectable()
export class CarreraService {
  constructor(
    @InjectRepository(Carrera)
    private carreRepo: Repository<Carrera>,
  ) {}

  async create(createCarreraDto: CreateCarreraDto) {
    try {
      const Carrera = this.carreRepo.create(createCarreraDto);
      await this.carreRepo.save(Carrera);
      return Carrera;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  findAll() {
    try {
      const Carrera = this.carreRepo.find({
        relations: ['nivelEducativo', 'areaDesarrollo'],
      });
      return Carrera;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findOne(id: number) {
    const Carrera = await this.carreRepo.findOne({
      where: {
        id,
      },
    });
    if (!Carrera) {
      throw new NotFoundException('producto no encontrado');
    }

    return Carrera;
  }

  async update(id: number, updateCarreraDto: UpdateCarreraDto) {
    try {
      const Carrera = await this.carreRepo.preload({
        id,
        ...updateCarreraDto,
      });
      await this.carreRepo.save(Carrera);
      return Carrera;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async remove(id: number) {
    const Carrera = await this.carreRepo.findOne({
      where: {
        id,
      },
    });
    if (!Carrera) {
      throw new NotFoundException('carrera no encontrado');
    }
    await this.carreRepo.delete(id);
    return {
      Message: 'Se a eliminado',
    };
  }
}
