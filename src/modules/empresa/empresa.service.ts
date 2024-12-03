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
    const estadisticas = [
      {
        año: 2023,
        total: 0,
        data: [
          {
            periodo: 'Enero-Abril 2023',
            cantidades: [],
          },
          {
            periodo: 'Mayo-Agosto 2023',
            cantidades: [],
          },
        ],
      },
      {
        año: 2024,
        total: 0,
        data: [
          {
            periodo: 'Enero-Abril 2024',
            cantidades: [],
          },
          {
            periodo: 'Mayo-Agosto 2024',
            cantidades: [],
          },
        ],
      },
    ];

    // Define períodos
    const periodos = [
      { inicio: '2023-01-01', fin: '2023-04-30' },
      { inicio: '2023-05-01', fin: '2023-08-31' },
      { inicio: '2024-01-01', fin: '2024-04-30' },
      { inicio: '2024-09-01', fin: '2024-12-31' },
    ];

    for (let i = 0; i < estadisticas.length; i++) {
      const año = estadisticas[i].año;

      for (let j = 0; j < estadisticas[i].data.length; j++) {
        const inicioPeriodo = new Date(periodos[i * 2 + j].inicio).getTime();
        const finPeriodo = new Date(periodos[i * 2 + j].fin).getTime();

        const locales = await this.empresaRepo.count({
          where: {
            created_at: Between(inicioPeriodo, finPeriodo),
            alcance_geografico: 'local',
            activo: true,
          },
        });

        const nacionales = await this.empresaRepo.count({
          where: {
            created_at: Between(inicioPeriodo, finPeriodo),
            alcance_geografico: 'nacional',
            activo: true,
          },
        });

        const internacionales = await this.empresaRepo.count({
          where: {
            created_at: Between(inicioPeriodo, finPeriodo),
            alcance_geografico: 'internacional',
            activo: true,
          },
        });

        estadisticas[i].data[j].cantidades = [
          { tipo: 'Locales', cantidad: locales },
          { tipo: 'Nacionales', cantidad: nacionales },
          { tipo: 'Internacionales', cantidad: internacionales },
        ];

        estadisticas[i].total += locales + nacionales + internacionales;
      }
    }

    const total_global = estadisticas.reduce(
      (sum, estadistica) => sum + estadistica.total,
      0,
    );

    return {
      total_global,
      estadisticas,
    };
  }
}
