import { Injectable } from '@nestjs/common';
import { CreateAreaDesarrolloDto } from './dto/create-area-desarrollo.dto';
import { UpdateAreaDesarrolloDto } from './dto/update-area-desarrollo.dto';

@Injectable()
export class AreaDesarrolloService {
  create(createAreaDesarrolloDto: CreateAreaDesarrolloDto) {
    return 'This action adds a new areaDesarrollo';
  }

  findAll() {
    return `This action returns all areaDesarrollo`;
  }

  findOne(id: number) {
    return `This action returns a #${id} areaDesarrollo`;
  }

  update(id: number, updateAreaDesarrolloDto: UpdateAreaDesarrolloDto) {
    return `This action updates a #${id} areaDesarrollo`;
  }

  remove(id: number) {
    return `This action removes a #${id} areaDesarrollo`;
  }
}
