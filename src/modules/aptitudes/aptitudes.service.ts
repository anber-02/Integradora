// src/aptitudes/aptitudes.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Aptitude } from './entities/aptitude.entity'; // Asegúrate de tener esta entidad
import { CreateAptitudeDto } from './dto/create-aptitude.dto';
import { UpdateAptitudeDto } from './dto/update-aptitude.dto';

@Injectable()
export class AptitudesService {
  constructor(
    @InjectRepository(Aptitude)
    private readonly aptitudesRepository: Repository<Aptitude>, // Repositorio de Aptitudes
  ) {}

  // Crear una nueva aptitud
  async create(createAptitudeDto: CreateAptitudeDto): Promise<Aptitude> {
    const aptitud = this.aptitudesRepository.create(createAptitudeDto); // Crear la instancia de Aptitude
    return await this.aptitudesRepository.save(aptitud); // Guardar en la base de datos
  }

  // Obtener todas las aptitudes
  async findAll(): Promise<Aptitude[]> {
    return this.aptitudesRepository.find(); // Obtener todas las aptitudes
  }

  // Obtener una aptitud por ID
  async findOne(id: number): Promise<Aptitude> {
    const aptitud = await this.aptitudesRepository.findOne({ where: { id } }); // Buscar por ID
    if (!aptitud) {
      throw new NotFoundException(`Aptitud con ID ${id} no encontrada`);
    }
    return aptitud;
  }

  // Actualizar una aptitud
  async update(
    id: number,
    updateAptitudeDto: UpdateAptitudeDto,
  ): Promise<Aptitude> {
    const aptitud = await this.findOne(id); // Buscar aptitud existente
    const updatedAptitude = Object.assign(aptitud, updateAptitudeDto); // Asignar los nuevos valores
    return this.aptitudesRepository.save(updatedAptitude); // Guardar en la base de datos
  }

  // Eliminar una aptitud
  async remove(id: number): Promise<void> {
    const aptitud = await this.findOne(id); // Buscar la aptitud existente
    await this.aptitudesRepository.remove(aptitud); // Eliminarla
  }
}
