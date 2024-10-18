import { Test, TestingModule } from '@nestjs/testing';
import { TitulacionController } from './titulacion.controller';
import { TitulacionService } from './titulacion.service';

describe('TitulacionController', () => {
  let controller: TitulacionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TitulacionController],
      providers: [TitulacionService],
    }).compile();

    controller = module.get<TitulacionController>(TitulacionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
