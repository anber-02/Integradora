import { Injectable } from '@nestjs/common';
import { CreateTitulacionDto } from './dto/create-titulacion.dto';
import { UpdateTitulacionDto } from './dto/update-titulacion.dto';

@Injectable()
export class TitulacionService {
  create(createTitulacionDto: CreateTitulacionDto) {
    return 'This action adds a new titulacion';
  }

  findAll() {
    return `This action returns all titulacion`;
  }

  findOne(id: number) {
    return `This action returns a #${id} titulacion`;
  }

  update(id: number, updateTitulacionDto: UpdateTitulacionDto) {
    return `This action updates a #${id} titulacion`;
  }

  remove(id: number) {
    return `This action removes a #${id} titulacion`;
  }
}
