import { Injectable } from '@nestjs/common';
import { CreateEstadiaDto } from './dto/create-estadia.dto';
import { UpdateEstadiaDto } from './dto/update-estadia.dto';

@Injectable()
export class EstadiaService {
  create(createEstadiaDto: CreateEstadiaDto) {
    return 'This action adds a new estadia';
  }

  findAll() {
    return `This action returns all estadia`;
  }

  findOne(id: number) {
    return `This action returns a #${id} estadia`;
  }

  update(id: number, updateEstadiaDto: UpdateEstadiaDto) {
    return `This action updates a #${id} estadia`;
  }

  remove(id: number) {
    return `This action removes a #${id} estadia`;
  }
}
