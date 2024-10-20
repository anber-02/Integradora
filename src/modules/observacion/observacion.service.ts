import { Injectable } from '@nestjs/common';
import { CreateObservacionDto } from './dto/create-observacion.dto';
import { UpdateObservacionDto } from './dto/update-observacion.dto';

@Injectable()
export class ObservacionService {
  create(createObservacionDto: CreateObservacionDto) {
    return 'This action adds a new observacion';
  }

  findAll() {
    return `This action returns all observacion`;
  }

  findOne(id: number) {
    return `This action returns a #${id} observacion`;
  }

  update(id: number, updateObservacionDto: UpdateObservacionDto) {
    return `This action updates a #${id} observacion`;
  }

  remove(id: number) {
    return `This action removes a #${id} observacion`;
  }
}
