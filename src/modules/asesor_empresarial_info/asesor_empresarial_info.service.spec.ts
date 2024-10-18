import { Test, TestingModule } from '@nestjs/testing';
import { AsesorEmpresarialInfoService } from './asesor_empresarial_info.service';

describe('AsesorEmpresarialInfoService', () => {
  let service: AsesorEmpresarialInfoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AsesorEmpresarialInfoService],
    }).compile();

    service = module.get<AsesorEmpresarialInfoService>(AsesorEmpresarialInfoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
