import { Test, TestingModule } from '@nestjs/testing';
import { EmpleadorService } from './empleador.service';

describe('EmpleadorService', () => {
  let service: EmpleadorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmpleadorService],
    }).compile();

    service = module.get<EmpleadorService>(EmpleadorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
