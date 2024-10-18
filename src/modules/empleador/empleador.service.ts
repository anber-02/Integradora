import { Injectable } from '@nestjs/common';
import { CreateEmpleadorDto } from './dto/create-empleador.dto';
import { UpdateEmpleadorDto } from './dto/update-empleador.dto';

@Injectable()
export class EmpleadorService {
  create(createEmpleadorDto: CreateEmpleadorDto) {
    return 'This action adds a new empleador';
  }

  findAll() {
    return `This action returns all empleador`;
  }

  findOne(id: number) {
    return `This action returns a #${id} empleador`;
  }

  update(id: number, updateEmpleadorDto: UpdateEmpleadorDto) {
    return `This action updates a #${id} empleador`;
  }

  remove(id: number) {
    return `This action removes a #${id} empleador`;
  }
}
