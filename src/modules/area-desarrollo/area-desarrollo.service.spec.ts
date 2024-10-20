import { Test, TestingModule } from '@nestjs/testing';
import { AreaDesarrolloService } from './area-desarrollo.service';

describe('AreaDesarrolloService', () => {
  let service: AreaDesarrolloService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AreaDesarrolloService],
    }).compile();

    service = module.get<AreaDesarrolloService>(AreaDesarrolloService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
