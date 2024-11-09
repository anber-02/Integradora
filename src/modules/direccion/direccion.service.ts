import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateDireccionDto } from './dto/create-direccion.dto';
import { UpdateDireccionDto } from './dto/update-direccion.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Direccion } from './entities/direccion.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DireccionService {
  constructor(
    @InjectRepository(Direccion)
    private addressRepo: Repository<Direccion>,
  ) {}

  async create(createDireccionDto: CreateDireccionDto) {
    try {
      const Direccion = this.addressRepo.create(createDireccionDto);
      await this.addressRepo.save(Direccion);
      return Direccion;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findOne(id: number) {
    try {
      const Direccion = await this.addressRepo.findOne({
        where: {
          id,
        },
      });
      if (!Direccion) {
        throw new NotFoundException('producto no encontrado');
      }

      return Direccion;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async update(id: number, updateDireccionDto: UpdateDireccionDto) {
    try {
      const Direccion = await this.addressRepo.preload({
        id,
        ...updateDireccionDto,
      });
      await this.addressRepo.save(Direccion);
      return Direccion;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async remove(id: number) {
    try {
      const Direccion = await this.addressRepo.findOne({
        where: {
          id,
        },
      });
      if (!Direccion) {
        throw new NotFoundException('producto no encontrado');
      }
      await this.addressRepo.delete(id);
      return {
        Message: 'Se a eliminado',
      };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
