import { Test, TestingModule } from '@nestjs/testing';
import { LighthouseController } from './lighthouse.controller';
import { LighthouseService } from './lighthouse.service';

describe('LighthouseController', () => {
  let controller: LighthouseController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LighthouseController],
      providers: [LighthouseService],
    }).compile();

    controller = module.get<LighthouseController>(LighthouseController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
