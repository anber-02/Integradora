import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateEmpleadorDto } from './dto/create-empleador.dto';
import { UpdateEmpleadorDto } from './dto/update-empleador.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Empleador } from './entities/empleador.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EmpleadorService {

  constructor(
    @InjectRepository(Empleador)
    private empleRepo:Repository<Empleador>
  ){}

  async create(createEmpleadorDto: CreateEmpleadorDto) {
    try{
      const Empleador = this.empleRepo.create(
        createEmpleadorDto
      )
      await this.empleRepo.save(Empleador)
      return Empleador
    }
    catch(error){
      throw new InternalServerErrorException(error);

    }
    }

  findAll() {
    try{
      const Empleador = this.empleRepo.find();
      return Empleador;
    }
    catch(error){
      throw new InternalServerErrorException(error);
    }
  }

  async findOne(id: number) {
    const Empleador = await this.empleRepo.findOne({
      where:{
        id
      }
    });
    if(!Empleador){
      throw new NotFoundException('empleador no encontrado');
    }

    return Empleador;
  }

  async update(id: number, updateEmpleadorDto: UpdateEmpleadorDto) {
    try{
      const Empleador=await this.empleRepo.preload({
        id,
        ...updateEmpleadorDto
      });
      await this.empleRepo.save(Empleador)
      return Empleador;
    }
    catch(error){
      throw new InternalServerErrorException(error);
    }
  }

  async remove(id: number) {
    const Empleador = await this.empleRepo.findOne({
      where:{
        id
      }
    });
    if(!Empleador){
      throw new NotFoundException('empleador no encontrado');
    }
    await this.empleRepo.delete(id);
    return{
      Message:'Se a eliminado'
    }
  }
}
