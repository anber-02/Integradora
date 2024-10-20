import { Test, TestingModule } from '@nestjs/testing';
import { ObservacionService } from './observacion.service';

describe('ObservacionService', () => {
  let service: ObservacionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ObservacionService],
    }).compile();

    service = module.get<ObservacionService>(ObservacionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
