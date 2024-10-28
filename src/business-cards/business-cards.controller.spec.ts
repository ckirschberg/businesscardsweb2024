import { Test, TestingModule } from '@nestjs/testing';
import { BusinessCardsController } from './business-cards.controller';
import { BusinessCardsService } from './business-cards.service';

describe('BusinessCardsController', () => {
  let controller: BusinessCardsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BusinessCardsController],
      providers: [BusinessCardsService],
    }).compile();

    controller = module.get<BusinessCardsController>(BusinessCardsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
