import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateCarreraDto } from './dto/create-carrera.dto';
import { UpdateCarreraDto } from './dto/update-carrera.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Carrera } from './entities/carrera.entity';
import { Aptitude } from '../aptitudes/entities/aptitude.entity';
import { AssignAptitudToCareerDto } from './dto/assign-aptitud-to-career.dto';
import { AreaDesarrollo } from '../area-desarrollo/entities/area-desarrollo.entity';
import { AssignAreaToCareerDto } from './dto/assign-area-to-career.dto';

@Injectable()
export class CarreraService {
  constructor(
    @InjectRepository(Carrera)
    private carreRepo: Repository<Carrera>,

    @InjectRepository(Aptitude)
    private aptitudRepo: Repository<Aptitude>,

    @InjectRepository(Aptitude)
    private areaDesarrolloRepo: Repository<AreaDesarrollo>,
  ) {}

  async create(createCarreraDto: CreateCarreraDto) {
    console.log(createCarreraDto);
    try {
      const Carrera = this.carreRepo.create(createCarreraDto);
      await this.carreRepo.save(Carrera);
      return Carrera;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  findAll(nivelEducativo?: string[]) {
    try {
      if (nivelEducativo.length === 0) {
        const Carrera = this.carreRepo.find({
          relations: ['areaDesarrollo', 'aptitudes'],
        });
        return Carrera;
      }

      const Carrera = this.carreRepo.find({
        relations: ['areaDesarrollo', 'aptitudes'],
        where: {
          nivel_educativo: In(nivelEducativo),
        },
      });
      return Carrera;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findOne(id: number) {
    const Carrera = await this.carreRepo.findOne({
      relations: ['areaDesarrollo', 'aptitudes'],
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

  async assignAptitudesToCareer(
    assignAptitudToCareerDto: AssignAptitudToCareerDto,
  ): Promise<Carrera> {
    const { carreraId, aptitudesIds } = assignAptitudToCareerDto;

    // Verificar si la carrera existe
    const carrera = await this.carreRepo.findOne({
      where: { id: carreraId },
      relations: ['aptitudes'],
    });
    if (!carrera) {
      throw new NotFoundException(`Carrera con ID ${carreraId} no encontrada`);
    }

    // Verificar si las aptitudes existen
    const aptitudes = await this.aptitudRepo.findByIds(aptitudesIds);
    if (aptitudes.length !== aptitudesIds.length) {
      throw new NotFoundException('Una o más aptitudes no fueron encontradas');
    }

    // Asignar las aptitudes a la carrera
    carrera.aptitudes = aptitudes;

    // Guardamos la carrera con las aptitudes asignadas
    return this.carreRepo.save(carrera);
  }
  // Asignar áreas de desarrollo a una carrera
  async assignAreasToCareer(
    assignAreaToCareerDto: AssignAreaToCareerDto,
  ): Promise<Carrera> {
    const { carreraId, areaDesarrolloIds } = assignAreaToCareerDto;

    // Verificar si la carrera existe
    const carrera = await this.carreRepo.findOne({ where: { id: carreraId } });
    if (!carrera) {
      throw new NotFoundException(`Carrera con ID ${carreraId} no encontrada`);
    }

    // Verificar si las áreas de desarrollo existen
    const areasDesarrollo =
      await this.areaDesarrolloRepo.findByIds(areaDesarrolloIds);
    if (areasDesarrollo.length !== areaDesarrolloIds.length) {
      throw new NotFoundException(
        'Una o más áreas de desarrollo no fueron encontradas',
      );
    }

    // Asignar las aptitudes a la carrera
    carrera.areaDesarrollo = areasDesarrollo;

    // Guardamos la carrera con las aptitudes asignadas
    return this.carreRepo.save(carrera);
  }
}
