import { Test, TestingModule } from '@nestjs/testing';
import { ProyectoTitulacionService } from './proyecto_titulacion.service';

describe('ProyectoTitulacionService', () => {
  let service: ProyectoTitulacionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProyectoTitulacionService],
    }).compile();

    service = module.get<ProyectoTitulacionService>(ProyectoTitulacionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
