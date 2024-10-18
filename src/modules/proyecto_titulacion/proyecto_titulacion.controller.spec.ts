import { Test, TestingModule } from '@nestjs/testing';
import { ProyectoTitulacionController } from './proyecto_titulacion.controller';
import { ProyectoTitulacionService } from './proyecto_titulacion.service';

describe('ProyectoTitulacionController', () => {
  let controller: ProyectoTitulacionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProyectoTitulacionController],
      providers: [ProyectoTitulacionService],
    }).compile();

    controller = module.get<ProyectoTitulacionController>(ProyectoTitulacionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
