import { Test, TestingModule } from '@nestjs/testing';
import { ProyectoHabilidadService } from './proyecto_habilidad.service';

describe('ProyectoHabilidadService', () => {
  let service: ProyectoHabilidadService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProyectoHabilidadService],
    }).compile();

    service = module.get<ProyectoHabilidadService>(ProyectoHabilidadService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
