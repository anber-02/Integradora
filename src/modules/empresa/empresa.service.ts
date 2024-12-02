import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateEmpresaDto } from './dto/create-empresa.dto';
import { UpdateEmpresaDto } from './dto/update-empresa.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Empresa } from './entities/empresa.entity';
import { Repository, Between } from 'typeorm';
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

      const currentDate: number = new Date().getTime();
      // Luego, creamos la empresa
      const empresa = this.empresaRepo.create({
        ...createEmpresaDto,
        direccion: direccion, // Asignamos la dirección creada
        usuario_id: createEmpresaDto.usuario_id,
        created_at: currentDate,
      });

      return this.empresaRepo.save(empresa);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findAll() {
    try {
      const Empresa = await this.empresaRepo.find({
        relations: ['direccion', 'usuario', 'documentos'],
        select: {
          usuario: {
            id: true,
            nombre: true,
            cargo: true,
            email: true,
            num_telefono: true,
            area_trabajo: true,
          },
        },
      });
      return Empresa;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findOne(id: number) {
    const Empresa = await this.empresaRepo.findOne({
      relations: ['direccion', 'usuario', 'documentos'],
      select: {
        usuario: {
          id: true,
          nombre: true,
          cargo: true,
          email: true,
          num_telefono: true,
          area_trabajo: true,
        },
      },
      where: {
        id,
      },
    });
    if (!Empresa) {
      throw new NotFoundException('empresa no encontrada');
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
      relations: ['direccion', 'usuario', 'documentos'],
      select: {
        usuario: {
          id: true,
          nombre: true,
          cargo: true,
          email: true,
          num_telefono: true,
          area_trabajo: true,
        },
      },
      where: {
        usuario_id: id,
      },
    });
    if (!Empresa) {
      throw new NotFoundException('Empresas no encontrados');
    }

    return Empresa;
  }

  async obtenerEstadisticas() {
    const inicioPeriodo = new Date('2024-01-01').getTime(); // Enero 1, 2024 en milisegundos
    const finPeriodo = new Date('2024-04-30').getTime(); // Abril 30, 2024 en milisegundos

    console.log(inicioPeriodo, finPeriodo);

    // Generar las estadísticas
    const estadisticas = {
      periodo: 'enero - abril',
      data: [],
    };

    // Contar empresas locales
    const locales = await this.empresaRepo.count({
      where: {
        created_at: Between(inicioPeriodo, finPeriodo),
        alcance_geografico: 'local',
      },
    });

    // Contar empresas nacionales
    const nacionales = await this.empresaRepo.count({
      where: {
        created_at: Between(inicioPeriodo, finPeriodo),
        alcance_geografico: 'nacional',
      },
    });

    // Contar empresas internacionales
    const internacionales = await this.empresaRepo.count({
      where: {
        created_at: Between(inicioPeriodo, finPeriodo),
        alcance_geografico: 'internacional',
      },
    });

    // Crear el objeto final con las estadísticas
    estadisticas.data.push({ locales });
    estadisticas.data.push({ nacionales });
    estadisticas.data.push({ internacionales });

    return estadisticas;
  }
}
