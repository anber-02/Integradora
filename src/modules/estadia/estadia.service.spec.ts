import { Test, TestingModule } from '@nestjs/testing';
import { EstadiaService } from './estadia.service';

describe('EstadiaService', () => {
  let service: EstadiaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EstadiaService],
    }).compile();

    service = module.get<EstadiaService>(EstadiaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
