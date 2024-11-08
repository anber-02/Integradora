import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateAreaDesarrolloDto } from './dto/create-area-desarrollo.dto';
import { UpdateAreaDesarrolloDto } from './dto/update-area-desarrollo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { AreaDesarrollo } from './entities/area-desarrollo.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AreaDesarrolloService {
  constructor(
    @InjectRepository(AreaDesarrollo)
    private areaDesarrolloRepo: Repository<AreaDesarrollo>,
  ) {}

  async create(createAreaDesarrolloDto: CreateAreaDesarrolloDto) {
    try {
      const areaDesarrollo = this.areaDesarrolloRepo.create(
        createAreaDesarrolloDto,
      );

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
