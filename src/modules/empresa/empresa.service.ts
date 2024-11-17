import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateEmpresaDto } from './dto/create-empresa.dto';
import { UpdateEmpresaDto } from './dto/update-empresa.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Empresa } from './entities/empresa.entity';
import { Repository } from 'typeorm';
import { DireccionService } from '../direccion/direccion.service';
import { UpdateDireccionDto } from '../direccion/dto/update-direccion.dto';

@Injectable()
export class EmpresaService {
  constructor(
    @InjectRepository(Empresa)
    private empresaRepo: Repository<Empresa>,

    private direccionService: DireccionService,
  ) {}

  async create(createEmpresaDto: CreateEmpresaDto): Promise<Empresa> {
    try {
      // Primero creamos la dirección
      const direccion = await this.direccionService.create(
        createEmpresaDto.direccion,
      );

      // Luego, creamos la empresa
      const empresa = this.empresaRepo.create({
        ...createEmpresaDto,
        direccion: direccion, // Asignamos la dirección creada
        usuario_id: createEmpresaDto.usuario_id,
      });

      return this.empresaRepo.save(empresa);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findAll() {
    try {
      const Empresa = await this.empresaRepo.find({
        relations: ['direccion'],
      });
      return Empresa;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findOne(id: number) {
    const Empresa = await this.empresaRepo.findOne({
      relations: ['direccion', 'usuario'],
      where: {
        id,
      },
    });
    if (!Empresa) {
      throw new NotFoundException('producto no encontrado');
    }

    return Empresa;
  }

  async update(id: number, updateEmpresaDto: UpdateEmpresaDto) {
    try {
      // Buscamos la empresa por su ID, incluyendo la relación con la dirección
      const empresa = await this.empresaRepo.findOne({
        where: { id },
        relations: ['direccion'],
      });

      if (!empresa) {
        throw new NotFoundException('Empresa no encontrada');
      }

      // Actualizamos los campos de la empresa
      Object.assign(empresa, updateEmpresaDto);

      // Guardamos la empresa con los nuevos valores
      return await this.empresaRepo.save(empresa);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async remove(id: number) {
    try {
      const empresa = await this.empresaRepo.findOne({
        where: { id },
        relations: ['direccion'],
      });

      if (!empresa) {
        throw new NotFoundException('Empresa no encontrada');
      }

      if (empresa.direccion) {
        await this.direccionService.remove(empresa.direccion.id); // Eliminamos la dirección asociada
      }

      await this.empresaRepo.delete(id);

      return { Message: 'Empresa y su dirección han sido eliminadas' };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async updateAdress(id: number, updateDireccionDto: UpdateDireccionDto) {
    return this.direccionService.update(id, updateDireccionDto);
  }

  async findEmpresasByUser(id: number) {
    const Empresa = await this.empresaRepo.find({
      relations: ['direccion'],
      where: {
        usuario_id: id,
      },
    });
    if (!Empresa) {
      throw new NotFoundException('Empresas no encontrados');
    }

    return Empresa;
  }
}
