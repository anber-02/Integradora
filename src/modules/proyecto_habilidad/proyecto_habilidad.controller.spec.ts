import { Test, TestingModule } from '@nestjs/testing';
import { ProyectoHabilidadController } from './proyecto_habilidad.controller';
import { ProyectoHabilidadService } from './proyecto_habilidad.service';

describe('ProyectoHabilidadController', () => {
  let controller: ProyectoHabilidadController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProyectoHabilidadController],
      providers: [ProyectoHabilidadService],
    }).compile();

    controller = module.get<ProyectoHabilidadController>(ProyectoHabilidadController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
