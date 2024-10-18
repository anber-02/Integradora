import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateDocumentacionDto } from './dto/create-documentacion.dto';
import { UpdateDocumentacionDto } from './dto/update-documentacion.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Documentacion } from './entities/documentacion.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DocumentacionService {

  constructor(
    @InjectRepository(Documentacion)
    private docuRepo:Repository<Documentacion>
  ){}

  async create(createDocumentacionDto: CreateDocumentacionDto) {
    try{
      const Documentacion = this.docuRepo.create(
        createDocumentacionDto
      )
      await this.docuRepo.save(Documentacion)
      return Documentacion
    }
    catch(error){
      throw new InternalServerErrorException(error);

    }
  }

  findAll() {
    try{
      const Documentacion = this.docuRepo.find();
      return Documentacion;
    }
    catch(error){
      throw new InternalServerErrorException(error);
    }
  }

  async findOne(id: number) {
    const Documentacion = await this.docuRepo.findOne({
      where:{
        id
      }
    });
    if(!Documentacion){
      throw new NotFoundException('producto no encontrado');
    }

    return Documentacion;
  }

  async update(id: number, updateDocumentacionDto: UpdateDocumentacionDto) {
    try{
      const Documentacion=await this.docuRepo.preload({
        id,
        ...updateDocumentacionDto
      });
      await this.docuRepo.save(Documentacion)
      return Documentacion;
    }
    catch(error){
      throw new InternalServerErrorException(error);
    }
  }

  async remove(id: number) {
    const Documentacion = await this.docuRepo.findOne({
      where:{
        id
      }
    });
    if(!Documentacion){
      throw new NotFoundException('producto no encontrado');
    }
    await this.docuRepo.delete(id);
    return{
      Message:'Se a eliminado'
    }
  }
}
