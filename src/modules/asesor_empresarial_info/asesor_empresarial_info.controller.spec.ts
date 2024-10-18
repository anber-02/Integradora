import { Test, TestingModule } from '@nestjs/testing';
import { AsesorEmpresarialInfoController } from './asesor_empresarial_info.controller';
import { AsesorEmpresarialInfoService } from './asesor_empresarial_info.service';

describe('AsesorEmpresarialInfoController', () => {
  let controller: AsesorEmpresarialInfoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AsesorEmpresarialInfoController],
      providers: [AsesorEmpresarialInfoService],
    }).compile();

    controller = module.get<AsesorEmpresarialInfoController>(AsesorEmpresarialInfoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
