import { Test, TestingModule } from '@nestjs/testing';
import { AreaDesarrolloController } from './area-desarrollo.controller';
import { AreaDesarrolloService } from './area-desarrollo.service';

describe('AreaDesarrolloController', () => {
  let controller: AreaDesarrolloController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AreaDesarrolloController],
      providers: [AreaDesarrolloService],
    }).compile();

    controller = module.get<AreaDesarrolloController>(AreaDesarrolloController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
