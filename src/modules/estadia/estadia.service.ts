import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateEstadiaDto } from './dto/create-estadia.dto';
import { UpdateEstadiaDto } from './dto/update-estadia.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Estadia } from './entities/estadia.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EstadiaService {

  constructor(
    @InjectRepository(Estadia)
    private estaRepo:Repository<Estadia>
  ){}

  async create(createEstadiaDto: CreateEstadiaDto) {
    try{
      const Estadia = this.estaRepo.create(
        createEstadiaDto
      )
      await this.estaRepo.save(Estadia)
      return Estadia
    }
    catch(error){
      throw new InternalServerErrorException(error);

    }
  }

  findAll() {
    try{
      const Estadia = this.estaRepo.find();
      return Estadia;
    }
    catch(error){
      throw new InternalServerErrorException(error);
    }
  }

  async findOne(id: number) {
    const Estadia = await this.estaRepo.findOne({
      where:{
        id
      }
    });
    if(!Estadia){
      throw new NotFoundException('producto no encontrado');
    }

    return Estadia;
  }

  async update(id: number, updateEstadiaDto: UpdateEstadiaDto) {
    try{
      const Estadia=await this.estaRepo.preload({
        id,
        ...updateEstadiaDto
      });
      await this.estaRepo.save(Estadia)
      return Estadia;
    }
    catch(error){
      throw new InternalServerErrorException(error);
    }
  }

  async remove(id: number) {
    const Estadia = await this.estaRepo.findOne({
      where:{
        id
      }
    });
    if(!Estadia){
      throw new NotFoundException('producto no encontrado');
    }
    await this.estaRepo.delete(id);
    return{
      Message:'Se a eliminado'
    }
  }
}
