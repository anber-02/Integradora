import { Injectable } from '@nestjs/common';
import { CreateAsesorEmpresarialInfoDto } from './dto/create-asesor_empresarial_info.dto';
import { UpdateAsesorEmpresarialInfoDto } from './dto/update-asesor_empresarial_info.dto';

@Injectable()
export class AsesorEmpresarialInfoService {
  create(createAsesorEmpresarialInfoDto: CreateAsesorEmpresarialInfoDto) {
    return 'This action adds a new asesorEmpresarialInfo';
  }

  findAll() {
    return `This action returns all asesorEmpresarialInfo`;
  }

  findOne(id: number) {
    return `This action returns a #${id} asesorEmpresarialInfo`;
  }

  update(id: number, updateAsesorEmpresarialInfoDto: UpdateAsesorEmpresarialInfoDto) {
    return `This action updates a #${id} asesorEmpresarialInfo`;
  }

  remove(id: number) {
    return `This action removes a #${id} asesorEmpresarialInfo`;
  }
}
