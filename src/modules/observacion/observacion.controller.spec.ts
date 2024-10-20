import { Test, TestingModule } from '@nestjs/testing';
import { ObservacionController } from './observacion.controller';
import { ObservacionService } from './observacion.service';

describe('ObservacionController', () => {
  let controller: ObservacionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ObservacionController],
      providers: [ObservacionService],
    }).compile();

    controller = module.get<ObservacionController>(ObservacionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
