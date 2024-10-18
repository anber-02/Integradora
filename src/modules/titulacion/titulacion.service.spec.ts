import { Test, TestingModule } from '@nestjs/testing';
import { TitulacionService } from './titulacion.service';

describe('TitulacionService', () => {
  let service: TitulacionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TitulacionService],
    }).compile();

    service = module.get<TitulacionService>(TitulacionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
