import { Test, TestingModule } from '@nestjs/testing';
import { NivelEducativoService } from './nivel-educativo.service';

describe('NivelEducativoService', () => {
  let service: NivelEducativoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NivelEducativoService],
    }).compile();

    service = module.get<NivelEducativoService>(NivelEducativoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
