import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateNivelEducativoDto } from './dto/create-nivel-educativo.dto';
import { UpdateNivelEducativoDto } from './dto/update-nivel-educativo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { NivelEducativo } from './entities/nivel-educativo.entity';
import { Repository } from 'typeorm';

@Injectable()
export class NivelEducativoService {
  constructor(
    @InjectRepository(NivelEducativo)
    private nivelEducativoRepo: Repository<NivelEducativo>,
  ) {}
  async create(createNivelEducativoDto: CreateNivelEducativoDto) {
    try {
      const nivelEducativo = this.nivelEducativoRepo.create(
        createNivelEducativoDto,
      );
      await this.nivelEducativoRepo.save(nivelEducativo);
      return nivelEducativo;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  findAll() {
    try {
      const nivelEducativo = this.nivelEducativoRepo.find();
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
