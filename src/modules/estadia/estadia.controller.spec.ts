import { Test, TestingModule } from '@nestjs/testing';
import { EstadiaController } from './estadia.controller';
import { EstadiaService } from './estadia.service';

describe('EstadiaController', () => {
  let controller: EstadiaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EstadiaController],
      providers: [EstadiaService],
    }).compile();

    controller = module.get<EstadiaController>(EstadiaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
