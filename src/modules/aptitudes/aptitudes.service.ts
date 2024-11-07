import { Injectable } from '@nestjs/common';
import { CreateAptitudeDto } from './dto/create-aptitude.dto';
import { UpdateAptitudeDto } from './dto/update-aptitude.dto';

@Injectable()
export class AptitudesService {
  create(createAptitudeDto: CreateAptitudeDto) {
    return 'This action adds a new aptitude';
  }

  findAll() {
    return `This action returns all aptitudes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} aptitude`;
  }

  update(id: number, updateAptitudeDto: UpdateAptitudeDto) {
    return `This action updates a #${id} aptitude`;
  }

  remove(id: number) {
    return `This action removes a #${id} aptitude`;
  }
}
