import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateEmpresaDto } from './dto/create-empresa.dto';
import { UpdateEmpresaDto } from './dto/update-empresa.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Empresa } from './entities/empresa.entity';
import { Repository } from 'typeorm';

@Injectable()

export class EmpresaService {

  constructor(
    @InjectRepository(Empresa)
    private empresaRepo:Repository<Empresa>
  ){}

  async create(createEmpresaDto: CreateEmpresaDto) {
    try{
      const Empresa = this.empresaRepo.create(
        createEmpresaDto
      )
      await this.empresaRepo.save(Empresa)
      return Empresa
    }
    catch(error){
      throw new InternalServerErrorException(error);

    }
  }

  async findAll() {
    try{
      const Empresa = this.empresaRepo.find();
      return Empresa;
    }
    catch(error){
      throw new InternalServerErrorException(error);
    }
  }

  async findOne(id: number) {
    const Empresa = await this.empresaRepo.findOne({
      where:{
        id
      }
    });
    if(!Empresa){
      throw new NotFoundException('producto no encontrado');
    }

    return Empresa;
  }

  async update(id: number, updateEmpresaDto: UpdateEmpresaDto) {
    try{
      const Empresa=await this.empresaRepo.preload({
        id,
        ...updateEmpresaDto
      });
      await this.empresaRepo.save(Empresa)
      return Empresa;
    }
    catch(error){
      throw new InternalServerErrorException(error);
    }
  }

  async remove(id: number) {
    const Empresa = await this.empresaRepo.findOne({
      where:{
        id
      }
    });
    if(!Empresa){
      throw new NotFoundException('producto no encontrado');
    }
    await this.empresaRepo.delete(id);
    return{
      Message:'Se a eliminado'
    }
  }
}
