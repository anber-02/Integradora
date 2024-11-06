import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateAreaDesarrolloDto } from './dto/create-area-desarrollo.dto';
import { UpdateAreaDesarrolloDto } from './dto/update-area-desarrollo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { AreaDesarrollo } from './entities/area-desarrollo.entity';
import { Repository } from 'typeorm';
import { CarreraService } from '../carrera/carrera.service';

@Injectable()
export class AreaDesarrolloService {
  constructor(
    @InjectRepository(AreaDesarrollo)
    private areaDesarrolloRepo: Repository<AreaDesarrollo>,
    private carreraService: CarreraService,
  ) {}

  async create(createAreaDesarrolloDto: CreateAreaDesarrolloDto) {
    try {
      const carrera_id = createAreaDesarrolloDto.carrera_id;
      const areaDesarrollo = this.areaDesarrolloRepo.create(
        createAreaDesarrolloDto,
      );

      const carrera = await this.carreraService.findOne(carrera_id);

      areaDesarrollo.carrera = carrera;
      await this.areaDesarrolloRepo.save(areaDesarrollo);
      return areaDesarrollo;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findAll() {
    try {
      const areaDesarrollo = await this.areaDesarrolloRepo.find();
      return areaDesarrollo;
    } catch (error) {
      return new InternalServerErrorException(error);
    }
  }

  async findOne(id: number) {
    try {
      const areaDesarrollo = this.areaDesarrolloRepo.findOneBy({ id });

      if (!areaDesarrollo) {
        throw new Error('Area de desarrollo no encontrada');
      }
      return areaDesarrollo;
    } catch (error) {
      return new InternalServerErrorException(error);
    }
  }

  async update(id: number, updateAreaDesarrolloDto: UpdateAreaDesarrolloDto) {
    try {
      const areaDesarrollo = await this.areaDesarrolloRepo.preload({
        id,
        ...updateAreaDesarrolloDto,
      });
      await this.areaDesarrolloRepo.save(areaDesarrollo);
      return areaDesarrollo;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async remove(id: number) {
    const areaDesarrollo = this.areaDesarrolloRepo.findOne({
      where: {
        id,
      },
    });

    if (!areaDesarrollo) {
      throw new Error('Area de desarrollo no encontrada');
    }
    await this.areaDesarrolloRepo.delete(id);

    return {
      Message: 'Area de desarrollo eliminada correctamente',
    };
  }
}
