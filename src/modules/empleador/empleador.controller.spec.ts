import { Test, TestingModule } from '@nestjs/testing';
import { EmpleadorController } from './empleador.controller';
import { EmpleadorService } from './empleador.service';

describe('EmpleadorController', () => {
  let controller: EmpleadorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmpleadorController],
      providers: [EmpleadorService],
    }).compile();

    controller = module.get<EmpleadorController>(EmpleadorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
