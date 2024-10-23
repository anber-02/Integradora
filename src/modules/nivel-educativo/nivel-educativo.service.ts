import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateNivelEducativoDto } from './dto/create-nivel-educativo.dto';
import { UpdateNivelEducativoDto } from './dto/update-nivel-educativo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { NivelEducativo } from './entities/nivel-educativo.entity';
import { Repository } from 'typeorm';
import { CarreraService } from '../carrera/carrera.service';

@Injectable()
export class NivelEducativoService {
  constructor(
    @InjectRepository(NivelEducativo)
    private nivelEducativoRepo: Repository<NivelEducativo>,
    private carreraService: CarreraService,
  ) {}
  async create(createNivelEducativoDto: CreateNivelEducativoDto) {
    try {
      const carrera = await this.carreraService.findOne(
        createNivelEducativoDto.carrera_id,
      );
      const nivelEducativo = this.nivelEducativoRepo.create(
        createNivelEducativoDto,
      );
      nivelEducativo.carrera = carrera;

      await this.nivelEducativoRepo.save(nivelEducativo);
      return nivelEducativo;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  findAll(tipo: string) {
    try {
      const nivelEducativo = this.nivelEducativoRepo.find({
        where: {
          tipo: tipo,
        },
      });
      return nivelEducativo;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  findOne(id: number) {
    try {
      const nivelEducativo = this.nivelEducativoRepo.findOne({
        where: {
          id,
        },
      });

      if (!nivelEducativo) {
        throw new Error('Nivel educativo no encontrado');
      }
      return nivelEducativo;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async update(id: number, updateNivelEducativoDto: UpdateNivelEducativoDto) {
    try {
      const nivelEducativo = await this.nivelEducativoRepo.preload({
        id,
        ...updateNivelEducativoDto,
      });
      await this.nivelEducativoRepo.save(nivelEducativo);
      return nivelEducativo;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async remove(id: number) {
    const nivelEducativo = this.nivelEducativoRepo.findOne({
      where: {
        id,
      },
    });

    if (!nivelEducativo) {
      throw new Error('Nivel educativo no encontrado');
    }
    await this.nivelEducativoRepo.delete(id);

    return {
      Message: 'Nivel educativo eliminado correctamente',
    };
  }
}
