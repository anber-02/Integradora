import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateTitulacionDto } from './dto/create-titulacion.dto';
import { UpdateTitulacionDto } from './dto/update-titulacion.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Titulacion } from './entities/titulacion.entity';

@Injectable()
export class TitulacionService {

  constructor(
    @InjectRepository(Titulacion)
    private tituRepo:Repository<Titulacion>
  ){}

  async create(createTitulacionDto: CreateTitulacionDto) {
    try{
      const Titulacion = this.tituRepo.create(
        createTitulacionDto
      )
      await this.tituRepo.save(Titulacion)
      return Titulacion
    }
    catch(error){
      throw new InternalServerErrorException(error);
    }
  }

  findAll() {
    try{
      const Titulacion = this.tituRepo.find();
      return Titulacion;
    }
    catch(error){
      throw new InternalServerErrorException(error);
    }
  }

  async findOne(id: number) {
    const Titulacion = await this.tituRepo.findOne({
      where:{
        id
      }
    });
    if(!Titulacion){
      throw new NotFoundException('titu no encontrado');
    }

    return Titulacion;
  }

  async update(id: number, updateTitulacionDto: UpdateTitulacionDto) {
    try{
      const Titulacion=await this.tituRepo.preload({
        id,
        ...updateTitulacionDto
      });
      await this.tituRepo.save(Titulacion)
      return Titulacion;
    }
    catch(error){
      throw new InternalServerErrorException(error);
    }
  }

  async remove(id: number) {
    const Titulacion = await this.tituRepo.findOne({
      where:{
        id
      }
    });
    if(!Titulacion){
      throw new NotFoundException('titulacion no encontrado perro malditoooo');
    }
    await this.tituRepo.delete(id);
    return{
      Message:'Se a eliminado'
    }
  }
}
